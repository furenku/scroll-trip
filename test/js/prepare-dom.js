travelContainer = $('#travel')


currentLevel = 0

$(document).ready(function(){

   levelModel = $('.level').first()

   for (var i = 0; i < 5; i++) {
      levelModel.clone().detach().appendTo('#levels')
   }


   levelModel.remove()


   totalWidth = $(window).width()
   totalHeight = $(window).height()

   travelContainer.css({
      position: 'absolute',
      left: 0,
      top: 200,
      width: totalWidth,
      height: totalHeight,
      backgroundColor: 'rgba(255,0,0,0.3)',
      transition : 'top 1s ease-in-out, left 1s ease-in-out',
      WebkitTransition : 'top 1s ease-in-out, left 1s ease-in-out',
      MozTransition    : 'top 1s ease-in-out, left 1s ease-in-out',
      MsTransition     : 'top 1s ease-in-out, left 1s ease-in-out',
      OTransition      : 'top 1s ease-in-out, left 1s ease-in-out',
      transition       : 'top 1s ease-in-out, left 1s ease-in-out'
   })



   console.log("DOM prepared")

})
