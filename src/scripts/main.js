import 'https://code.jquery.com/jquery-3.7.1.min.js';

$(function () {
  let lastScrollTop = 0;
  const header = $('header');
  const topBtn = $('.page-top');
  $(window).scroll(function () {
    $(this).scrollTop() > 150 ? topBtn.fadeIn() : topBtn.fadeOut();
    let currentScrollTop = $(this).scrollTop();
    if (currentScrollTop > lastScrollTop) {
      header.css('transform', 'translateY(-120%)');
    } else {
      header.css('transform', 'translateY(0)');
    }
    lastScrollTop = currentScrollTop;
  });
  topBtn.click(function () {
    $('body,html').animate({ scrollTop: 0 }, 500);
    return false;
  });
  document.addEventListener('astro:after-swap', () => {
    lastScrollTop = 0;
  });
});
