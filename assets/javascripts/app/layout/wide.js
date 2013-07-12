app.layout.wide = (function(window, document, $, layout, undefined){

  layout.query = 'screen and (min-width: 1300px)';

  layout.setup = function(){
  };

  layout.match = function(){
    app.is = 'wide';
  };

  layout.unmatch = function(){
    app.was = 'wide';
  };

  layout.resize = function(){
  };

  return layout;

})(window, window.document, jQuery, {});