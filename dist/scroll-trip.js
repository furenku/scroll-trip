travelContainer = $('#travel')

travelDirection = undefined
gotMouseWheel = false
startedDrag = false
draggingPointer = false
isScrolling = false
gotMouseWheel = false
lastScrollTop = 0
scrollAmount = 0

levels = []

currentLevel = 0
currentChild = 0
nextLevel = 0
nextChild = 0

$(document).ready(function(){

   makeStructure()

   setupUserActions()

   console.log("Scroll Trip ready")

})


function goToNext() {

   travelContainer.css({top: '100vh'})
   console.log("Go to Next")

}



function setupUserActions() {






   travelContainer.on("pointerdown", function(event) {

      startedDrag = true

      startY = event.pageY
      startX = event.pageX

   })

   travelContainer.on("pointermove", function(event) {

      if (startedDrag) draggingPointer = true

   })


   travelContainer.on("pointerup", function(event) {


      if (draggingPointer && startedDrag) {

         var direction


         if (Math.abs(startY - event.pageY) > Math.abs(startX - event.pageX)) {
            direction = startY - event.pageY
            travelAxis = "vertical"
            if (direction < 0) travelDirection = "up"
            if (direction > 0) travelDirection = "down"
         } else {
            direction = startX - event.pageX
            travelAxis = "horizontal"
            if (direction < 0) travelDirection = "left"
            if (direction > 0) travelDirection = "right"
         }

         console.log(travelDirection)

         scrollTravel( travelDirection )
         // scrollTravel()

      }

      draggingPointer = false
      startedDrag = false
      travelAxis = undefined
      travelDirection = undefined

   })


   $(window).on('mousewheel', function(event) {
      if (!gotMouseWheel) {

         clearTimeout(isScrolling)
         isScrolling = setTimeout(function() {


            travelAxis = "vertical"

            if (event.deltaY === -1) {
               travelDirection = "down"
            }
            if (event.deltaY === 1) {
               travelDirection = "up"
            }

            isScrolling = false

         }, 150)

         gotMouseWheel = setTimeout(function() {
            gotMouseWheel = false
         }, 100)

      }

   })



}




function scrollTravel( travelDirection ) {

   if( travelDirection === "down" || travelDirection === "right" ) {

      nextChild = currentChild + 1

      if( nextChild >= levels[currentLevel].children.length ) {

         nextLevel = currentLevel + 1

         nextLevel = Math.min( nextLevel, levels.length - 1 )

         nextChild = 0

      }

   } else {

      nextChild = currentChild - 1

      if( nextChild < 0 ) {

         nextLevel = currentLevel - 1

         nextLevel = Math.max( nextLevel, 0 )

         nextChild = levels[nextLevel].children.length - 1

      }

   }


   scrollTo( nextLevel, nextChild )



   console.log( nextLevel, nextChild )

}


function scrollTo( level, child ) {


   if( level > currentLevel ) {

      levels[currentLevel].level.css({
         top: - $(window).height()
      })

   }

   if( level < currentLevel ) {

      levels[currentLevel].level.css({
         top: $(window).height()
      })

   }

   childLeft = levels[level].children[child].left
   childWidth = levels[level].children[child].width

   offsetLeft = childLeft


   if( childWidth < $(window).width() ){

      offsetLeft -= ($(window).width() - childWidth) / 2

   }

   if( child >= levels[level].children.length - 1 ) {
   
      offsetLeft = childLeft - childWidth

   }

   levels[level].level.css({
      top: 0,
      left: - offsetLeft,
   })

   setTimeout(function(){

      currentLevel = level
      currentChild = child

   }, 1000)


}



function makeStructure() {

   $('.level').each(function(){

      level = $(this)

      lastLevel = {
         level: level,
         width: level.width()
      }

      children = []

      childLeft = 0

      $(this).children().each(function(){

         child = $(this)

         children.push({
            child: child,
            left: childLeft,
            width: child.outerWidth()
         })

         childLeft += child.outerWidth()

      })

      lastLevel.children = children

      levels.push( lastLevel )

   })

}
