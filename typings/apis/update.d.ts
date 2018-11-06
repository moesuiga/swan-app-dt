/// <reference path="./index.d.ts" />

// 更新

declare namespace swan {
  /**
   * 获取全局唯一的版本更新管理器，用于管理小程序更新。
   *
   * @description 检查更新操作由百度APP在小程序冷启动时自动触发，不需由开发者主动触发，开发者只需监听检查结果即可。
   */
  export function getUpdateManager(): getUpdateManager.UpdateManager;
  namespace getUpdateManager {
    interface UpdateManager {
      /**
       * 当向百度后台请求完新版本信息，会进行回调
       * @param {Function} callback
       */
      onCheckForUpdate(callback: (hasUpdate: boolean) => void): void;

      /**
       * 当新版本下载完成，会进行回调
       *
       * @param {Function} callback
       *
       * @description 当百度APP检查到小程序有新版本，会主动触发下载操作（无需开发者触发），当下载完成后，会通过 `onUpdateReady` 告知开发者。
       */
      onUpdateReady(callback: cb): void;

      /**
       * 当新版本下载失败，会进行回调
       * @param {Function} callback
       *
       * @description 当百度APP检查到小程序有新版本，会主动触发下载操作（无需开发者触发），如果下载失败（可能是网络原因等），会通过 `onUpdateFailed` 告知开发者。
       */
      onUpdateFailed(callback: cb): void;

      /**
       * 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
       *
       * @description 当小程序新版本已经下载时（即收到 `onUpdateReady` 回调），可以通过这个方法强制重启小程序并应用上最新版本。
       */
      applyUpdate(): void;
    }
  }
}
