/// <reference path="./index.d.ts" />

// 媒体

declare namespace swan {
  // ======== 图片 ======== //
  /**
   * 从本地相册选择图片或使用相机拍照。
   */
  export function chooseImage(options: chooseImage.Options): void;
  namespace chooseImage {
    type Options = {
      /**
       * 最多可以选择的图片张数，默认 9。
       */
      count?: number;
      /**
       * original 原图，compressed 压缩图，默认二者都有。
       */
      sizeType?: ('original' | 'compressed')[];
      /**
       * album 从相册选图，camera 使用相机，默认二者都有。
       */
      sourceType?: ('album' | 'camera')[];
    } & NeedSuccessCallback<SuccessOptions>;
    type SuccessOptions = {
      /**
       * 图片的本地文件路径列表 。
       */
      tempFilePaths: string[];
      /**
       * 图片的本地文件列表，每一项是一个 File 对象。
       */
      tempFiles: TempFile[];
    }
    interface TempFile {
      /**
       * 本地文件路径
       */
      path: string;
      /**
       * 本地文件大小（单位：B）
       */
      size: number;
    }
  }

  /**
   * 预览图片。
   * @description 不支持预览本地文件。
   */
  export function previewImage(options: previewImage.Options): void;
  namespace previewImage {
    type Options = {
      /**
       * 当前显示图片的链接，
       * 不填则默认为 urls 的第一张。
       * @description 开发者工具 `1.8.0` current 参数为当前显示图片的索引值。
       */
      current?: string;
      urls: string[];
    } & ApiCallback;
  }

  /**
   * 获取图片信息
   */
  export function getImageInfo(options: getImageInfo.Options): void;
  namespace getImageInfo {
    type Options = {
      /**
       * 图片的路径，
       * 可以是相对路径、临时文件路径或存储文件路径,
       * 不支持网络图片。
       */
      src: string;
    } & ApiCallback<SuccessOptions>;
    type SuccessOptions = {
      /**
       * 图片宽度（单位：px）
       */
      width: number;
      /**
       * 图片高度（单位：px）
       */
      height: number;
      /**
       * 返回图片的本地路径
       */
      path: string;
      /**
       * 返回图片的方向：
       * - up:默认不变；
       * - down：180度旋转；
       * - left：逆时针90度旋转；
       * - right：顺时针90度旋转；
       * - up-mirrored：镜像翻转；
       * - down-mirrored：镜像180旋转；
       * - left-mirrored：逆时针90度镜像旋转；
       * - right-mirrored：顺时针90度镜像旋转。
       */
      orientation: string;
      /**
       * 返回图片的格式
       */
      type: string;
    }
  }

  /**
   * 保存图片到系统相册，需要用户授权。
   */
  export function saveImageToPhotosAlbum(options: saveImageToPhotosAlbum.Options): void;
  namespace saveImageToPhotosAlbum {
    type Options = {
      /**
       * 图片文件路径，
       * 可以是临时文件路径也可以是永久文件路径，
       * 不支持网络图片路径。
       */
      filePath: string;
    } & ApiCallback;
  }

  // ======== 录音管理 ======== //
  /**
   * 获取全局唯一的录音管理器recorderManager。
   */
  export function getRecorderManager(): getRecorderManager.RecorderManager;
  namespace getRecorderManager {
    interface RecorderManager {
      /**
       * 开始录音
       */
      start(options: getRecorderManager.StartOptions): void;
      /**
       * 暂停录音
       */
      pause(): void;
      /**
       * 继续录音
       */
      resume(): void;
      /**
       * 停止录音
       */
      stop(): void;
      /**
       * 录音开始事件
       */
      onStart(callback: cb): void;
      /**
       * 录音暂停事件
       */
      onPause(callback: cb): void;
      /**
       * 录音停止事件，会回调文件地址。
       */
      onStop(callback: cb<{
        /**
         * 录音文件的临时路径
         */
        tempFilePath: string;
      }>): void;
      /**
       * 录音错误事件, 会回调错误信息 。
       */
      onError(callback: cb<{
        /**
         * 错误信息
         */
        errMsg: string;
      }>): void;
    }
    type StartOptions = {
      /**
       * 指定录音的时长，（单位：ms） ，
       * 如果传入了合法的 duration ，
       * 在到达指定的 duration 后会自动停止录音，
       * 最大值 600000（10 分钟）,
       * 默认值 60000（1 分钟）。
       * @default 60000
       */
      duration?: number;
      /**
       * 采样率，有效值 8000/16000/44100 。
       *
       * 采样率和码率有一定要求，具体有效值如下：
       *
       * | 采样率 | 编码码率 |
       * |--------|---------|
       * |  8000  |16000 ~ 48000|
       * |  16000 |24000 ~ 96000|
       * |  44100 |64000 ~ 320000|
       */
      sampleRate?: 8000 | 16000 | 44100;
      /**
       * 录音通道数，有效值 1/2。
       */
      numberOfChannels?: 1 | 2;
      /**
       * 编码码率
       *
       * 采样率和码率有一定要求，具体有效值如下：
       *
       * | 采样率 | 编码码率 |
       * |--------|---------|
       * |  8000  |16000 ~ 48000|
       * |  16000 |24000 ~ 96000|
       * |  44100 |64000 ~ 320000|
       */
      encodeBitRate?: number;
      /**
       * 音频格式，有效值 aac/pcm。
       */
      format?: 'aac' | 'pcm';
    }
  }

