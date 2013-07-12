app.route = (function(window, document, $, module, undefined){

  module.init = function(basePath, structure, defaults){
    module.basePath = basePath;
    module.structure = structure;
    module.defaults = defaults;
    module.fetch();
  };

  module.fetch = function(){
    module.data = {};

    var url = window.location.href.toString().replace(module.basePath, '').replace('#/', '').replace(/\/\//gi, '/');
    url = url.split('/');

    var key, value, defaultValue;

    for (var i = 0, len = module.structure.length; i < len; i++) {
      key = module.structure[i];
      defaultValue = module.defaults[key];
      value = url[i];

      if (defaultValue == 'undefined' || defaultValue == null) {
        defaultValue = '';
      }

      if (value == 'undefined' || value == null || value == '') {
        value = defaultValue;
      }


      module.data[key] = value;
    }
  };

  module.get = function(key) {
    if (key == null || key == '') {
      var value = '';

      for (var i = 0, len = module.structure.length; i < len; i++) {
        key = module.structure[i];
        value = value + module.get(key) + '/';
      }

      var valid = false;
      var lastChar = '';

      do {
        lastChar = value.substring(value.length - 1);

        if (lastChar === '/') {
          valid = false;
          value = value.substring(0, value.length - 1);
        } else {
          valid = true;
        }
      } while (! valid);

      return value;
    }

    return module.data[key];
  };


  module.all = function(key) {
    return module.data;
  };

  return module;

})(window, window.document, jQuery, {});