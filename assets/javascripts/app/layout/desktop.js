app.layout.desktop = (function(window, document, $, layout, undefined){

  layout.query = 'screen and (min-width: 980px) and (max-width: 1299px)';

  layout.setup = function(){
  };

  layout.match = function(){
    app.is = 'desktop';
  };

  layout.unmatch = function(){
    app.was = 'desktop';
  };

  layout.resize = function(){
  };

  return layout;

})(window, window.document, jQuery, {});