  // ======== 背景音频管理播放 ======== //
  /**
   * 获取全局唯一的背景音频管理器 backgroundAudioManager。
   */
  export function getBackgroundAudioManager(): getBackgroundAudioManager.BackgroundAudioManager;
  namespace getBackgroundAudioManager {
    interface BackgroundAudioManager extends AudioCommonProperties {
      /**
       * 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
       */
      title: string;
      /**
       * 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
       */
      epname: string;
      /**
       * 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
       */
      singer: string;
      /**
       * 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
       */
      coverImgUrl: string;
    }
    interface BackgroundAudioManager extends AudioCommonMethods {}
  }

  // ======== 音频组件控制 ======== //
  /**
   * 创建并返回内部 audio 上下文 innerAudioContext 对象。
   */
  export function createInnerAudioContext(): createInnerAudioContext.InnerAudioContext;
  namespace createInnerAudioContext {
    interface InnerAudioContext extends AudioCommonProperties {
      /**
       * 是否自动开始播放，默认 false 。
       */
      autoplay: boolean;
      /**
       * 是否循环播放，默认 false。
       */
      loop: boolean;
      /**
       * 是否遵循系统静音开关，默认 true，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
       */
      obeyMuteSwitch: boolean;
      /**
       * 音量，范围 0~1。
       */
      volume: number;
    }
    interface InnerAudioContext extends AudioCommonMethods {
      // methods
      /**
       * 销毁当前实例
       */
      destroy(): void;
      /**
       * 音频进行 seek 操作事件
       */
      onSeeking(callback: cb): void;
      /**
       * 音频完成 seek 操作事件
       */
      onSeeked(callback: cb): void;
      /**
       * 取消监听 onCanplay 事件
       */
      offCanplay(callback: cb): void;
      /**
       * 取消监听 onPlay 事件
       */
      offPlay(callback: cb): void;
      /**
       * 取消监听 onPause 事件
       */
      offPause(callback: cb): void;
      /**
       * 取消监听 onStop 事件
       */
      offStop(callback: cb): void;
      /**
       * 取消监听 onEnded 事件
       */
      offEnded(callback: cb): void;
      /**
       * 取消监听 onTimeUpdate 事件
       */
      offTimeUpdate(callback: cb): void;
      /**
       * 取消监听 onError 事件
       */
      offError(callback: cb): void;
      /**
       * 取消监听 onWaiting 事件
       */
      offWaiting(callback: cb): void;
      /**
       * 取消监听 onSeeking 事件
       */
      offSeeking(callback: cb): void;
      /**
       * 取消监听 onSeeked 事件
       */
      offSeeked(callback: cb): void;
    }
  }

  // ======== 视频 ======== //
  /**
   * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
   *
   * @description 文件的临时路径，在智能小程序本次启动期间可以正常使用，
   * 如需持久保存，需在主动调用 swan.saveFile，在智能小程序下次启动时才能访问得到。
   */
  export function chooseVideo(): void;
  namespace chooseVideo {
    type Options = {
      /**
       * album 从相册选图，camera 使用相机，默认二者都有。
       */
      sourceType?: ('album' | 'camera')[];
      /**
       * 是否压缩所选的视频源文件，默认值为true，需要压缩。
       */
      compressed?: boolean;
      /**
       * 拍摄视频最长拍摄时间，（单位：s）。最长支持 60 秒。
       */
      maxDuration?: number;
    } & NeedSuccessCallback<SuccessOptions>;
    interface SuccessOptions {
      /**
       * 选定视频的临时文件路径
       */
      tempFilePath: string;
      /**
       * 选定视频的时间长度 (单位：s)
       */
      duration: number;
      /**
       * 选定视频的数据量大小（单位：B）
       */
      size: number;
      /**
       * 返回选定视频的长
       */
      height: number;
      /**
       * 返回选定视频的宽
       */
      width: number;
    }
  }
  /**
   * 保存视频到系统相册。需要用户授权。
   */
  export function saveVideoToPhotosAlbum(options: saveVideoToPhotosAlbum.Options): void;
  namespace saveVideoToPhotosAlbum {
    type Options = {
      /**
       * 视频文件路径，可以是临时文件路径也可以是永久文件路径。
       */
      filePath: string;
    } & ApiCallback;
  }

