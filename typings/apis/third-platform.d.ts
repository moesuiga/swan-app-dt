/// <reference path="./index.d.ts" />

// 第三方平台

declare namespace swan {
  // ======== 获取第三方平台数据 ======== //

  /**
   * 获取第三方平台自定义的数据字段。
   *
   * @description `swan.getExtConfig` 暂时无法通过 `sawn.canIUse` 判断是否兼容，开发者需要自行判断 `swan.getExtConfig` 是否存在兼容。
   *
   * @param {Object} [options]
   *
   * @example
   * ```
     swan.getExtConfig({
       success: function(res) {
         console.log(res.extConfig);
       }
     })
     ```
   */
  export function getExtConfig(options?: ApiCallback<{
    /**
     * 第三方平台自定义的数据
     */
    extConfig: Record<string, any>
  }>): void;

  /**
   * 获取第三方平台自定义的数据字段的同步接口。
   *
   * @description `swan.getExtConfigSync` 暂时无法通过 `swan.canIUse` 判断是否兼容，开发者需要自行判断 `swan.getExtConfigSync` 是否存在兼容。
   *
   * @returns {Object} extConfig 第三方平台自定义的数据
   *
   * @example
     ```
       const extConfig = swan.getExtConfigSync();
       console.log(extConfig);
     ```
   */
  export function getExtConfigSync(): Record<string, any>;
}
