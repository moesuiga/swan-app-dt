/// <reference path="./index.d.ts" />

// 数据存储

declare namespace swan {
  // ======== 存储数据 ======== //
  /**
   * 将数据存储在本地缓存指定的 key 中。
   * 如果之前存在同名 key ，会覆盖掉原来该 key 对应的内容。
   * 这是一个异步接口。
   */
  export function setStorage(options: setStorage.Options): void;
  namespace setStorage {
    type Options = {
      /**
       * 本地缓存中的指定的 key
       */
      key: string;
      /**
       * 需要存储的内容
       */
      data: obj | string;
    } & ApiCallback;
  }

  /**
   * 将数据存储在本地缓存中指定的 key 中。
   * 如果之前存在同名 key ，会覆盖掉原来该 key 对应的内容。
   * 这是一个同步接口。
   * @param {String} key 本地缓存中的指定的 key
   * @param {Object|String} data 需要存储的内容
   */
  export function setStorageSync(key: string, data: obj | string): void;

  /**
   * 从本地缓存中异步获取指定 key 对应的内容。
   */
  export function getStorage(): void;
  namespace getStorage {
    type Options = {
      /**
       * 本地缓存中的指定的 key
       */
      key: string;
    } & NeedSuccessCallback<SuccessOptions>;

    type SuccessOptions = {
      /**
       * key 对应的内容
       *
       * @description 这里官方文档给出的类型为`String`，但是我想了想，还是写成了`any`，毕竟实际拿到的是什么，跟实际存储时有关。 -- 2018年9月28日
       *
       * @see [getStorage](https://smartapp.baidu.com/docs/develop/api/storage_save/#getStorage/)
       */
      data: any;
    }
  }

  /**
   * 从本地缓存中同步获取指定 key 对应的内容。
   *
   * @param {String} key 本地缓存中的指定的 key
   */
  export function getStorageSync(key: string): any;

  /**
   * 异步获取当前 storage 的相关信息。
   */
  export function getStorageInfo(options: NeedSuccessCallback<getStorageInfo.SuccessOptions>): void;
  namespace getStorageInfo {
    interface SuccessOptions {
      /**
       * 当前 storage 中所有的 key。
       */
      keys: string[];
      /**
       * 当前占用的空间大小, 单位 kB。
       */
      currentSize: number;
      /**
       * 限制的空间大小，单位 kB。
       */
      limitSize: number;
    }
  }

  /**
   * 同步获取当前 storage 的相关信息。
   */
  export function getStorageInfoSync(): getStorageInfo.SuccessOptions;

  // ======== 存储清理 ======== //
  /**
   * 从本地缓存中异步移除指定 key。
   *
   * @description 不明白为何，官方文档中在这里的成功回调为必填项 -- 2018年9月28日
   *
   * @see [removeStorage](https://smartapp.baidu.com/docs/develop/api/storage_remove/#removeStorage/)
   */
  export function removeStorage(options: removeStorage.Options): void;
  namespace removeStorage {
    type Options = {
      /**
       * 本地缓存中的指定的 key
       */
      key: string;
    } & NeedSuccessCallback;
  }

  /**
   * 从本地缓存中同步移除指定 key。
   *
   * @param {String} key 本地缓存中的指定的 key
   */
  export function removeStorageSync(key: string): void;

  /**
   * 清理本地数据缓存。
   *
   * 不明白为何，官方文档中在这里的成功回调为必填项 -- 2018年9月28日
   *
   * 更奇怪的是官方下面的示例是没传参数
   *
    ```js
    swan.clearStorage();
    ```
   * 据此，我改成了非必填。
   *
   * @see [clearStorage](https://smartapp.baidu.com/docs/develop/api/storage_remove/#clearStorage/)
   */
  export function clearStorage(options?: ApiCallback): void;

  /**
   * 同步清理本地数据缓存。
   */
  export function clearStorageSync(): void;
}
