$(document).ready(function(){
  //slider
  $('.slider').slick({
    arrows: true,
  });

  //day 2
  $('.menu-icon').on('click', function() {
    $(this).toggleClass('active');
    $(this).find('span').removeClass('no-animation');
  });

});