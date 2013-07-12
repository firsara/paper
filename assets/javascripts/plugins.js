// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

if ( !window.requestAnimationFrame ) {

  window.requestAnimationFrame = ( function() {

    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function( callback ) {

      window.setTimeout( callback, 1000 / 60 );

    };

  } )();
}



jQuery.fn.wrapInChunks = function(html, chunkSize) {
  chunkSize = chunkSize || 1;
  var items = this.get(),
      rows = [],
      cur = rows[0] = $(html);

  while (items[0]) {
    if (rows[rows.length - 1].children().length === chunkSize) {
      cur = rows[rows.length] = $(html);
    }

    cur.append( items.shift() );
  }

  return this.pushStack(rows);
};


jQuery.fn.padding = function(){

  var self = jQuery(this);
  var data = {};

  try {
    data.left = parseFloat(self.css('padding-left').replace('px', ''));
    data.top = parseFloat(self.css('padding-top').replace('px', ''));
    data.right = parseFloat(self.css('padding-right').replace('px', ''));
    data.bottom = parseFloat(self.css('padding-bottom').replace('px', ''));
  } catch(e) {
    data = {left: 0, top: 0, right: 0, bottom: 0};
  }
  
  return data;
};

jQuery.fn.margin = function(){

  var self = jQuery(this);
  var data = {};
  
  try {
    data.left = parseFloat(self.css('margin-left').replace('px', ''));
    data.top = parseFloat(self.css('margin-top').replace('px', ''));
    data.right = parseFloat(self.css('margin-right').replace('px', ''));
    data.bottom = parseFloat(self.css('margin-bottom').replace('px', ''));
  } catch(e) {
    data = {left: 0, top: 0, right: 0, bottom: 0};
  }
  
  return data;
};


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    //alert(jQuery.easing.default);
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158; 
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

(function() {
  
  var BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || "an unknown version";
      this.OS = this.searchString(this.dataOS) || "an unknown OS";
      this.webkit = navigator.userAgent ? navigator.userAgent.toString().toLowerCase().indexOf('webkit') != -1 : false;
    },
    searchString: function (data) {
      for (var i=0;i<data.length;i++) {
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1)
            return data[i].identity;
        }
        else if (dataProp)
          return data[i].identity;
      }
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return;
      return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      {   string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      },
      {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      },
      {
        prop: window.opera,
        identity: "Opera"
      },
      {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      },
      {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      },
      {   // for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      },
      {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
      },
      {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
      },
      {     // for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
      }
    ],
    dataOS : [
      {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
      },
      {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
      },
      {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
        },
      {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
      }
    ]
  
  };
  
  BrowserDetect.init();
  
  window.$.client = { os : BrowserDetect.OS, browser : BrowserDetect.browser, version: BrowserDetect.version };
  window.BrowserDetect = BrowserDetect;
  
})();





/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */

window.matchMedia = window.matchMedia || (function( doc, undefined ) {

  "use strict";

  var bool,
      docElem = doc.documentElement,
      refNode = docElem.firstElementChild || docElem.firstChild,
      // fakeBody required for <FF4 when executed in <head>
      fakeBody = doc.createElement( "body" ),
      div = doc.createElement( "div" );

  div.id = "mq-test-1";
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.style.background = "none";
  fakeBody.appendChild(div);

  return function(q){

    div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

    docElem.insertBefore( fakeBody, refNode );
    bool = div.offsetWidth === 42;
    docElem.removeChild( fakeBody );

    return {
      matches: bool,
      media: q
    };

  };

}( document ));


/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
  // monkeypatch unsupported addListener/removeListener with polling
  if( !window.matchMedia( "" ).addListener ){
    var oldMM = window.matchMedia;
    
    window.matchMedia = function( q ){
      var ret = oldMM( q ),
        listeners = [],
        last = false,
        timer,
        check = function(){
          var list = oldMM( q ),
            unmatchToMatch = list.matches && !last,
            matchToUnmatch = !list.matches && last;
                                                
                                        //fire callbacks only if transitioning to or from matched state
          if( unmatchToMatch || matchToUnmatch ){
            for( var i =0, il = listeners.length; i< il; i++ ){
              listeners[ i ].call( ret, list );
            }
          }
          last = list.matches;
        };
      
      ret.addListener = function( cb ){
        listeners.push( cb );
        if( !timer ){
          timer = setInterval( check, 1000 );
        }
      };

      ret.removeListener = function( cb ){
        for( var i =0, il = listeners.length; i< il; i++ ){
          if( listeners[ i ] === cb ){
            listeners.splice( i, 1 );
          }
        }
        if( !listeners.length && timer ){
          clearInterval( timer );
        }
      };
      
      return ret;
    };
  }
}());


