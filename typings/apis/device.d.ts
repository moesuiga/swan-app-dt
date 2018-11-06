/// <reference path="./index.d.ts" />

// 设备

declare namespace swan {
  // ======== 系统信息 ======== //
  /**
   * 获取系统信息
   */
  export function getSystemInfo(options: getSystemInfo.Options): void;
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

  /**
   * 监听内存不足的告警事件，
   *
   * Android 下有告警等级划分，
   * 只有 `LOW` 和 `CRITICAL` 会回调开发者；
   *
   * iOS 无等级划分。
   *
   * @param {Function} callback
   */
  export function onMemoryWarning(callback: cb<onMemoryWarning.CallbackOptions>): void;
  namespace onMemoryWarning {
    type CallbackOptions = {
      /**
       * 仅 Android 有该字段，
       * 对应系统内存告警等级宏定义
       *
       * Android下告警等级对应系统宏：
       * ```
       * TRIM_MEMORY_RUNNING_MODERATE = 5
       * TRIM_MEMORY_RUNNING_LOW = 10
       * TRIM_MEMORY_RUNNING_CRITICAL = 15
       * ```
       */
      level: 5 | 10 | 15;
    }
  }

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

  /**
   * 监听加速度数据，频率：5次/秒，
   *
   * 接口调用后会自动开始监听，
   *
   * 可使用 `swan.stopAccelerometer` 停止监听。
   *
   * @param {Function} callback 监听的回调
   */
  export function onAccelerometerChange(callback: cb<onAccelerometerChange.CallbackOptions>): void;
  namespace onAccelerometerChange {
    interface CallbackOptions {
      /**
       * X轴
       */
      x: number;
      /**
       * Y轴
       */
      y: number;
      /**
       * Z轴
       */
      z: number;
    }
  }

  /**
   * 开始监听加速度数据。
   * @param {Object} [options]
   */
  export function startAccelerometer(options?: startAccelerometer.Options): void;
  namespace startAccelerometer {
    interface Options extends ApiCallback {
      /**
       * 根据机型性能、当前 CPU 与内存的占用情况
       *
       * interval 的设置与
       * 实际 `swan.onAccelerometerChange()` 回调函数的执行频率会有一些出入。
       *
       * interval 的合法值
       *
       * |   值   |                  说明                  |
       * |--------|----------------------------------------|
       * |  game  | 适用于更新游戏的回调频率，在 20ms/次 左右 |
       * |   ui   | 适用于更新 UI 的回调频率，在 60ms/次 左右 |
       * | normal |     普通的回调频率，在 200ms/次 左右     |
       */
      interval?: 'game' | 'ui' | 'normal';
    }
  }

  /**
   * 停止监听加速度数据。
   * @param {Object} [options]
   */
  export function stopAccelerometer(options?: ApiCallback): void;

  // ======== 罗盘 ======== //

  /**
   * 监听罗盘数据，频率：5次/秒，
   *
   * 接口调用后会自动开始监听，
   *
   * 可使用`swan.stopCompass`停止监听。
   * @param {Function} callback 监听的回调
   */
  export function onCompassChange(callback: cb<onCompassChange.CallbackOptions>): void;
  namespace onCompassChange {
    interface CallbackOptions {
      /**
       * 面对的方向度数
       */
      direction: number;
    }
  }

  /**
   * 开始监听罗盘数据。
   * @param {Object} [options]
   */
  export function startCompass(options?: ApiCallback): void;

  /**
   * 停止监听罗盘数据。
   * @param {Object} [options]
   */
  export function stopCompass(options?: ApiCallback): void;

  // ======== 扫码 ======== //

  /**
   * 调起客户端扫码界面，扫码成功后返回对应的结果。
   * @param {Object} [options] 接口调用的回调
   */
  export function scanCode(options?: ApiCallback<scanCode.SuccessOptions>): void;
  namespace scanCode {
    interface SuccessOptions {
      /**
       * 所扫码的内容
       */
      result: string;
      /**
       * 所扫码的类型
       */
      scanType: string;
      /**
       * 所扫码的字符集
       */
      charSet: string;
    }
  }

  // ======== 屏幕亮度 ======== //

