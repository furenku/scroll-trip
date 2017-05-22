travelContainer = $('#travel')


startedDrag = false
draggingPointer = false;
isScrolling = false
gotMouseWheel = false
lastScrollTop = 0
scrollAmount = 0

$(document).ready(function(){


   setupUserActions()

   console.log("Scroll Trip ready");

})


function goToNext() {

   travelContainer.css({top: '100vh'})
   console.log("Go to Next");

}



function setupUserActions() {



   $('.scroll-container').on("pointerup", function(event) {

      console.log("up", draggingPointer, event.pageY, event.pageX);

      if (draggingPointer && startedDrag) {

         var direction;


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


         direction = Math.max(-1, direction)
         direction = Math.min(1, direction)

         increment = direction * scrollStep

         scrollTotal += increment
         scrollTotal = Math.max(scrollTotal, 0)
         scrollTotal = Math.min(scrollTotal, totalHeight)

         scrollTravel()

      }

      draggingPointer = false
      startedDrag = false
      travelAxis = undefined
      travelDirection = undefined
   });


   $('.scroll-container').on("pointerdown", function(event) {
      startedDrag = true
      // console.log(startY, startX );
      startY = event.pageY
      startX = event.pageX

      console.log("pointerdown");

   });

   $('.scroll-container').on("pointermove", function(event) {
      if (startedDrag) draggingPointer = true
      // console.log("move");
      //
      // startY = event.pageY
      // startX = event.pageX

   });


   $(window).on('mousewheel', function(event) {
      if (!gotMouseWheel) {

         clearTimeout(isScrolling)
         isScrolling = setTimeout(function() {
            scrollTotal += -event.deltaY * scrollStep
            scrollTotal = Math.max(scrollTotal, 0)
            scrollTotal = Math.min(scrollTotal, totalHeight)


            travelAxis = "vertical";

            if (event.deltaY === -1) {
               travelDirection = "down";
            }
            if (event.deltaY === 1) {
               travelDirection = "up";
            }

            scrollTravel()

            isScrolling = false

         }, 150)

         gotMouseWheel = setTimeout(function() {
            gotMouseWheel = false
         }, 100)

      }

   });



}
