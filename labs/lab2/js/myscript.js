
      $(document).ready(function(){
      // show the home screen
      $("#one").show();
      
      // when a nav link is clicked, hide screens then show target
      
      $("nav a").on("click", function() {
      $(".screen").hide();
      var targetSelector = $(this).attr("href");
      console.log(targetSelector)
      $(targetSelector).show();
      });
      });