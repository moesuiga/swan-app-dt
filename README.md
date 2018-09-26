## swan-app-dt

基于百度小程序文档(结合微信小程序文档) 的 API DefinitelyTyped

> Tip:
> 百度小程序的文档基本都是抄微信的，但是由于有些功能并没有按文档来实现，所以可能遇到各种问题。欢迎遇到问题的同学提出来进行改正。

### Usage

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
