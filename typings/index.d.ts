/// <reference path="./app.d.ts" />
/// <reference path="./page.d.ts" />

declare namespace swan {
  /**
   * 回调函数
   *
   * 至少要有success回调
   */
  interface ICallbackSuccess {
    /**
     * 接口调用成功的回调
     * @param result 调用成功的返回参数
     */
    success(result?: any): void;
    /**
     * 接口调用失败的回调
     * @param error 调用失败的说明
     */
    fail?(error?: any): void;
    /**
     * 接口调用结束的回调
     */
    complete?(msg?: any): void;
  }

  /**
   * 回调函数
   *
   * 全部可选
   */
  interface ICallback {
    /**
     * 接口调用成功的回调
     * @param res
     */
    success?(res?: any): void;
    /**
     * 接口调用失败的回调
     * @param error
     */
    fail?(error?: any): void;
    /**
     * 接口调用结束的回调
     */
    complete?(msg?: any): void;
  }

  interface ICallbackFail {
    errMsg: string;
  }

  interface ICallbackFailError {
    errno: number;
    error: string;
    error_description: string;
  }

  /**
   * 发送网络请求的参数
   *
   * content-type默认为'application/json'
   * url中不能有端口
   */
  interface IRequestOptions extends ICallback {
    /**
     * 开发者服务器接口地址
     */
    url: string;
    /**
     * 请求的参数
     */
    data?: swan.IData | string;
    /**
     * 设置请求的header，
     * 不能设置Referer
     */
    header?: swan.IData;
    /**
     * 设置请求方法
     * @default GET
     */
    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE';
    /**
     * 如果设置为json，会尝试对返回的数据做一次JSON.parse
     * @default json
     */
    dataType?: string;
    /**
     * 收到开发者服务成功返回的回调函数
     * @param res 返回结果
     */
    success?(res: IRequestSuccess): void;
  }

  /**
   * 发起网络请求成功的返回参数
   */
  interface IRequestSuccess {
    /**
     * 开发者服务器返回的数据
     */
    data: any;
    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;
    /**
     * 开发者服务器返回的 HTTP Response Header
     */
    header: swan.IData;
  }

  /**
   * 上传文件的参数设置
   */
  interface IUploadFileOptions extends ICallback {
    /**
     * 开发者服务器URL
     */
    url: string;
    /**
     * 要上传的文件资源的路径
     */
    filePath: string;
    /**
     * ⽂件对应的 key ,
     * 开发者在服务器端通过这个 key 可以获取到⽂件⼆进制内容
     */
    name: string;
    /**
     * HTTP 请求 Header, header 中不能设置 Referer
     */
    header?: swan.IData;
    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: swan.IData;
    /**
     * 接⼝调⽤成功的回调函数
     * @param res 成功回调的结果
     */
    success?(res: IUploadFileSuccess): void;
  }

  /**
   * 上传文件成功的返回参数
   */
  interface IUploadFileSuccess {
    /**
     * 开发者服务器返回的数据
     */
    data: string;
    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;
  }

  /**
   * 上传任务
   */
  interface IUploadTask {
    /**
     * 监听上传进度变化
     */
    onProgressUpdate: (cb: (res: IUploadTaskProgressUpdateCallbackData) => void) => void;
    /**
     * 中断上传任务
     */
    abort: () => void;
  }

  /**
   * 上传任务监听进度变化事件的回调参数
   */
  interface IUploadTaskProgressUpdateCallbackData {
    /**
     * 上传进度百分⽐
     */
    progress: number;
    /**
     * 已经上传的数据⻓度， 单位 Bytes
     */
    totalBytesSent: number;
    /**
     * 预期需要上传的数据总⻓度， 单位 Bytes
     */
    totalBytesExpectedToSend: number;
  }

  /**
   * 下载文件的参数
   */
  interface IDownloadFileOptions extends ICallback {
    /**
     * 下载资源的 url
     */
    url: string;
    /**
     * HTTP 请求 Header， header 中不能设置 Referer
     */
    header?: swan.IData;
    /**
     * 接⼝调⽤成功的回调函数
     * @param res 成功回调的结果
     */
    success?(res: IDownloadFileSuccessData): void;
  }

  /**
   * 下载文件成功的回调参数
   */
  interface IDownloadFileSuccessData {
    /**
     * 临时⽂件路径， 下载后的⽂件会存储到⼀个临时⽂件
     * @tips
     * - 在小程序本次启动期间可以正常使用，
     * - 如需持久保存，需要主动调用 swan.saveFile
     */
    tempFilePath: string;
    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;
  }

  /**
   * 下载任务
   */
  interface IDownloadTask {
    onProgressUpdate: (cb: (res: IDownloadTaskProgressUpdateData) => void) => void;
    /**
     * 中断下载任务
     */
    abort: () => void;
  }

  /**
   * 下载文件监听进度变化事件的参数
   */
  interface IDownloadTaskProgressUpdateData {
    /**
     * 下载进度百分比
     */
    progress: number;
    /**
     * 已经下载的数据长度，单位 Bytes
     */
    totalBytesWritten: number;
    /**
     * 预期需要下载的数据总长度，单位 Bytes
     */
    totalBytesExpectedToWrite: number;
  }

  /**
   * 创建WebSocket连接方法的参数
   */
  interface IConnectSocketOptions extends ICallback {
    /**
     * 开发者服务器接口地址，
     *
     * 必须是 wss 协议，且域名必须是后台配置的合法域名
     *
     * @attention 是 `webscketUrl` 还是 `websocketUrl`？ 是文档写错了还是源码写错了？
     */
    webscoketUrl: string;
    /**
     * 子协议数组
     */
    protocolsArray?: string[];
  }

  /**
   * 建立WebSocket连接返回的socketTask
   */
  interface ISocketTask {
    /**
     * 对应swan.sendSocketMessage
     */
    send(options: ISendSocketMessageOptions): void;
    /**
     * 对应swan.closeSocket
     */
    close(options: ICloseSocketOptions): void;
    /**
     * 对应swan.onSocketOpen
     */
    onOpen(callback: () => void): void;
    /**
     * 对应swan.onSocketClose
     */
    onClose(callback: (res?: any) => void): void;
    /**
     * 对应swan.onSocketError
     */
    onError(callback: (error?: any) => void): void;
    /**
     * 对应swan.onSocketMessage
     */
    onMessage(callback: (res?: any) => void): void;
  }

