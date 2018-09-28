/// <reference path="../apis.d.ts" />

// 设备

declare namespace swan {
  // ======== 系统信息 ======== //
  /**
   * 获取系统信息
   */
  export function getSystemInfo(): void;
  namespace getSystemInfo {
    type Options = NeedSuccessCallback<SuccessOptions>;
    interface SuccessOptions {
      /**
       * 手机品牌
       */
      brand: string;
      /**
       * 手机型号
       */
      model: string;
      /**
       * 设备像素比
       */
      pixelRatio: number;
      /**
       * 屏幕宽度
       */
      screenWidth: number;
      /**
       * 屏幕高度
       */
      screenHeight: number;
      /**
       * 可使用窗口宽度
       */
      windowWidth: number;
      /**
       * 可使用窗口高度
       */
      windowHeight: number;
      /**
       * 状态栏的高度
       */
      statusBarHeight: number;
      /**
       * 百度 App 设置的语言
       */
      language: string;
      /**
       * 百度 App 版本号
       */
      version: string;
      /**
       * 操作系统版本
       */
      system: string;
      /**
       * 客户端平台
       */
      platform: string;
      /**
       * 用户字体大小设置
       */
      fontSizeSetting: number;
      /**
       * 客户端基础库版本
       */
      SDKVersion: string;
    }
  }

  /**
   * 获取系统信息同步接口
   */
  export function getSystemInfoSync(): getSystemInfo.SuccessOptions;

  /**
   * 判断智能小程序的API，回调，参数，组件等是否在当前版本可用。
   *
   * 使用 `${API}.${method}.${param}.${options}`
   * 或者 `${component}.${attribute}.${option}` 方式来调用。
   *
   * |     参数     |                        说明                        |
   * | ------------ | ------------------------------------------------- |
   * | ${API}       | API 名字                                           |
   * | ${method}    | 调用方式，有效值为return, success, object, callback |
   * | ${param}     | 参数或者返回值                                      |
   * | ${options}   | 参数的可选值                                        |
   * | ${component} | 组件名字                                            |
   * | ${attribute} | 组件属性                                            |
   * | ${option}    | 组件属性的可选值                                     |
   */
  export function canIUse(option: string): boolean;

  // ======== 内存 ======== //

  // ======== 网络状态 ======== //
  /**
   * 获取网络类型
   */
  export function getNetworkType(options: NeedSuccessCallback<{
    /**
     * 网络类型，
     * 值有 wifi/2g/3g/4g/unknown (Android 下不常见的网络类型)/none (无网络)。
     */
    networkType: networkType;
  }>): void;

  type networkType = 'wifi' | '2g' | '3g' | '4g' | 'none' | 'unknown';

  /**
   * 监听网络状态变化。
   */
  export function onNetworkStatusChange(callback: cb<{
    /**
     * 当前是否有网络连接
     */
    isConnected: boolean;
    /**
     * 网络类型
     */
    networkType: networkType;
  }>): void;

  // ======== 加速度计 ======== //

  // ======== 罗盘 ======== //

  // ======== 扫码 ======== //

  // ======== 屏幕亮度 ======== //

  // ======== 用户截屏事件 ======== //

  // ======== 振动 ======== //

  // ======== 手机联系人 ======== //

  // ======== 拨打电话 ======== //
  /**
   * 拨打电话
   */
  export function makePhoneCall(options: makePhoneCall.Options): void;
  namespace makePhoneCall {
    type Options = {
      /**
       * 需要拨打的电话号码
       */
      phoneNumber: string;
    } & ApiCallback;
  }

  // ======== 剪贴板 ======== //
  /**
   * 设置系统剪贴板的内容
   */
  export function setClipboardData(options: setClipboardData.Options): void;
  namespace setClipboardData {
    type Options = {
      /**
       * 需要设置的内容
       */
      data: string;
    } & ApiCallback
  }

  /**
   * 获取系统剪贴板内容
   */
  export function getClipboardData(options: ApiCallback<{
    /**
     * 剪贴板的内容
     */
    data: string
  }>): void;
}
