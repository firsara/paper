app.layout.mobile = (function(window, document, $, layout, undefined){

  layout.query = 'screen and (max-width: 767px)';

  layout.setup = function(){
  };

  layout.match = function(){
    app.is = 'mobile';
  };

  layout.unmatch = function(){
    app.was = 'mobile';
  };

  layout.resize = function(){
  };

  return layout;

})(window, window.document, jQuery, {});