var app = {};






(function(window, document, $, undefined){

    $.fn.ajaxForm = function(callback){
      $(this).each(function(){
        var form = $(this);

        var validateEmail = function(email){
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        };

        var validateForm = function(e){
          var form = $(this);

          form.find('.error').removeClass('error');
          form.find('.errorbox').remove();

          form.find('.required').each(function(){
            var valid = true;
            var val = $(this).val();

            var type = $(this).attr('type');
            if ($(this).is('textarea')) type = 'textarea';
            if ($(this).is('select')) type = 'select';
            if ($(this).is('.email')) type = 'email';
            if ($(this).val() === $(this).attr('placeholder')) valid = false;

            if (val === '') valid = false;

            switch(type){
              case 'email':
                valid = validateEmail(val);
              break;
              case 'textarea':
                if (val.length < 10) valid = false;
              break;
              case 'select':
                if (val.length < 1) valid = false;
              break;
              case 'text':
              default:
                if (val.length < 3) valid = false;
              break;
            };

            if (! valid) {
              form.find('label[for="' + $(this).attr('id') + '"]').addClass('error');
              $(this).addClass('error');

              var position = $(this).offset();

              var errorbox = $('<div class="errorbox"></div>');
              errorbox.click(function(){
                $(this).animate({opacity: 0, top: $(this).position().top - 5}, 300, 'linear', function(){ $(this).remove(); });
              });

              var css = {
                width: Math.round( $(this).width() ),
                left: Math.round( position.left - form.offset().left ),
                top: Math.round( position.top - form.offset().top + 5 )
              };

              errorbox.append($('<div class="text">'+$(this).attr('data-error')+'</div>'));
              errorbox.append($('<div class="arrow"></div>'));
              errorbox.css(css);

              errorbox.css('opacity', 0).animate({
                opacity: 1,
                top: css.top - 5
              }, 500, 'linear');

              form.prepend(errorbox);
            }

          });

          if (form.find('.error').size() > 0){
            e.preventDefault();
            return false;
          } else {
            e.preventDefault();
            
            form.find('input[type="submit"]').css('display', 'none');

            var opts = {
              type: form.attr('method'),
              url: form.attr('action'),
              data: form.serialize()
            };

            opts.success = function(result){
              if (callback) callback.call(form, result);
            };

            opts.error = function(){
              form.find('input[type="submit"]').css('display', '');
            };

            $.ajax(opts);

            return false;
          }
        };

        form.attr('novalidate', 'novalidate');
        form.submit(validateForm);

        return this;
      });

      return this;
    };

})(window, window.document, jQuery);




(function(window, document, $, undefined){
    
  $.fn.responsiveImage = function(resolution, callback){

    if (! resolution) return;

    $(this).each(function(){
      var self = $(this);
      var node = self.is('noscript') ? self : self.find('noscript');
      var sources = $.parseJSON( node.attr('data-src') );
      var image = sources['image'];

      if (app.helper.detections.isRetina && sources[resolution + '-retina']) {
        image = sources[resolution + '-retina'];
      } else if (sources[resolution]) {
        image = sources[resolution];
      }

      self.addClass('responsive-image-loaded');

      var img = self.find('img');

      if (img.size() > 0) {
        if (img.attr('src') == image.src) return;

        var newImage = $('<img src="'+image.src+'" width="'+image.width+'" height="'+image.height+'">');

        newImage.load(function(){
          newImage.insertAfter(self.find('noscript'));
          self.find('img').not(newImage).remove();
          if (callback) callback();
        });
      } else {
        self.find('img').remove();

        var newImage = $('<img src="'+image.src+'" width="'+image.width+'" height="'+image.height+'">');

        if (callback) {
          newImage.load(callback);
        }

        newImage.insertAfter(self.find('noscript'));
      }
      
      return this;
    });
    
    return this;
  };
  
})(window, window.document, jQuery);