  // ======== 视频组件控制 ======== //
  /**
   * 创建并返回 video 上下文 videoContext 对象。通过 videoId 跟一个 video 组件绑定，通过它可以操作一个 video 组件。
   */
  export function createVideoContext(videoId: string): createVideoContext.VideoContext;
  namespace createVideoContext {
    interface VideoContext {
      /**
       * 播放
       */
      play(): void;
      /**
       * 暂停
       */
      pause(): void;
      /**
       * 跳转到指定位置（单位：s）
       */
      seek(position: number): void;
      /**
       * 发送弹幕，danmu 包含两个属性 text、color。
       */
      sendDanmu(danmu: Danmu): void;
      /**
       * 进入全屏
       */
      requestFullScreen(): void;
      /**
       * 退出全屏
       */
      exitFullScreen(): void;
      /**
       * 显示状态栏，仅在iOS全屏下有效。
       */
      showStatusBar(): void;
      /**
       * 隐藏状态栏，仅在iOS全屏下有效。
       */
      hideStatusBar(): void;
    }
    interface Danmu {
      text: string;
      color: string;
    }
  }

  // ======== 直播组件控制 ======== //
  /**
   * 操作对应的 `<live-player/>` 组件。 创建并返回 live-player 上下文 LivePlayerContext 对象。
   */
  export function createLivePlayerContext(domId: string): createLivePlayerContext.LivePlayerContext;
  namespace createLivePlayerContext {
    interface LivePlayerContext {
      /**
       * 播放
       */
      play(options: ApiCallback): void;
      /**
       * 停止
       */
      stop(options: ApiCallback): void;
      /**
       * 静音
       */
      mute(options: ApiCallback): void;
      /**
       * 暂停
       */
      pause(options: ApiCallback): void;
      /**
       * 恢复
       */
      resume(options: ApiCallback): void;
      /**
       * 进入全屏
       */
      requestFullScreen(options: ApiCallback & {
        /**
         * 有效值为
         * - 0（正常竖向）
         * - 90（屏幕逆时针90度）
         * - -90（屏幕顺时针90度）
         */
        direction: number;
      }): void;
      /**
       * 退出全屏
       */
      exitFullScreen(options: ApiCallback): void;
    }
  }

  // ======== 相机组件控制 ======== //
  /**
   * 创建并返回 camera 上下文 cameraContext对象，
   * cameraContext 与页面的 camera 组件绑定，
   * 一个页面只能有一个 camera，通过它可以操作对应的组件。
   */
  export function createCameraContext(): createCameraContext.CameraContext;
  namespace createCameraContext {
    interface CameraContext {
      /**
       * 拍照，可指定质量，成功则返回图片。
       */
      takePhoto(options: TakePhotoOptions): void;
      /**
       * 开始录像
       */
      startRecord(options: ApiCallback): void;
      /**
       * 结束录像，成功则返回封面与视频。
       */
      stopRecord(options: ApiCallback<StopRecordSuccessOptions>): void;
    }
    type TakePhotoOptions = {
      quality?: string;
    } & ApiCallback;

    type StopRecordSuccessOptions = {
      tempThumbPath: string;
      tempVideoPath: string;
    }
  }
}

interface AudioCommonProperties {
  // readonly properties
  /**
   * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回 。
   */
  readonly duration: number;
  /**
   * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位 。
   */
  readonly currentTime: number;
  /**
   * 当前状态:true 表示暂停或停止，false 表示正在播放。
   */
  readonly paused: boolean;
  /**
   * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
   */
  readonly buffered: number;
  // properties
  /**
   * 音频的数据链接，用于直接播放。
   */
  src: string;
  /**
   * 开始播放的位置（单位：s），默认 0 。
   */
  startTime: number;
}

interface AudioCommonMethods {
  /**
   * 播放
   */
  play(): void;
  /**
   * 暂停
   */
  pause(): void;
  /**
   * 停止
   */
  stop(): void;
  /**
   * 跳转到指定位置（单位：s）
   */
  seek(position: number): void;
  /**
   * 音频进入可以播放状态，但不保证后面可以流畅播放 。
   */
  onCanplay(callback: cb): void;
  /**
   * 音频播放事件
   */
  onPlay(callback: cb): void;
  /**
   * 音频暂停事件
   */
  onPause(callback: cb): void;
  /**
   * 音频停止事件
   */
  onStop(callback: cb): void;
  /**
   * 音频自然播放结束事件
   */
  onEnded(callback: cb): void;
  /**
   * 音频进度更新事件
   */
  onTimeUpdate(callback: cb): void;
  /**
   * 音频播放错误事件
   */
  onError(callback: cb): void;
  /**
   * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发 。
   */
  onWaiting(callback: cb): void;
}
