(function($){

  var appSize = 'desktop';

  var minHeightScroll = 800;


  var getCommentsOffset = function(el, removeFooterHeight){
    var wrapper = el.find('.wrapper');
    var comments = el.find('.comments-outer');
    var actions = el.find('.actions-outer');
    //wrapper.css('display', 'block');


    var h = comments.height() + $('#footer').outerHeight();

    return h;
  };


  var checkScrollPos = function(){
    var articles = $('article.open');

    if ($(window).height() > minHeightScroll) {
      var count = $('article').size();

      articles.each(function(id, el){
        var footerHeight = $('#footer').outerHeight();
        var commentsOffset = getCommentsOffset($(this));
        var height = commentsOffset - footerHeight;
        var index = $('article').index($(this));

        if (index == count-1) {
          height = height + footerHeight;
        }

        $(this).find('.article-content').css('margin-bottom', height);

        var articleHeaderPadding = 30;
        var articleHeight = $(this).find('.wrapper').height();
        var top = $(this).find('.article-content').offset().top + $(this).find('.article-content').height() - app.helper.getScrollTop() - $(window).height();
        top = top + $(this).find('.comments-outer').height();

        $(this).find('.comments-outer').css('bottom', Math.max(0, 0 - top));

        if (top < 0) {
          $(this).find('.comments-outer').css('bottom', 0 - top);
          //$(this).removeClass('scroll');
          //$(this).find('.article-content').css('margin-bottom', '');
        } else {
          //$(this).addClass('scroll');
          //$(this).find('.article-content').css('margin-bottom', getCommentsOffset($(this)));
        }
      });
    }
  };


  var resize = function(){
    appSize = 'wide';
    var windowWidth = $(window).width();

    if (windowWidth < 1300) appSize = 'desktop';
    if (windowWidth < 980) appSize = 'tablet';
    if (windowWidth < 768) appSize = 'mobile';

    //var articles = $('article.single');
    var articles = $('article');

    articles.find('.article-content').css('margin-bottom', '');
    articles.addClass('scroll');

    if ($(window).height() > minHeightScroll) {
      articles.each(function(){
        //$(this).find('.wrapper').css('display', 'block');
        $(this).find('.article-content').css('margin-bottom', getCommentsOffset($(this)));
        //$(this).find('.wrapper').css('display', '');
      });
    }


    $('.filter').each(function(){
      var items = $(this).find('.filter-item-wrapper');
      var container = $(this).find('.filter-list');
      var containerWidth = container.width();

      var itemsPerRow = 4;
      if (appSize == 'tablet') itemsPerRow = 3;
      if (appSize == 'mobile') itemsPerRow = 1;

      items.css('float', '');
      items.find('.filter-item').css('padding-right', '');
      items.find('.filter-item').css('padding-left', '');
      items.find('.filter-item').css('float', '');
      items.find('.filter-item').css('text-align', '');


      if (appSize == 'mobile') {
        items.css('width', '');
      } else {
        items.css('width', 'auto');

        var groups = [];
        var group = [];

        items.each(function(){
          group.push($(this));
          if (group.length >= itemsPerRow) {
            groups.push(group);
            group = [];
          }
        });

        for (var i = 0, _len = groups.length; i < _len; i++) {
          var width = 0;
          var group = groups[i];
          $(group).each(function(){
            width += $(this).width();
          });

          var rest = containerWidth - width;
          var padding = rest / (itemsPerRow - 1);
          padding = Math.floor(padding / 2) - 11;

          $(group).each(function(){
            $(this).find('.filter-item').css('padding-right', padding);
            $(this).find('.filter-item').css('padding-left', padding);
          });

          $(group[0]).find('.filter-item').css('padding-left', 0);
          $(group[group.length - 1]).find('.filter-item').css('padding-right', 0).css('float', 'right').css('text-align', 'right').parent().css('float', 'right');
        }
      }
    });

    setResponsiveImages();
  };


  jQuery(document).ready(function($) {

    var speed = 300;

    $('.posts .link, .posts .actions-outer .close').click(function(e){
      if ((appSize == 'mobile' || appSize == 'tablet') && screen.width < 980) return true;

      e.preventDefault();
      var article = $(this).parents('article:first');
      article.toggleClass('open');

      var oldArticle = $('.posts .open');

      $('.posts li').removeClass('is_open');

      if (article.is('.open')) {
        article.parents('li:first').addClass('is_open');

        var otherPosts = $('.posts .open').not(article);
        otherPosts.removeClass('open');
        otherPosts.css('display', '');

        var lastArticle = $('.posts article').last();
        var oldIndex = $('.posts article').index(oldArticle);
        var currentIndex = $('.posts article').index(article);
        var lastIndex = $('.posts article').index(lastArticle);

        if (currentIndex == lastIndex || oldIndex < currentIndex) {
          // last article was clicked, dont slide up old article (gets messy when scrolling to clicked article)
          otherPosts.find('.wrapper').css('display', '');
        } else {
          otherPosts.find('.wrapper').slideUp(speed);

        }

        article.find('.wrapper').css('display', 'block');

        var headerHeight = $('#header').height();
        var top = article.offset().top + ($('#header').css('position') == 'fixed' ? 0 - headerHeight : 0) - ($('body').is('.admin-bar') ? 28 : 0) + 10;

        article.find('.wrapper').css('display', '');
        article.find('.wrapper').slideDown(speed);

        setTimeout(setResponsiveImages, 100);

        app.helper.scrollTo(top, speed);
      } else {
        article.find('.comments-outer').slideUp(speed, function(){
          $(this).removeAttr('style');
        });
        article.find('.wrapper').slideUp(speed);
      }
    });

    $('article').each(function(){
      var showMore = $(this).find('.commentlist-outer .show-more');
      var comments = $(this).find('.comments li');
      var id = 0;

      var showComment = function(){
        var nextVisibleComment = comments.eq(id);

        if (nextVisibleComment.size() > 0) {
          nextVisibleComment.css('display', 'block');
          id++;

          if (comments.eq(id).size() == 0) {
            showMore.css('display', 'none');
          }
        } else {
          showMore.css('display', 'none');
        }
      };

      if (comments.size() > 3) {
        showMore.css('display', 'block');
        comments.css('display', 'none');
        showComment();
        showComment();

        showMore.click(showComment);
      }
    });



    $('.popup').click(function(e){
      e.preventDefault();

      var width = $(window).width() > 600 ? 500 : 300;
      var height = $(window).height() > 500 ? 300 : 200;

      var href = $(this).attr('href');
      var title = $(this).attr('title');
      if (! title || title.length == 0) title = '';
      var w = window.open(href, title, "width="+width+",height="+height+",left=100,top=200");
    });


    $('[name="email"]').addClass('email');
    $('[aria-required]').addClass('required');
    $('.respond form').ajaxForm(function(){
      $(this).get(0).reset();
    });


    $('.filter').not('.filtered').find('.filter-item').click(function(e){
      e.preventDefault();

      $('.filter-item').removeClass('current');
      $(this).addClass('current');

      var key = $(this).attr('data-key');

      if (key != '') {
        $('.filter').addClass('filtered');
        $('[data-categories]').css('display', 'none');
        $('[data-categories*="'+key+'"]').css('display', 'block');
      } else {
        $('.filter').removeClass('filtered');
        $('[data-categories]').css('display', '');
      }

      if (appSize == 'mobile') {
        $('.filter-list').slideUp(500);
      }
    });

    $('.filter .label').click(function(e){
      if (appSize == 'mobile') {
        $('.filter-list').slideToggle(500);
      }
    });



    if (window.location.hash.indexOf('domain=') != -1) {

      var parentDomain = window.location.hash.replace('#domain=', '');
      document.domain = parentDomain;
      
      $('.home #header .close, a[href="http://madebyfibb.com"]').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      });

    } else {

      $('.home #header .close, a[href="http://madebyfibb.com"]').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        var href = $(this).attr('href');

        $('body > *').fadeOut(300, function(){
          setTimeout(function(){
            window.location.href = href;
          }, 150);
        });
      });

    }


    $(window).scroll(checkScrollPos);
    resize();
  });


  var setResponsiveImages = function(){
    $('.article-content:visible .responsive-image').responsiveImage(appSize);
  };


  $(window).resize(resize);

  $(window).load(function(){
    //app.helper.facebook.load();
    resize();
  });


})(jQuery);