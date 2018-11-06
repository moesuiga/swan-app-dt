/// <reference path="./index.d.ts" />

// 调试

declare namespace swan {

  /**
   * 设置是否打开调试开关，此开关对正式版也能生效。
   * @param {Object} options
   * @param {Boolean} options.enableDebug 是否打开调试
   *
   * @since `version: 10.12`, `SDK: 1.12`
   *
   * @description
   *  - 可以先在开发版或体验版打开调试模式，再切回到正式版就能看到调试器;
   *  - 请确认已登录百度帐号，当前登录用户属于该小程序开发者时，才能打开调试。
   */
  export function setEnableDebug(options: setEnableDebug.Options): void;
  namespace setEnableDebug {
    interface Options {
      /**
       * 是否打开调试
       */
      enableDebug: boolean;
    }
  }
}
