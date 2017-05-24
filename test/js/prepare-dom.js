travelContainer = $('#travel')


currentLevel = 0

$(document).ready(function(){

   levelModel = $('.level').first()

   for (var i = 0; i < 5; i++) {
      levelModel.clone().detach().appendTo('#travel')
   }


   levelModel.remove()

   // $('#levels').detach().appendTo('#travel')

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

   travelContainer.find('.level').each(function(){

      $(this).css({
         position: 'absolute',
         left: 0,
         top: levelTop,
         transition : 'top 1s ease-in-out, left 1s ease-in-out',
         WebkitTransition : 'top 1s ease-in-out, left 1s ease-in-out',
         MozTransition    : 'top 1s ease-in-out, left 1s ease-in-out',
         MsTransition     : 'top 1s ease-in-out, left 1s ease-in-out',
         OTransition      : 'top 1s ease-in-out, left 1s ease-in-out',
         transition       : 'top 1s ease-in-out, left 1s ease-in-out'
      })

      levelTop += $(this).outerHeight()
      
   })


   console.log("DOM prepared")

})