  /**
   * 通过WebSocket连接发送数据的参数
   */
  interface ISendSocketMessageOptions {
    /**
     * 需要发送的内容
     */
    data: string | ArrayBuffer;
    /**
     * 失败的回调函数
     */
    fail?(): void;
    /**
     * 执行完成的回调函数
     */
    complete?(): void;
  }

  /**
   * 关闭WebSocket连接的参数
   */
  interface ICloseSocketOptions extends ICallback {
    /**
     * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。
     *
     * 如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
     */
    code?: number;
    /**
     *  一个可读的字符串，表示连接被关闭的原因。
     *
     * 这个字符串必须是不长于123字节的UTF-8文本（不是字符）
     */
    reason?: string;
  }

  /**
   * 选择图片的参数
   */
  interface IChooseImageOptions extends ICallbackSuccess {
    /**
     * 最多可以选择的图片张数
     * @default 9
     */
    count?: string;
    /**
     * original 原图，compressed 压缩图，默认二者都有
     */
    sizeType?: ['original', 'compressed'] | ['original'] | ['compressed'];
    /**
     * album 从相册选图，camera 使用相机，默认二者都有
     */
    sourceType?: ['album', 'camera'] | ['album'] | ['camera'];
    /**
     * 成功则返回图片的本地文件路径列表 tempFilePaths
     */
    success(data: IChooseImageSuccessData): void;
  }

  /**
   * 选择图片调用成功的回调参数
   */
  interface IChooseImageSuccessData {
    tempFilePaths: string[];
    tempFiles: IFile[];
  }

  /**
   * chooseImage返回的本地文件 File 对象
   */
  interface IFile {
    /**
     * 本地文件路径
     */
    path: string;
    /**
     * 本地文件大小，单位：B
     */
    size: number;
  }

  /**
   * 预览图片方法的参数
   */
  interface IPreviewImageOptions extends ICallback {
    /**
     * 当前显示图片的链接，不填则默认为 urls 的第一张
     */
    current?: string;
    /**
     * 需要预览的图片链接列表
     */
    urls: string[];
  }

  /**
   * 获取图片信息的参数
   */
  interface IGetImageInfoOptions extends ICallback {
    /**
     * 图片的路径，可以是相对路径，临时文件路径，存储文件路径
     */
    src: string;
    /**
     * 接口调用成功的回调函数
     */
    success?(data: IGetImageInfoSuccessData): void;
  }

  /**
   * 获取图片信息成功回调的参数
   *
   * 图片信息
   */
  interface IGetImageInfoSuccessData {
    /**
     * 图片宽度，单位px
     */
    width: number;
    /**
     * 图片高度，单位px
     */
    height: number;
    /**
     * 返回图片的本地路径
     */
    path: string;
  }

  /**
   * 保存图片的参数
   */
  interface ISaveImageToPhotosAlbumOptions extends ICallback {
    /**
     * 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
     */
    file_path: string;
    /**
     * 接口调用成功的回调函数
     */
    success?(res: {
      /**
       * 调用结果
       */
      errMsg: string
    }): void;
  }

