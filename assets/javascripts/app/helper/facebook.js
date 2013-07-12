app.helper.facebook = (function(window, document, $, self, undefined){

  var d = document;
  var s = 'script';
  var id = 'facebook-jssdk';

  self.loaded = function(){
    return (typeof FB !== 'undefined' || $('#fb-root').size() > 0);
  };

  self.load = function(callback){
    if (! self.loaded()) {
      $('<div id="fb-root"></div>').appendTo($('body'));
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=130800750272087";
      $(js).load(callback);
      fjs.parentNode.insertBefore(js, fjs);
    } else {
      callback();
    }
  };

  self.refresh = function(){
    try {
      FB.XFBML.parse();
    } catch(e) {}
  };

  return self;

})(window, window.document, jQuery, {});