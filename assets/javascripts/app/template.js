app.template = (function(window, document, $, self, undefined){

  self.before = function(){
    $('body').find('*').unbind().off();
  };

  self.parse = function(data){
    var htmlString = data;
    var html = $(htmlString);
    
    $('body').html(html.find('body').html());

    app.layout.initializeNewContent();
  };

  return self;

})(window, window.document, jQuery, {});