  /**
   * 通过 `createVideoContext` 方法创建的video上下文
   *
   * videoContext 通过 videoId 跟一个 video 组件绑定，
   *
   * 通过它可以操作一个 video 组件。
   */
  interface IVideoContext {
    /**
     * 播放
     */
    play(): void;
    /**
     * 暂停
     */
    pause(): void;
    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): void;
    /**
     * 发送弹幕
     * @param danmu
     */
    sendDanmu(danmu: IDanmu): void;
    /**
     * 进入全屏
     */
    requestFullScreen(): void;
    /**
     * 退出全屏
     */
    exitFullScreen(): void;
  }

  /**
   * 弹幕
   */
  interface IDanmu {
    /**
     * 弹幕内容
     */
    text: string;
    /**
     * 弹幕颜色
     */
    color: string;
  }

  /**
   * 通过 `createLivePlayerContext` 方法创建的直播组件上下文
   */
  interface ILivePlayerContext {
    play(obj: ICallback): void;
    stop(obj: ICallback): void;
    mute(obj: ICallback): void;
    requestFullScreen(obj: ILivePlayerContextRequestFullScreenData): void;
    exitFullScreen(obj: ICallback): void;
  }

  interface ILivePlayerContextRequestFullScreenData extends ICallback {
    /**
     * 屏幕方向
     * - 0: 正常竖向
     * - 90: 屏幕逆时针90度
     * - -90: 屏幕顺时针90度
     */
    direction: 0 | 90 | -90;
  }

  /**
   * 保存文件的参数
   */
  interface ISaveFileOptions extends ICallback {
    /**
     * 需要保存的文件的临时路径
     */
    tempFilePath: string;
    success?(res: {
      /**
       * 文件的保存路径
       */
      savedFilePath: string
    }): void;
  }

  /**
   * 获取已保存文件列表方法的参数
   */
  interface IGetSavedFileListOptions extends ICallback {
    success?(res: ISavedFileList): void;
  }

  interface ISavedFileList {
    /**
     * 文件列表
     */
    fileList: ISavedFile[];
  }

  interface ISavedFile {
    /**
     * 文件的本地路径
     */
    filePath: string;
    /**
     * 文件的保存时的时间戳，
     * 从 `1970/01/01 08:00:00` 到当前时间的秒数
     */
    createTime: number;
    /**
     * 文件大小，单位B
     */
    size: number;
  }

  /**
   * 获取本地文件信息或删除本地文件方法的参数
   */
  interface IGetOrRemoveSavedFileInfoOptions extends ICallback {
    /**
     * 要获取信息或删除的文件路径
     */
    filePath: string;
    success?(res: {
      /**
       * 文件大小，单位B
       */
      size: number;
      /**
       * 文件保存时的时间戳，
       * 从 `1970/01/01 08:00:00` 到该时刻的秒数
       */
      createTime: number;
    }): void;
  }

  /**
   * 打开文档方法的参数
   */
  interface IOpenDocumentOptions extends ICallback {
    filePath: string;
    fileType?: string;
  }

  /**
   * 异步设置本地缓存的参数
   */
  interface ISetStorageOptions extends ICallback {
    /**
     * 本地缓存中的指定的 key
     */
    key: string;
    /**
     * 需要缓存的内容
     */
    data: any;
  }

  interface IGetStorageOptions extends ICallback {
    /**
     * 本地缓存中的指定的 key
     */
    key: string;
    success?(res: {
      /**
       * key 对应的内容
       */
      data: any
    }): void;
  }

  interface IGetStorageInfoOptions extends ICallback {
    success?(res: IGetStorageInfoSuccessData): void;
  }

  interface IGetStorageInfoSuccessData {
    /**
     * 当前storage中所有的key
     */
    keys: string[];
    /**
     * 当前占用的空间大小, 单位kb
     */
    currentSize: number;
    /**
     * 限制的空间大小，单位kb
     */
    limitSize: number;
  }

  /**
   * 异步移除缓存中指定的key方法的参数
   */
  interface IRemoveStorageOptions extends ICallbackSuccess {
    /**
     * 本地缓存中的指定的 key
     */
    key: string;
    success(res?: any): void;
  }

  interface IGetLocationOptions extends ICallbackSuccess {
    /**
     * 坐标类型
     *
     * 默认为 wgs84 返回 gps 坐标，可选gcj02
     */
    type?: 'wgs84' | 'gcj02';
    success(res: ILocationData): void;
  }

  interface ILocationData {
    /**
     * 纬度，浮点数，范围为-90~90，负数表示南纬
     */
    latitude: number;
    /**
     * 经度，浮点数，范围为-180~180，负数表示西经
     */
    longitude: number;
    /**
     * 速度，浮点数，单位m/s
     */
    speed: number;
    /**
     * 位置的精确度
     */
    accuracy: number;
    /**
     * 高度，单位 m
     * @version 1.2.0
     */
    altitude: number;
    /**
     * 垂直精度，单位 m（Android 无法获取，返回 0）
     */
    verticalAccuracy: number;
    /**
     * 水平精度，单位 m
     */
    horizontalAccuracy: number;
  }

  interface IChooseLocationOptions extends ICallbackSuccess {
    success(res: IChooseLocationSuccessData): void;
  }

  interface IChooseLocationSuccessData {
    /**
     * 位置名称
     */
    name: string;
    /**
     * 详细地址
     */
    address: string;
    /**
     * 纬度，浮点数，范围为-90~90，负数表示南纬
     */
    latitude: number;
    /**
     * 经度，浮点数，范围为-180~180，负数表示西经
     */
    longitude: number;
  }

  interface IOpenLocationOptions extends ICallback {
    /**
     * 纬度，范围为-90~90，负数表示南纬
     */
    latitude: number;
    /**
     * 经度，范围为-180~180，负数表示西经
     */
    longitude: number;
    /**
     * 缩放比例，范围5~18，默认为18
     */
    scale?: number;
    /**
     * 位置名
     */
    name?: string;
    /**
     * 地址的详细说明
     */
    address?: string;
  }


  /**
   * 画布环境
   */
  interface ICanvasContext {
    /**
     * 设置填充色。
     * @param color 设置的填充色
     */
    setFillStyle(color: string): void;
    /**
     * 设置边框颜色。
     * @param color 设置的边框颜色
     */
    setStrokeStyle(color: string): void;
    /**
     * 设置阴影样式。
     * @param options
     */
    setShadow(options: IShadowStyle): void;
    /**
     * 创建一个线性的渐变颜色。
     * @param options 起点与终点的坐标
     */
    createLinearGradient(options: ICoordinates): void;
  }

  /**
   * 阴影样式
   */
  interface IShadowStyle {
    /**
     * 阴影相对于形状在水平方向的偏移
     */
    offsetX: number;
    /**
     * 阴影相对于形状在竖直方向的偏移
     */
    offsetY: number;
    /**
     * 阴影的模糊级别，数值越大越模糊
     * @range 1 ~ 100
     */
    blur: number;
    /**
     * 阴影的颜色
     */
    color: string;
  }

  /**
   * 起点与终点的坐标
   */
  interface ICoordinates {
    /**
     * 起点的x坐标
     */
    x0: number;
    /**
     * 起点的y坐标
     */
    y0: number;
    /**
     * 终点的x坐标
     */
    x1: number;
    /**
     * 终点的y坐标
     */
    y1: number;
  }


  /**
   * 异步获取系统信息方法的参数
   */
  interface IGetSystemInfoOptions extends ICallbackSuccess {
    success(res: ISystemInfo): void;
  }

  /**
   * 系统信息
   */
  interface ISystemInfo {
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
     * 手百版本号
     */
    version: string;
    /**
     * 客户端平台
     */
    platform: string;
    /**
     * 操作系统版本
     */
    system: string;

    /**
     * 用户字体大小设置
     */
    fontSizeSetting: number;
    /**
     * 语言
     */
    language: string;
  }

  /**
   * 网络类型
   */
  type networkType = 'wifi' | '2g' | '3g' | '4g' | 'unknown' | 'none';

  interface IGetNetworkTypeOptions extends ICallbackSuccess {
    success(res: { networkType: networkType }): void;
  }

  interface INetworkTypeData {
    isConnected: boolean;
    networkType: networkType
  }

  /**
   * 拨打电话的参数
   */
  interface IMakePhoneCallOptions extends ICallback {
    /**
     * 需要拨打的电话号码
     */
    phoneNumber: string;
  }

  /**
   * 设置剪贴板的参数
   */
  interface ISetClipboardDataOptions extends ICallback {
    /**
     * 需要设置的内容
     */
    data: string;
  }

  interface IGetClipboardDataOptions extends ICallback {
    success?(res: {
      /**
       * 剪贴板的内容
       */
      data: string;
    }): void;
  }

  interface IShowToastOptions extends ICallback {
    /**
     * 提示的内容
     */
    title: string;
    /**
     * 图标，有效值 "success",
     * @default "normal"
     */
    icon?: 'normal' | 'success';
    /**
     * 提示的延迟时间，单位毫秒
     * @default 1500
     */
    duration?: number;
    /**
     * 是否显示透明蒙层，防止触摸穿透，
     * @default false
     */
    mask?: boolean;
    success?(): void;
  }

  interface IShowLoadingOptions extends ICallback {
    /**
     * 提示的内容
     */
    title: string;
    /**
     * 是否显示透明蒙层，防止触摸穿透，
     * @default false
     */
    mask?: boolean;
  }

  interface IShowModalOptions extends ICallback {
    /**
     * 提示的标题
     */
    title: string;
    /**
     * 提示的内容
     */
    content: string;
    /**
     * 是否显示取消按钮，
     * @default true
     */
    showCancel?: boolean;
    /**
     * 取消按钮的文字，最多 4 个字符
     * @default "取消"
     */
    cancelText?: string;
    /**
     * 取消按钮的文字颜色，
     * @default "#000000"
     */
    cancelColor?: string;
    /**
     * 确定按钮的文字，最多 4 个字符
     * @default "确定"，
     */
    confirmText?: string;
    /**
     * 确定按钮的文字颜色，
     * @default "#3c76ff"
     */
    confirmColor?: string;
    success?(res: IActionData): void;
  }

  interface IActionData {
    /**
     * 为 true 时，表示用户点击了确定按钮
     */
    confirm: boolean;
    /**
     * 为 true 时，表示用户点击了取消
     */
    cancel: boolean;
  }

  interface IShowActionSheetOptions extends ICallback {
    /**
     * 按钮的文字数组，数组长度最大为6个
     */
    itemList: string[];
    /**
     * 按钮的文字颜色，
     * @default "#3c76ff"
     */
    itemColor?: string;
    success?(res: {
      /**
       * 用户点击的按钮，从上到下的顺序，从0开始
       */
      tapIndex: number;
    }): void;
  }

  interface ISetNavigationBarTitleOptions extends ICallback {
    /**
     * 页面标题
     */
    title: string;
  }

  interface ISetNavigationBarColorOptions extends ICallback {
    /**
     * 前景颜色值，包括按钮、标题、状态栏的颜色，
     * 仅支持 #ffffff 和 #000000
     */
    frontColor: '#ffffff' | '#000000';
    /**
     * 背景颜色值，有效值为十六进制颜色
     */
    backgroundColor: string;
    /**
     * 动画效果
     */
    animation?: INavigationBarAnimation;
    success?(res: {
      /**
       * 调用结果
       */
      errMsg: string;
    }): void;
  }

  interface INavigationBarAnimation {
    /**
     * 动画变化时间，单位：毫秒
     * @default 0
     */
    duration?: number;
    /**
     * 动画变化方式
     * @default "linear"
     */
    timingFunc?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  }


  interface ITabBarOptions extends ICallback {
    /**
     * tabBar的哪一项，从左边算起
     */
    index: string;
  }

  interface ISetTabBarBadgeOptions extends ITabBarOptions {
    /**
     * 显示的文本，超过 4 个字符则显示成“…”
     */
    text: string;
  }

  interface ISetTabBarStyleOptions extends ICallback {
    /**
     * tab 上的文字默认颜色
     */
    color: string;
    /**
     * tab 上的文字选中时的颜色
     */
    selectedColor: string;
    /**
     * tab 的背景色
     */
    backgroundColor: string;
    /**
     * tabbar上边框的颜色， 仅支持 black/white
     */
    borderStyle: 'black' | 'white';
  }

  interface ISetTabBarItemOptions extends ICallback {
    /**
     * tabBar的哪一项，从左边算起
     */
    index: string;
    /**
     * tab 上按钮文字
     */
    text: string;
    /**
     * 图片绝对路径，icon 大小限制为40kb，
     *
     * 建议尺寸为 81px * 81px，
     *
     * 当 `postion` 为 `top` 时,此参数无效，不支持网络图片
     */
    iconPath: string;
    /**
     * 选中时的图片的绝对路径，icon 大小限制为40kb，
     *
     * 建议尺寸为 81px * 81px ，
     *
     * 当 `position` 为 `top` 时，此参数无效
     */
    selectedIconPath: string;
  }

  interface INavigateOptions extends ICallback {
    /**
     * 需要跳转的应用内的页面的路径 , 路径后可以带参数。
     *
     * 参数与路径之间使用?分隔，参数键与参数值用=相连，
     *
     * 不同参数用&分隔；如 'path?key=value&key2=value2'
     *
     * @attention
     * switchTab方法不可以带参数，跳转的路径需要是在 app.json 的 `tabBar` 字段定义的页面
     */
    url: string;
  }

  interface ISelectorQuery {
    /**
     * 在当前页面下选择第一个匹配选择器selector的节点，返回一个NodesRef对象实例，可以用于获取节点信息。
     *
     * 以上是微信小程序文档的说明，百度目前的实现是 `document.querySelector`，
     * 而且实际测试发现也得不到想要的结果。
     * 在控制台打印`document`可以发现在body中只有两个`script`和一个`div#san_devtool_highlighter`。
     * 通过该方法能得到的也只有`script`和`div#san_devtool_highlighter`。
     * 传入其他的页面上有的类名、ID名等都无法获得该元素。
     * @param selector 类似于CSS的选择器
     */
    select: (selector: string) => null | HTMLElement;
    /**
     * 在当前页面下选择匹配选择器selector的节点，返回一个NodesRef对象实例。 与selectorQuery.select(selector)不同的是，它选择所有匹配选择器的节点。
     *
     * 以上是微信小程序文档的说明，百度目前的实现是 `document.querySelectorAll`，
     * 而且实际测试发现也得不到想要的结果。
     * 在控制台打印`document`可以发现在body中只有两个`script`和一个`div#san_devtool_highlighter`。
     * 通过该方法能得到的也只有`script`和`div#san_devtool_highlighter`。
     * 传入其他的页面上有的类名、ID名等都无法获得该元素。
     * @param selector 类似于CSS的选择器
     */
    selectAll: (selector: string) => HTMLElement[];
  }

  interface ILoginOptions extends ICallback {
    success?(res: {
      /**
       * 用户登录凭证（有效期五分钟）
       *
       * 开发者需要在开发者服务器后台调用 api，
       *
       * 使用 code 换取 openid 和 session_key 等信息
       */
      code: string;
    }): void;
  }

  interface IAuthorizeOptions extends ICallback {
    /**
     * 需要获取权限的scope
     * - scope.userInfo 对应接口 swan.getUserInfo
     * - scope.userLocation 对应接口 swan.getLocation
     */
    scope: 'scope.userInfo' | 'scope.userLocation';
    success?(res: {
      /**
       * 调用结果
       */
      errMsg: string;
    }): void;
  }

  interface IGetUserInfoOptions extends ICallback {
    success?(res: IGetUserInfoSuccess): void;
    fail?(error: ICallbackFailError): void;
  }

  interface IGetUserInfoSuccess {
    /**
     * 用户信息对象，不包含 openid 等敏感信息
     */
    userinfo: swan.IPublicUserInfo;
    /**
     * 包括敏感数据在内的完整用户信息的加密数据
     */
    data: string;
    /**
     * 加密算法的初始向量
     */
    iv: string;
  }

  /**
   * 公开的用户信息
   */
  export interface IPublicUserInfo {
    /**
     * 用户头像
     */
    headimgurl: string;
    /**
     * 用户名
     */
    nickname: string;
    /**
     * 性别
     */
    sex: string;
  }

  interface IGetPhoneNumberOptions extends ICallback {
    success?(res: any): void;
  }

  interface IOpenSettingOptions extends ICallback {
    success?(res: {
      /**
       * 用户授权结果，
       *
       * 其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权
       */
      authSetting: {
        [key: string]: boolean;
      }
    }): void;
  }

  interface IOpenShareOptions extends ICallbackSuccess {
    /**
     * 分享标题
     */
    title?: string;
    /**
     * 分享内容
     */
    content?: string;
    /**
     * 分享内容
     */
    iconUrl?: string;
    /**
     * 用于配置弹出面板上渠道按钮及顺序
     */
    pannel?: string[];
    /**
     * 分享类型，
     *
     * 支持图片（image手百>=9.0）、网页(url)、
     * 音频（audio手百>=8.4）、视频类型（video手百>=8.4）
     */
    type?: 'image' | 'url' | 'audio' | 'video';
    /**
     * 当前slave的路径
     */
    path: string;
    /**
     * 用于指定调起某一特定类型渠道的分享，展现面板供用户选择，渠道标识参考表 例如：微信
     * @default "all"
     */
    mediaType?: string;
    success(
      /**
       * 渠道名
       */
      res?: string
    ): void;
  }

  /**
   * 支付参数
   */
  interface IPaymentOptions extends ICallbackSuccess {
    /**
     * 支付信息
     */
    orderinfo: swan.IData | string;
  }

  /**
   * 聚合收银台支付参数
   */
  interface IPolymerPaymentOptions extends IPaymentOptions {
    /**
     * 支付方式
     */
    reqData: swan.IData;
  }

  interface INavigateToMiniProgramOptions extends ICallback {
    /**
     * 要打开的小程序 appId
     */
    appId: string;
    /**
     * 打开的页面路径，如果为空则打开首页
     */
    path?: string;
    /**
     * 需要传递给目标小程序的数据，
     *
     * 目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
     */
    extraData?: swan.IData;
    success?(res?: {
      /**
       * 调用结果
       */
      errMsg: string;
    }): void;
  }

  interface INavigateBackMiniProgramOptions extends ICallback {
    /**
     * 需要返回给上一个小程序的数据，
     *
     * 上一个小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
     */
    extraData?: swan.IData;
    success?(res?: {
      /**
       * 调用结果
       */
      errMsg: string;
    }): void;
  }

  interface IComponent extends IPage {}

  interface ICreateAnimationOptions {
    /**
     * 动画持续时间，单位ms
     * @default 400
     */
    duration?: number;
    /**
     * 定义动画的效果
     * @default "linear"
     */
    timingFunction?: 'linear'
      | 'ease'
      | 'ease-in'
      | 'ease-out'
      | 'ease-in-out'
      | 'step-start'
      | 'step-end';
    /**
     * 动画延迟时间，单位 ms
     * @default 0
     */
    delay?: number;
    /**
     * 设置transform-origin
     * @default "50% 50% 0"
     */
    transformOrigin?: string;
  }

  /**
   * 通过swan.createAnimation创建的动画实例
   */
  interface IAnimationInstance {
    /**
     * 表示一组动画完成，
     *
     * 可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，
     *
     * 一组动画完成后才会进行下一组动画。
     */
    step(options?: ICreateAnimationOptions): void;

    /**
     * 导出动画数据传递给组件的animation属性
     */
    export(): any;
    // 样式方法
    /**
     * 透明度，参数范围 0~1
     * @param value 透明度
     */
    opacity(value: number): this;
    /**
     * 背景色
     * @param color 颜色值
     */
    backgrondColor(color: string): this;
    /**
     * 长度值，如果传入 Number 则默认使用 px，
     *
     * 可传入其他自定义单位的长度值
     */
    width(length: number | string): this;
    /**
     * 长度值，如果传入 Number 则默认使用 px，
     *
     * 可传入其他自定义单位的长度值
     */
    height(length: number | string): this;
    /**
     * 长度值，如果传入 Number 则默认使用 px，
     *
     * 可传入其他自定义单位的长度值
     */
    top(length: number | string): this;
    /**
     * 长度值，如果传入 Number 则默认使用 px，
     *
     * 可传入其他自定义单位的长度值
     */
    left(length: number | string): this;
    /**
     * 长度值，如果传入 Number 则默认使用 px，
     *
     * 可传入其他自定义单位的长度值
     */
    bottom(length: number | string): this;
    /**
     * 长度值，如果传入 Number 则默认使用 px，
     *
     * 可传入其他自定义单位的长度值
     */
    right(length: number | string): this;

    // 旋转

    /**
     * deg的范围-180~180，从原点顺时针旋转一个deg角度
     * @param deg 旋转角度
     */
    rotate(deg: number): this;
    /**
     * deg的范围-180~180，在X轴旋转一个deg角度
     * @param deg 在X轴的旋转角度
     */
    rotateX(deg: number): this;
    /**
     * deg的范围-180~180，在Y轴旋转一个deg角度
     * @param deg 在Y轴的旋转角度
     */
    rotateY(deg: number): this;
    /**
     * deg的范围-180~180，在Z轴旋转一个deg角度
     * @param deg 在Z轴的旋转角度
     */
    rotateZ(deg: number): this;
    /**
     * 同transform-function rotate3d
     *
     * See more detail:
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d
     * @param x X轴向量
     * @param y Y轴向量
     * @param z Z轴向量
     * @param deg 角度
     */
    rotate3d(x: number, y: number, z: number, deg: number | string): this;

    // 缩放

    /**
     * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
     * @param sx 一个参数时表示在X、Y轴同时缩放的倍数，两个参数时表示在X轴缩放的倍数
     * @param sy 在Y轴缩放的倍数
     */
    scale(sx: number, sy?: number): this;
    /**
     * 在X轴缩放sx倍数
     * @param sx 缩放倍数
     */
    scaleX(sx: number): this;
    /**
     * 在Y轴缩放sy倍数
     * @param sy 缩放倍数
     */
    scaleY(sy: number): this;
    /**
     * 在Z轴缩放sz倍数
     * @param sz 缩放倍数
     */
    scaleZ(sz: number): this;
    /**
     * 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数
     * @param sx X轴缩放倍数
     * @param sy Y轴缩放倍数
     * @param sz Z轴缩放倍数
     */
    scale3d(sx: number, sy: number, sz: number): this;
    // 偏移
    /**
     * 一个参数时，表示在X轴偏移tx，单位px；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
     * @param tx 在X轴的偏移量
     * @param ty 在Y轴的偏移量
     */
    translate(tx: number, ty?: number): this;
    /**
     * 在X轴的偏移量，单位px
     * @param tx 在X轴的偏移量，单位px
     */
    translateX(tx: number): this;
    /**
     * 在Y轴的偏移量，单位px
     * @param ty 在Y轴的偏移量，单位px
     */
    translateY(ty: number): this;
    /**
     * 在Z轴的偏移量，单位px
     * @param tz 在Z轴的偏移量，单位px
     */
    translateZ(tz: number): this;
    /**
     * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
     * @param tx X轴偏移量
     * @param ty Y轴偏移量
     * @param tz Z轴偏移量
     */
    translate3d(tx: number, ty: number, tz: number): this;

    // 倾斜
    /**
     * 参数范围-180~180；一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
     * @param ax X轴倾斜度
     * @param ay Y轴倾斜度
     */
    skew(ax: number, ay?: number): this;
    /**
     * 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度
     * @param ax X轴倾斜度
     */
    skewX(ax: number): this;
    /**
     * 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度
     * @param ay Y轴倾斜度
     */
    skewY(ay: number): this;

    // 矩阵变形

    /**
     * 同 transform-function matrix
     *
     * See more detail:
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
     * @param scaleX X轴缩放
     * @param skewY Y轴倾斜
     * @param skewX X轴倾斜
     * @param scaleY Y轴缩放
     * @param tx X轴偏移
     * @param ty Y轴偏移
     */
    matrix(scaleX: number, skewY: number, skewX: number, scaleY: number, tx: number, ty: number): this;
    /**
     * 同 transform-function matrix3d
     *
     * See more detail:
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
     */
    matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): this;
  }

  /**
   * 任意索引对象
   */
  export interface IData {
    [key: string]: any;
  }

  interface IEventTarget {
    /**
     * 事件源组件的id
     */
    id: string;
    /**
     * 当前组件的类型
     */
    tagName: string;
    /**
     * 事件源组件上由data-开头的自定义属性组成的集合
     */
    dataset: IData;
  }

  interface IEventTouch {
    // clientX: number; // 百度小程序 无该属性
    // clientY: number; // 百度小程序 无该属性
    // identifier: number; // 百度小程序 无该属性
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
  }

  interface IEventCanvasTouch {
    identifier: number;
    x: number;
    y: number;
  }

  /**
   * base事件参数
   */
  export interface IBaseEvent {
    /**
     * 事件类型
     */
    type?: string;
    timeStamp?: number;
    /**
     * 触发事件的源组件。
     */
    target: IEventTarget;
    /**
     * 事件绑定的当前组件。
     */
    currentTarget: IEventTarget;
  }

  export interface ICustomEvent<P extends IData = IData> extends IBaseEvent {
    /**
     * 额外的信息
     */
    detail: P;
  }

  /**
   * switch 组件 change 事件参数
   * 官方文档的坑: 抄微信的文档 说e.detail = { value: checked }
   * 实际打印出来是 e = { checked: checked }
   */
  export interface ISwitchEvent {
    checked: boolean;
  }

  /**
   * 触摸事件返回
   * 并没有detail属性
   */
  export interface ITouchEvent<
    T extends IEventTouch = IEventTouch
  > extends IBaseEvent {
    // touches: T[]; // 百度小程序touch对象暂无该属性
    changedTouches: T[];
  }

  /**
   * canvas触摸事件返回
   */
  export interface ICanvasTouchEvent<
    T extends IEventCanvasTouch = IEventCanvasTouch
  > extends IBaseEvent {
    // touches: T[];
    changedTouches: T[];
  }

  // ======== 网络 ======== //

  /**
   * 发起网络请求
   */
  export function request(options: IRequestOptions): boolean;


  // ======== 上传下载 ======== //

  /**
   * 将本地资源上传到开发者服务器
   *
   * 客户端发起⼀个 HTTPS POST 请求
   *
   * 其中 `content-type` 为 `multipart/form-data`
   */
  export function uploadFile(options: IUploadFileOptions): IUploadTask;

  /**
   * 下载⽂件资源到本地，
   *
   * 客户端直接发起⼀个 HTTP GET 请求， 返回⽂件的本地临时路径。
   */
  export function downloadFile(options: IDownloadFileOptions): IDownloadTask;


  // ======== socket通信 ======== //

  /**
   * 创建⼀个 WebSocket 连接。
   *
   * ⼀个⼿百⼩程序同时只能有⼀个 WebSocket 连接，
   *
   * 如果当前已存在⼀个 WebSocket 连接， 会替换成最新创建的WebSocket连接。
   */
  export function connectSocket(options: IConnectSocketOptions): ISocketTask;

  /**
   * 监听WebSocket连接打开事件
   * @param callback
   */
  export function onSocketOpen(callback: () => void): void;

  /**
   * 监听WebSocket错误
   * @param callback
   */
  export function onSocketError(callback: (error?: any) => void): void;

  /**
   * 通过WebSocket连接发送数据
   *
   * 需要先 `connectSocket`
   *
   * 并在 `onSocketOpen` 回调之后才能发送
   * @param options
   */
  export function sendSocketMessage(options: ISendSocketMessageOptions): void;

  /**
   * 监听WebSocket接受到服务器的消息事件
   * @param callback
   */
  export function onSocketMessage(callback: (res?: any) => void): void;

  /**
   * 关闭WebSocket连接
   * @param options
   */
  export function closeSocket(options: ICloseSocketOptions): void;

  /**
   * 监听WebSocket关闭
   * @param callback
   */
  export function onSocketClose(callback: () => void): void;

  // ======== 媒体 ======== //

  // ======== 图片 ======== //

  /**
   * 从本地相册选择图片或使用相机拍照
   * @param options
   */
  export function chooseImage(options: IChooseImageOptions): void;

  /**
   * 预览图片
   * @param options
   */
  export function previewImage(options: IPreviewImageOptions): void;

  /**
   * 获取图片信息
   * @param options
   */
  export function getImageInfo(options: IGetImageInfoOptions): void;

  /**
   * 保存图片到系统相册。需要用户授权
   * @param options
   */
  export function saveImageToPhotosAlbum(options: ISaveImageToPhotosAlbumOptions): void;

  // ======== 视频组件控制 ======== //

  /**
   * 创建并返回 video 上下文 videoContext 对象。
   *
   * 在自定义组件下，第二个参数传入组件实例this，以操作组件 `<video/>` 组件
   */
  export function createVideoContext(videoId: string, _this?: IComponent): IVideoContext;

  // ======== 直播组件控制 ======== //

  /**
   * 操作对应的 `<live-player/>` 组件。
   *
   * 创建并返回 live-player 上下文 LivePlayerContext 对象。
   * @param domId
   */
  export function createLivePlayerContext(domId: string): ILivePlayerContext;


  // ======== 文件 ======== //

  /**
   * 保存文件到本地。
   *
   * @attention 注意：saveFile 会把临时文件移动，
   * 因此调用成功后传入的 `tempFilePath` 将不可用
   */
  export function saveFile(options: ISaveFileOptions): void;

  /**
   * 获取本地已保存的文件列表
   */
  export function getSavedFileList(options: IGetSavedFileListOptions): void;

  /**
   * 获取本地文件的文件信息。
   *
   * @tip 此接口只能用于获取已保存到本地的文件，
   * 若需要获取临时文件信息，请使用 `getFileInfo` 接口
   * @param options
   */
  export function getSavedFileInfo(options: IGetOrRemoveSavedFileInfoOptions): void;

  /**
   * 删除本地存储的文件
   * @param options
   */
  export function removeSavedFile(options: IGetOrRemoveSavedFileInfoOptions): void;

  /**
   * 新开页面打开文档，
   * @description 支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
   * @param options
   */
  export function openDocument(options: IOpenDocumentOptions): void;


  // ======== 数据缓存 ======== //

  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
   * @param options
   */
  export function setStorage(options: ISetStorageOptions): void;

  /**
   * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
   * @param key 本地缓存中的指定的 key
   * @param data 需要存储的内容
   */
  export function setStorageSync(key: string, data: any): void;

  /**
   * 从本地缓存中异步获取指定 key 对应的内容。
   * @param options
   */
  export function getStorage(options: IGetStorageOptions): void;

  /**
   * 从本地缓存中同步获取指定 key 对应的内容。
   * @param key 本地缓存中的指定的 key
   */
  export function getStorageSync(key: string): any;

  /**
   * 异步获取当前storage的相关信息
   * @param options
   */
  export function getStorageInfo(options: IGetStorageInfoOptions): void;

  /**
   * 同步获取当前storage的相关信息。
   */
  export function getStorageInfoSync(): IGetStorageInfoSuccessData;

  /**
   * 从本地缓存中异步移除指定 key
   * @param options
   */
  export function removeStorage(options: IRemoveStorageOptions): void;

  /**
   * 从本地缓存中同步移除指定 key 。
   * @param key 本地缓存中的指定的 key
   */
  export function removeStorageSync(key: string): void;

  /**
   * 异步清理本地数据缓存。
   */
  export function clearStorage(): void;

  /**
   * 同步清理本地数据缓存。
   */
  export function clearStorageSync(): void;


  // ======== 位置 ======== //

  // ======== 获取位置 ======== //

  /**
   * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用。
   * @param options
   */
  export function getLocation(options: IGetLocationOptions): void;

  /**
   * 打开地图选择位置。
   * @param options
   */
  export function chooseLocation(options: IChooseLocationOptions): void;

  // ======== 查看位置 ======== //

  /**
   * 使用手百内置地图查看位置。
   * @param options
   */
  export function openLocation(options: IOpenLocationOptions): void;

  // ======== 绘图 ======== //

  export function createCanvasContext(canvasId: string): ICanvasContext;


  // ======== 设备 ======== //

  // ======== 系统信息 ======== //

  /**
   * 获取系统信息
   * @param options 接口调用后的回调
   */
  export function getSystemInfo(options: IGetSystemInfoOptions): boolean;

  /**
   * 获取系统信息同步接口
   */
  export function getSystemInfoSync(): ISystemInfo;

  /**
   * 判断小程序的API,回调,参数,组件等是否在当前版本可用，
   * 使用如下方式调用
   * - ${API}.${method}.${param}.${options}
   * - ${component}.${attribute}.${option}
   * 其中
   * - ${API} 代表API名字
   * - ${method} 代表调用方式，有效值为
   *   + return
   *   + success
   *   + object
   *   + callback
   * - ${param} 代表参数或者返回值
   * - ${options} 代表参数的可选值
   * - ${component} 代表组件名字
   * - ${attribute} 代表组件属性
   * - ${option} 代表属性的可选值
   * @param sth API,回调,参数,组件等
   */
  export function canIUse(sth: string): boolean;

  // ======== 网络状态 ======== //

  /**
   * 获取网络类型
   * @param options 接口调用后的回调
   */
  export function getNetworkType(options: IGetNetworkTypeOptions): boolean;
  /**
   * 监听网络状态变化
   */
  export function onNetworkStatusChange(cb: (opt: INetworkTypeData) => void): boolean;

  // ======== 拨打电话 ======== //

  /**
   * 拨打电话
   * @param options 需要拨打的电话及接口调用后的回调
   */
  export function makePhoneCall(options: IMakePhoneCallOptions): boolean;

  // ======== 剪贴板 ======== //

  /**
   * 设置系统剪贴板的内容
   * @param options
   */
  export function setClipboardData(options: ISetClipboardDataOptions): void;

  /**
   * 获取系统剪贴板内容
   * @param options
   */
  export function getClipboardData(options: IGetClipboardDataOptions): void;

  // ======== 震动 ======== //

  /**
   * 使手机发生较短时间的振动（15ms）
   * @param options
   */
  export function vibrateShort(options: ICallback): void;


  // ======== 界面 ======== //

  // ======== 交互反馈 ======== //

  /**
   * 显示消息提示框
   * @param options
   */
  export function showToast(options: IShowToastOptions): void;

  /**
   * 显示 loading 提示框, 需主动调用 `hideLoading` 才能关闭提示框
   * @param options
   */
  export function showLoading(options: IShowLoadingOptions): void;

  /**
   * 隐藏消息提示框
   */
  export function hideToast(): void;

  /**
   * 隐藏 loading 提示框
   */
  export function hideLoading(): void;

  /**
   * 显示模态弹窗
   * @param options
   */
  export function showModal(options: IShowModalOptions): void;

  /**
   * ​显示操作菜单 ​
   * @param options
   */
  export function showActionSheet(options: IShowActionSheetOptions): void;


  // ======== 设置导航条 ======== //

  /**
   * 动态设置当前页面的标题
   * @param options
   */
  export function setNavigationBarTitle(options: ISetNavigationBarTitleOptions): void;

  /**
   * 在当前页面显示导航条加载动画
   */
  export function showNavigationBarLoading(): void;

  /**
   * 隐藏导航条加载动画。
   */
  export function hideNavigationBarLoading(): void;

  /**
   * 设置导航条颜色
   * @param options
   */
  export function setNavigationBarColor(options: ISetNavigationBarColorOptions): void;

  // ======== 动画 ======== //
  /**
   * 创建一个动画实例，
   *
   * 通过动画实例的export方法导出动画数据传递给组件的 `animation` 属性
   * @param options
   */
  export function createAnimation(options: ICreateAnimationOptions): IAnimationInstance;


  // ======== 设置tabBar ======== //

  /**
   * 为 tabBar 某一项的右上角添加文本
   * @param options
   */
  export function setTabBarBadge(options: ISetTabBarBadgeOptions): void;

  /**
   * 移除 tabBar 某一项右上角的文本
   * @param options
   */
  export function removeTabBarBadge(options: ITabBarOptions): void;

  /**
   * 显示 tabBar 某一项的右上角的红点
   * @param Object
   */
  export function showTabBarRedDot(options: ITabBarOptions): void;

  /**
   * 隐藏 tabBar 某一项的右上角的红点
   * @param options
   */
  export function hideTabBarRedDot(options: ITabBarOptions): void;

  /**
   * 动态设置 tabBar 的整体样式
   * @param options
   */
  export function setTabBarStyle(options: ISetTabBarStyleOptions): void;

  /**
   * 动态设置 tabBar 某一项的内容
   * @param options
   */
  export function setTabBarItem(options: ISetTabBarItemOptions): void;

  /**
   * 显示 tabBar
   * @param options
   */
  export function showTabBar(options: ICallback): void;

  /**
   * 隐藏 tabBar
   * @param options
   */
  export function hideTabBar(options: ICallback): void;


  // ======== 导航 ======== //

  /**
   * 保留当前页面，跳转到应用内的某个页面，使用swan.navigateBack可以返回到原页面。
   * @param options
   */
  export function navigateTo(options: INavigateOptions): void;

  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   * @param options
   */
  export function redirectTo(options: INavigateOptions): void;

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param options
   */
  export function switchTab(options: INavigateOptions): void;

  /**
   * 关闭当前页面，返回上一页面或多级页面。
   * @param options
   */
  export function navigateBack(options: {
    /**
     * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
     * @default 1
     */
    delta?: number;
  }): void;

  /**
   * 关闭所有页面，打开到应用内的某个页面。
   * @param options
   */
  export function reLaunch(options: INavigateOptions): void;

  // ======== xml节点信息 ======== //

  /**
   * 创建查询对象
   */
  export function createSelectorQuery(): ISelectorQuery;

  // ======== 开发接口 ======== //

  // ======== 登录 ======== //

  /**
   * 调用接口获取 `临时登录凭证(code)` 进而换取用户登录态信息，
   *
   * 包括用户的 `唯一标识(openid)` 及本次登录的 `会话密钥(session_key)` 等。
   *
   * 用户数据的加解密通讯需要依赖会话密钥完成。
   *
   * @attention 调用 login 会引起登录态的刷新，之前的 sessionKey 可能会失效。
   * @param options
   */
  export function login(options: ILoginOptions): void;

  /**
   * 检测当前用户登录态是否有效
   * @param options
   */
  export function checkSession(options: ICallback): void;

  /**
   * 提前向用户发起授权请求。
   *
   * 调用后会立刻弹窗询问用户是否同意授权使用某项功能或获取用户的某些数据，但不会实际调用对应接口。
   *
   * 如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
   * @param options
   */
  export function authorize(options: IAuthorizeOptions): void;

  // ======== 用户信息 ======== //

  /**
   * 获取用户信息。
   */
  export function getUserInfo(options: IGetUserInfoOptions): void;

  export function getPhoneNumber(options: IGetPhoneNumberOptions): void;

  // ======== 设置 ======== //

  /**
   * 调起客户端小程序设置界面，返回用户设置的操作结果。
   * @param options
   */
  export function openSetting(options: IOpenSettingOptions): void;

  /**
   * 获取用户的当前设置
   * @param options
   */
  export function getSetting(options: IOpenSettingOptions): void;

  // ======== 分享 ======== //

  export function openShare(options: IOpenShareOptions): void;

  // ======== 支付 ======== //

  // ======== 百度钱包支付 ======== //

  /**
   * 发起百度钱包支付
   * @param options
   */
  export function requestPayment(options: IPaymentOptions): void;

  // ======== 支付宝支付 ======== //

  /**
   * 发起支付宝支付
   * @param options
   */
  export function requestAliPayment(options: IPaymentOptions): void;

  // ======== 聚合收银台支付 ======== //

  /**
   * 发起聚合收银台支付。
   * @param options
   */
  export function requestPolymerPayment(options: IPolymerPaymentOptions): void;


  // ======== 打开小程序 ======== //

  /**
   * 打开同一百度帐号下关联的另一个小程序。
   * @param options
   */
  export function navigateToMiniProgram(options: INavigateToMiniProgramOptions): void;

  /**
   * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
   * @param options
   */
  export function navigateBackMiniProgram(options: INavigateBackMiniProgramOptions): void;

}

interface swan {
  [key: string]: any;
}
