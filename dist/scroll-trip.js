
travelDirection = undefined
gotMouseWheel = false
startedDrag = false
draggingPointer = false
isScrolling = false
gotMouseWheel = false
lastScrollTop = 0
scrollAmount = 0

moving = false

levels = []

currentLevel = 0
currentChild = 0

nextChild = 0
nextLevel = 0

callbacks = []

scrollEnd = false

$(document).ready(function(){

   makeStructure()

   setupUserActions()

   add_callback( "simple-log", function(level, child){

      console.log("Scrolled To:", level, child )

   })

   travelContainer = $('#travel')


   totalWidth = $(window).width()
   totalHeight = $(window).height()

   travelContainer.css({
      position: 'absolute',
      left: 0,
      top: 0,
      width: totalWidth,
      height: totalHeight
   })

   levelTop = 0

   travelContainer.find('.level').each(function(i){

      $(this).css({
         position: 'absolute',
         left: 0,
         top: levelTop,
         backgroundColor: 'rgba(255,'+(50*i)+','+(250-(50*i))+',1)',
         transition : 'top 1s ease-in-out, left 1s ease-in-out',
         WebkitTransition : 'top 1s ease-in-out, left 1s ease-in-out',
         MozTransition    : 'top 1s ease-in-out, left 1s ease-in-out',
         MsTransition     : 'top 1s ease-in-out, left 1s ease-in-out',
         OTransition      : 'top 1s ease-in-out, left 1s ease-in-out',
         transition       : 'top 1s ease-in-out, left 1s ease-in-out'
      })

      levelTop += $(this).outerHeight()

   })

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

            scrollTravel( travelDirection )

            isScrolling = false

         }, 50)

         gotMouseWheel = setTimeout(function() {
            gotMouseWheel = false
         }, 100)

      }

   })



}




function scrollTravel( travelDirection ) {

   if( ! moving ) {


      if( travelDirection === "down" || travelDirection === "right" ) {

         nextChild = currentChild + 1

         if( nextChild >= levels[currentLevel].children.length ) {

            nextLevel = currentLevel + 1

            if( nextLevel < levels.length ){

               nextLevel = Math.min( nextLevel, levels.length - 1 )

               // if( nextLevel !== levels.length - 1 ) {
               nextChild = 0
               // }

            } else {

               nextLevel = Math.min( nextLevel, levels.length - 1 )
               scrollEnd = true

            }

         }

      } else {

         scrollEnd = false

         nextChild = currentChild - 1

         if( nextChild < 0 ) {

            nextLevel = currentLevel - 1

            nextLevel = Math.max( nextLevel, 0 )

            if( currentLevel !== 0 ) {

               nextChild = levels[nextLevel].children.length - 1

            } else {

               nextChild = 0

            }

         }

      }

      if( ! scrollEnd ) {

      scrollTo( nextLevel, nextChild )

      }


   }



}


function scrollTo( level, child ) {

   thisLevel = levels[level]

   moving = true

   if( level === currentLevel ) {
      levelWait = 0
   } else {


      levelWait = 1

      for (var i = 0; i < levels.length; i++) {

         levels[i].level.css({
            top: (i - level) * $(window).height()
         })

      }

   }


   childLeft = thisLevel.children[child].left

   childWidth = thisLevel.children[child].width

   offsetLeft = childLeft


   if( childWidth < $(window).width() ){

      offsetLeft -= ($(window).width() - childWidth) / 2

   }

   if( child >= thisLevel.children.length - 1 ) {

      offsetLeft = childLeft - childWidth

   }

   // levels[level].level.css({
   //    top: 0
   // })

   setTimeout(function(){


      thisLevel.level.css({
         left: - offsetLeft
      })

      if( child !== thisLevel.currentChild ){

         setTimeout(function(){

            do_callbacks(level,child)

         }, 1000)

      } else {

         do_callbacks(level,child)


      }

   }, levelWait * 1000)

   nextLevel = level
   nextChild = child

   return

}


function setScrollData(level,child) {

   currentLevel = level

   currentChild = child

   thisLevel.currentChild = child

   moving = false

}

function makeStructure() {

   $('.level').each(function(){

      level = $(this)

      newLevel = {
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

      newLevel.children = children

      newLevel.currentChild = 0

      levels.push( newLevel )

   })

}


function do_callbacks(level,child) {

   setScrollData(level,child)

   for( i in callbacks ) {

      callbacks[i](level,child)

   }

}

function add_callback( name, callback ) {
   callbacks[name] = callback
}
