(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.autoCombineRedux = factory());
}(this, (function () { 'use strict';

  var autoCombineSaga = () => {
    console.log("this is auto combine saga js");
  };

  // 获取model下所有以.reducer.js结尾的文件
  const matchFilefromPath = (path, searchChild) => {
    return require.context(path, searchChild, /\.reducer\.js$/);
  };

  // 获取完组合成reducer对象
  const importReducer = req => (obj, path) => {
    //从路径中获取reducer name
    // output:[0: "demo",groups: undefined,index: 7,input: "./demo/demo.reducer.js"]
    const [componentName] = path.match(/\w+(?=\.reducer\.js$)/);
    // 组合reducer对象
    const reducer = {
      [componentName]: req(path).default
    };
    return Object.assign({}, obj, reducer);
  };

  // 从CONTEXT路径数组中组合成reducer对象返回
  const getReducers = ctx => ctx.keys().reduce(importReducer(ctx), {});

  var autoCombineReducer = (path = ".", searchChild = true) => {
    return getReducers(matchFilefromPath(path, searchChild));
  };

  var index = { autoCombineReducer, autoCombineSaga };

  return index;

})));
