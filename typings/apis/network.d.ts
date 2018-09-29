/// <reference path="./index.d.ts" />

// 网络

declare namespace swan {
  // ======== 请求 ======== //

  namespace request {
    type BaseOption = ApiCallback<SuccessParams> & {
      /**
       * 开发者服务器接口地址
       */
      url: string;
      /**
       * 请求的参数
       */
      data?: obj | string;
      /**
       * 设置请求的 header，header 中不能设置 Referer
       */
      header?: obj;
      /**
       * 请求方法，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE
       */
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD';
      /**
       * 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @default 'json'
       */
      dataType?: string;
    };
    type SuccessParams = {
      /**
       * 开发者服务器返回的数据
       */
      data: obj | string;
      /**
       * 开发者服务器返回的 HTTP 状态码
       */
      statusCode: number;
      /**
       * 开发者服务器返回的 HTTP Response Header
       */
      header: obj;
    };
  }
  /**
   * 发起网络请求
   */
  export function request(options: request.BaseOption): void;

  // ======== 上传下载 ======== //
  namespace uploadFile {
    /**
     * 上传文件的参数设置
     */
    type BaseOptions = ApiCallback<SuccessParams> & {
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
      header?: obj;
      /**
       * HTTP 请求中其他额外的 form data
       */
      formData?: obj;
    };

    /**
     * 上传文件成功的返回参数
     */
    type SuccessParams = {
      /**
       * 开发者服务器返回的数据
       */
      data: string;
      /**
       * 开发者服务器返回的 HTTP 状态码
       */
      statusCode: number;
    };
  }
  /**
   * 上传任务
   */
  interface UploadTask {
    /**
     * 监听上传进度变化
     */
    onProgressUpdate: (
      cb: (
        res: {
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
      ) => void
    ) => void;
    /**
     * 中断上传任务
     */
    abort: () => void;
  }

  /**
   * 将本地资源上传到开发者服务器
   *
   * 客户端发起⼀个 HTTPS POST 请求
   *
   * 其中 `content-type` 为 `multipart/form-data`
   *
   * @return {UploadTask} 返回一个uploadTask对象，通过uploadTask，可监听上传进度变化事件，以及取消上传任务。
   */
  export function uploadFile(options: uploadFile.BaseOptions): UploadTask;

  namespace downloadFile {
    /**
     * 下载文件的参数
     */
    type BaseOptions = ApiCallback<SuccessParams> & {
      /**
       * 下载资源的 url
       */
      url: string;
      /**
       * HTTP 请求 Header， header 中不能设置 Referer
       */
      header?: obj;
    };

    /**
     * 下载文件成功的回调参数
     */
    type SuccessParams = {
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
    };
  }
  /**
   * 下载任务
   */
  interface DownloadTask {
    onProgressUpdate: (
      cb: (
        res: {
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
      ) => void
    ) => void;
    /**
     * 中断下载任务
     */
    abort: () => void;
  }

  /**
   * 下载⽂件资源到本地，
   *
   * 客户端直接发起⼀个 HTTP GET 请求， 返回⽂件的本地临时路径。
   *
   * @return {DownloadTask} 返回一个 downloadTask 对象，通过 downloadTask ，可监听下载进度变化事件，以及取消下载任务。
   */
  export function downloadFile(options: downloadFile.BaseOptions): DownloadTask;

  // ======== WebSocket ======== //
  namespace connectSocket {
    type BaseOptions = ApiCallback & {
      /**
       * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
       */
      url: string;
      /**
       * 子协议数组
       */
      protocolsArray?: string[];
    };
    type SendSocketMessageParams = {
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
    };
    type CloseSocketParams = ApiCallback & {
      /**
       * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
       */
      code?: number;
      /**
       * 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的 UTF-8 文本（不是字符）
       */
      reason?: string;
    };
  }

  /**
   * WebSocket 任务，可通过 swan.connectSocket() 接口创建返回。
   */
  interface SocketTask {
    /**
     * 对应swan.sendSocketMessage
     */
    send(params: connectSocket.SendSocketMessageParams): void;
    /**
     * 对应swan.closeSocket
     */
    close(params: connectSocket.CloseSocketParams): void;
    /**
     * 对应swan.onSocketOpen
     */
    onOpen(callback: () => void): void;
    /**
     * 对应swan.onSocketClose
     */
    onClose(callback: cb): void;
    /**
     * 对应swan.onSocketError
     */
    onError(callback: cb): void;
    /**
     * 对应swan.onSocketMessage
     */
    onMessage(callback: cb): void;
  }

  /**
   * 创建一个 WebSocket 连接。
   *
   * 一个智能小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会替换成最新创建的WebSocket连接。
   */
  export function connectSocket(options: connectSocket.BaseOptions): SocketTask;
  /**
   * 监听 WebSocket 连接打开事件。
   */
  export function onSocketOpen(cb: cb): void;
  /**
   * 监听 WebSocket 错误
   */
  export function onSocketError(cb: cb): void;
  /**
   * 通过 WebSocket 连接发送数据，需要先 connectSocket，并在 onSocketOpen 回调之后才能发送。
   */
  export function sendSocketMessage(
    params: connectSocket.SendSocketMessageParams
  ): void;
  /**
   * 监听 WebSocket 接受到服务器的消息事件
   */
  export function onSocketMessage(cb: cb): void;
  /**
   * 监听 WebSocket 关闭。
   */
  export function closeSocket(params: connectSocket.CloseSocketParams): void;
}
