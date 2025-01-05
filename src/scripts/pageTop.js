import 'https://code.jquery.com/jquery-3.7.1.min.js';

$(function () {
  let topBtn = $('.page-top');
  topBtn.hide();
  $(window).scroll(function () {
    $(this).scrollTop() > 100 ? topBtn.fadeIn() : topBtn.fadeOut();
  });
  topBtn.click(function () {
    $('body,html').animate({ scrollTop: 0 }, 500);
    return false;
  });
});
