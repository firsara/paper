(function($, window, document, undefined){

  // delegate resizing
  var resizeTimeout;
  var storeSize = {width: 0, height: 0};

  app.window = {width: 0, height: 0};
  app.document = {width: 0, height: 0};

  var resize = function(){
    if (resizeTimeout) window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(triggerResize, 25);
  };

  var triggerResize = function(){
    if (resizeTimeout) window.clearTimeout(resizeTimeout);

    app.window = {
      width: $(window).width(),
      height: $(window).height()
    };

    app.document = {
      width: $(document).width(),
      height: $(document).height()
    };

    // only dispatch resize if it's not a "fake"-resizing
    // fix error on iphone
    if (app.window.width === storeSize.width && app.window.height === storeSize.height) {
      return false;
    }

    storeSize = app.window;

    app.layout.resize();

    // fix css vw / vh value bugs
    $('body').slideUp(0);
    $('body').slideDown(0);

    if (app.layout[app.is] && app.layout[app.is].resize) {
      app.layout[app.is].resize();
    }
  };

  $(window).resize(resize);
  $(document).ready(resize);
  $(window).load(function(){
    storeSize = {width: 0, height: 0};
    app.layout.loaded();
    triggerResize();
  });

  window.setTimeout(resize, 350);


  // Fix width bug on iPhone
  $(window).bind('orientationchange', function(e){
    setTimeout(function(){
      $('body').slideUp(10);
      $('body').slideDown(10);
      $(window).trigger('resize');
    }, 500);
  });


  // Internet Explorer has bug in enquire
  if (typeof enquire === 'undefined' || $.client.browser == 'Explorer' && $.client.version < 9) {
    app.layout.desktop.setup();
    app.layout.desktop.match();
    
    app.layout.setup();
    app.layout.match();

    return;
  }


  // initialize enquire and start firing events

  for (var k in app.layout) {
    var layout = app.layout[k];

    if (layout.query) {
      enquire.register(layout.query, [
        {
          match: layout.match,
          unmatch: layout.unmatch,
          setup: layout.setup
        },
        {
          match: app.layout.match,
          unmatch: app.layout.unmatch
        }
      ]);
    }
  }

  enquire.listen(100);
  triggerResize();
  app.layout.setup();

})(jQuery, window, window.document);