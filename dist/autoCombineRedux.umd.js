(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.autoCombineRedux = factory());
}(this, (function () { 'use strict';

  var autoCombineSaga = () => {
    console.log("this is auto combine saga js");
  };

  var index = { autoCombineSaga };

  return index;

})));
