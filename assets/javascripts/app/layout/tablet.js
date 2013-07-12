app.layout.tablet = (function(window, document, $, layout, undefined){

  layout.query = 'screen and (min-width: 768px) and (max-width: 979px)';

  layout.setup = function(){
  };

  layout.match = function(){
    app.is = 'tablet';
  };

  layout.unmatch = function(){
    app.was = 'tablet';
  };

  layout.resize = function(){
  };

  return layout;

})(window, window.document, jQuery, {});