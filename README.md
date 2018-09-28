# swan-app-dt

基于百度小程序文档的 API DefinitelyTyped

> Tip:
> 有部分内容百度的实际实现与文档描述暂时不同，这里以文档为准。
>
> 一是不确定具体有哪些不同，
> 二是以后百度应该会一一修复
>
> 所以有发现不同的地方时，可以在本地重定义一下。
> 就是这样😋

## Usage

1.  参考 test:

* [app.ts](https://github.com/moesuiga/swan-app-dt/blob/master/test/app.ts)
* [page.ts](https://github.com/moesuiga/swan-app-dt/blob/master/test/pages/index/index.ts)

2.  tsconfig 配置

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es5",
    "module": "es2015",
    "inlineSourceMap": true,
    "inlineSources": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    // 以下两项开启 Decorator
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "typeRoots": ["node_modules/swan-app-dt"]
  }
}
```

## TODO

- [x] 网络
- [ ] AI
- [x] 媒体
- [x] 文件
- [x] 数据存储
- [x] 位置
- [ ] 界面
- [ ] 设备
- [ ] 第三方平台
- [x] 开放接口
- [ ] 更新
- [ ] 调试