  /**
   * 设置屏幕亮度。
   * @param {Object} options
   */
  export function setScreenBrightness(options: setScreenBrightness.Options): void;
  namespace setScreenBrightness {
    interface Options extends ApiCallback {
      /**
       * 屏幕亮度值，范围 0~1，0 最暗，1 最亮。
       */
      value: number;
    }
  }

  /**
   * 获取屏幕亮度。
   * @param {Object} [options]
   */
  export function getScreenBrightness(options?: ApiCallback<getScreenBrightness.SuccessOptions>): void;
  namespace getScreenBrightness {
    interface SuccessOptions {
      /**
       * 屏幕亮度值，范围 0~1，0 最暗，1 最亮。
       */
      value: number;
    }
  }

  /**
   * 设置是否保持常亮状态。
   *
   * 仅在当前智能小程序生效，离开智能小程序后设置失效。
   * @param {Object} options
   */
  export function setKeepScreenOn(options: setKeepScreenOn.Options): void;
  namespace setKeepScreenOn {
    interface Options extends ApiCallback {
      /**
       * 是否保持屏幕常亮
       */
      keepScreenOn: boolean;
    }
  }

  // ======== 用户截屏事件 ======== //

  /**
   * 监听用户主动截屏事件，
   *
   * 用户使用系统截屏按键截屏时触发此事件。
   * @param {Function} callback
   */
  export function onUserCaptureScreen(callback: () => void): void;

  // ======== 振动 ======== //

  /**
   * 使手机发生较长时间的振动（400ms）
   * @param {Object} [options]
   */
  export function vibrateLong(options?: ApiCallback): void;

  /**
   * 使手机发生较短时间的振动（15ms）
   * @param {Object} [options]
   */
  export function vibrateShort(options?: ApiCallback): void;

  // ======== 手机联系人 ======== //

  /**
   * 调用后，
   *
   * 用户可以选择将联系人数据以“新增联系人”或“添加到已有联系人”的方式，
   *
   * 写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。
   * @param options
   */
  export function addPhoneContact(options: addPhoneContact.Options): void;
  namespace addPhoneContact {
    interface Options extends ApiCallback {
      /**
       * 头像本地文件路径
       */
      photoFilePath?: string;
      /**
       * 昵称
       */
      nickName?: string;
      /**
       * 姓氏
       */
      lastName?: string;
      /**
       * 中间名
       */
      middleName?: string;
      /**
       * 名字
       */
      firstName: string;
      /**
       * 备注
       */
      remark?: string;
      /**
       * 手机号
       */
      mobilePhoneNumber?: string;
      /**
       * 微信号
       */
      weChatNumber?: string;
      /**
       * 联系地址国家
       */
      addressCountry?: string;
      /**
       * 联系地址省份
       */
      addressState?: string;
      /**
       * 联系地址城市
       */
      addressCity?: string;
      /**
       * 联系地址街道
       */
      addressStreet?: string;
      /**
       * 联系地址邮政编码
       */
      addressPostalCode?: string;
      /**
       * 公司
       */
      organization?: string;
      /**
       * 职位
       */
      title?: string;
      /**
       * 工作传真
       */
      workFaxNumber?: string;
      /**
       * 工作电话
       */
      workPhoneNumber?: string;
      /**
       * 公司电话
       */
      hostNumber?: string;
      /**
       * 电子邮件
       */
      email?: string;
      /**
       * 网站
       */
      url?: string;
      /**
       * 工作地址国家
       */
      workAddressCountry?: string;
      /**
       * 工作地址省份
       */
      workAddressState?: string;
      /**
       * 工作地址城市
       */
      workAddressCity?: string;
      /**
       * 工作地址街道
       */
      workAddressStreet?: string;
      /**
       * 工作地址邮政编码
       */
      workAddressPostalCode?: string;
      /**
       * 住宅传真
       */
      homeFaxNumber?: string;
      /**
       * 住宅电话
       */
      homePhoneNumber?: string;
      /**
       * 住宅地址国家
       */
      homeAddressCountry?: string;
      /**
       * 住宅地址省份
       */
      homeAddressState?: string;
      /**
       * 住宅地址城市
       */
      homeAddressCity?: string;
      /**
       * 住宅地址街道
       */
      homeAddressStreet?: string;
      /**
       * 住宅地址邮政编码
       */
      homeAddressPostalCode?: string;
    }
  }

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
