app.address = (function(window, document, $, module, undefined){

  var request = null;
  var initialized = false;
  var bust = new Date().getTime();
  var cache = [];

  if (! app.helper.supportsHistory()) return;

  module.ready = true;
  module.templateEngine = null;

  module.init = function(state, templateEngine){
    module.templateEngine = templateEngine;
    $.address.state(state).init(initialize).change(app.address.change);
  };

  var initialize = function(){
    module.bind();
  };

  module.bind = function(){
    $('a').each(function(){
      if ($(this).attr('data-bypass')) {
      } else {
        if ($(this).attr('target') === '_blank' || $(this).attr('href').indexOf('mailto') >= 0) {
          // internal links
        } else {
          if (! $(this).attr('data-address-initialized')) {
            $(this).attr('data-address-initialized', 'true');
            $(this).address();
          }
        }
      }
    });
  };

  module.cache = function(){
    $('a[data-address-initialized]').each(function(){
      var page = module.correctPageUrl( $(this).attr('href') );

      if (! module.getCached(page)) {
        module.cachePage(page);
      }
    });
  };

  module.cachePage = function(page){
    $.get(page + bust, function(result){
      cache[page] = result;

      if (localStorage) {
        localStorage.setItem(page, result);
      }
    });
  };

  module.getCached = function(page){
    if (localStorage) {
      var data = localStorage.getItem(page);

      if (data) {
        return data;
      }
    }

    if (cache[page]) return cache[page];
    return false;
  };

  module.correctPageUrl = function(url){
    var page = $.address.state().replace(/^\/$/, '') + url;
    page = page.replace(/\/\//g, '/');
    page += (page.indexOf('?') === -1 ? '?' : '&');
    page += 'is_ajax=true';
    page += '&_=';

    return page;
  }

  module.change = function(event){
    if (! initialized) {
      initialized = true;
      return;
    }

    var page = $.address.state().replace(/^\/$/, '') + event.path;
    page = page.replace(/\/\//g, '/');
    page += (page.indexOf('?') === -1 ? '?' : '&') + '_=' + new Date().getTime();
    page += '&is_ajax=true';

    // Loads and populates the page data
    if (request) request.abort();

    window.setTimeout(function(){
      module.templateEngine.before();

      var data = module.getCached(page);

      if (data) {
        module.cachePage(page);
        return module.parse(data);
      }

      request = $.ajax({
        cache: false,
        type: 'GET',
        url: page,
        success: module.handler
      });
    }, 10);
  };

  module.handler = function(response){
    module.parse(response);
  };

  module.parse = function(response){
    if (typeof response !== 'object') {
      try {
        response = $.parseJSON(response);
      } catch(e) {}
    }

    request = null;

    module.templateEngine.parse(response);
  };

  return module;

})(window, window.document, jQuery, {});