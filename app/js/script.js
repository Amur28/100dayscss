$(document).ready(function(){
  //slider
  $('.slider').slick({
    arrows: false,
  });

  //day 2
  $('.menu-icon').on('click', function() {
    $(this).toggleClass('active');
  });

});