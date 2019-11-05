// 获取model下所有以.reducer.js结尾的文件
const matchFilefromPath = (path, searchChild) => {
  try {
    let paths = require.context(path, searchChild, /\.reducer\.js$/);
    console.log("paths=", paths);

    return paths;
  } catch (e) {
    console.log("e = ", e);
    return null;
  }
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

export default (path = ".", searchChild = true) => {
  return getReducers(matchFilefromPath(path, searchChild));
};
