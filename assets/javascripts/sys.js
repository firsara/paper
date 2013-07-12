// ES5 15.2.3.5
// http://es5.github.com/#x15.2.3.5
if (!Object.create) {
  Object.create = function create(prototype, properties) {
    var object;
    if (prototype === null) {
      object = { "__proto__": null };
      } else {
        if (typeof prototype != "object") {
          throw new TypeError("typeof prototype["+(typeof prototype)+"] != 'object'");
        }

        var Type = function () {};
        Type.prototype = prototype;
        object = new Type();
        // IE has no built-in implementation of `Object.getPrototypeOf`
        // neither `__proto__`, but this manually setting `__proto__` will
        // guarantee that `Object.getPrototypeOf` will work as expected with
        // objects created using `Object.create`
        object.__proto__ = prototype;
      }
      if (properties !== void 0) {
        if (Object.defineProperties) {
          Object.defineProperties(object, properties);
        } else {
          var onPropertyChange = function (e) {

            if (event.propertyName == name) {
              // temporarily remove the event so it doesn't fire again and create a loop
              object.detachEvent("onpropertychange", onPropertyChange);

              // get the changed value, run it through the set function
              var newValue = setFn(object[name]);

              // restore the get function
              object[name] = getFn;
              object[name].toString = getFn;

              // restore the event
              object.attachEvent("onpropertychange", onPropertyChange);
            }
          };

          for (var k in properties) {
            var name = k;
            var getFn = properties[k];

            object[name] = getFn;
            object[name].toString = getFn;

            try {
              object.attachEvent("onpropertychange", onPropertyChange);
            } catch(e) {}
          }
        }
      }
    
    return object;
  };
}


// Sys Implementation
// See Node.js http://www.nodejs.org/
var sys = (function(){
  var exports = {};

  exports.inherits = function(ctor, superCtor) {
    var store = ctor.prototype;

    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    ctor.prototype.super_ = superCtor;

    for (var k in store) {
      ctor.prototype[k] = store[k];
    }
  };

  return exports;
})();