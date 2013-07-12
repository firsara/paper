app.helper = (function(window, document, $, self, undefined){

  self.detections = {};

  $(document).ready(function(){

    (function(){
      self.detections.isTouchDevice = ('ontouchstart' in window || 'onmsgesturechange' in window);
      self.detections.supportsHistory = (window.history.pushState !== undefined);
      self.detections.isRetina = (window.devicePixelRatio > 1);
      self.detections.supportsTransitions = (function(){
        var v = ['ms', 'Khtml', 'O', 'Moz', 'Webkit', ''];
        while( v.length ) if( v.pop() + 'Transition' in document.body.style ) return true;
        return false;
      })();

      // Hack, hack, hack :)
      // Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
      $.fn._scrollable = function(){
        return this.map(function(){
          var elem = this,
            isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

            if( !isWin )
              return elem;

          var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
          
          return $.client.browser == 'Safari' || BrowserDetect.webkit || doc.compatMode == 'BackCompat' ?
            doc.body : 
            doc.documentElement;
        });
      };

      self.detections.scrollable = $(window)._scrollable();
    })();

  });

  self.scrollTo = function(pos, speed, ease, holder){
    if (pos === null) return;
    if (ease === null) ease = 'linear';
    if (! speed) speed = 0;

    if (holder) {
      return $(holder).animate({scrollTop: pos}, 1);
    }

    self.detections.scrollable.animate({scrollTop: pos}, speed, ease);
  };

  self.getScrollTop = function(){
    return self.detections.scrollable.scrollTop();
  };

  self.resizeFor = function(timeoutTime){
    var clearResizing = function(){
      clearInterval(intervalID);
      $(window).trigger('resize');
    };

    var triggerResize = function(){
      $(window).trigger('resize');
    };

    var intervalID = setInterval(triggerResize, 10);
    setTimeout(clearResizing, timeoutTime + 100);
  };


  self.isTouchDevice = function(){
    return app.helper.detections.isTouchDevice;
  };

  self.isRetina = function(){
    return self.detections.isRetina;
  };

  self.supportsHistory = function(){
    return app.helper.detections.supportsHistory;
  };

  self.supportsTransitions = function(){
    return app.helper.detections.supportsTransitions;
  };

  self.url = function(url){
    if (! (app.address && app.address.ready && $.address)) {
      if (url.indexOf('http') < 0) {
        url = $('base').attr('href') + url;
      }

      window.location.href = url;
    } else {
      $.address.path(url);
    }
  };

  return self;

})(window, window.document, jQuery, {});