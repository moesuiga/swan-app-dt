declare namespace Page {
  type obj = {
    [key: string]: any;
  };
  interface BaseOptions {
    /**
     * 监听页面加载的生命周期函数
     *
     * 一个页面只会调用一次，
     * 可以在 onLoad 中获取打开当前页面所调用的 query 参数
     */
    onLoad?(options: obj): void;
    /**
     * 监听页面初次渲染完成的生命周期函数
     *
     * 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
     *
     * 对界面的设置如：`swan.setNavigationBarTitle` 请在onReady之后设置。
     */
    onReady?(): void;
    /**
     * 监听页面显示的生命周期函数
     *
     * 每次打开页面都会调用一次。
     */
    onShow?(): void;
    /**
     * 监听页面隐藏的生命周期函数
     *
     * 当 navigateTo
     * 或底部 tab 切换时
     * 或Home键离开智能小程序时调用。
     */
    onHide?(): void;
    /**
     * 监听页面卸载的生命周期函数
     *
     * 当 `redirectTo` 或 `navigateBack` 的时候调用。
     */
    onUnload?(): void;
    /**
     * 监听用户下拉动作
     *
     * 需要在 app.json 的 window 选项中或页面配置中开启 `enablePullDownRefresh` 。
     *
     * 当处理完数据刷新后，`swan.stopPullDownRefresh` 可以停止当前页面的下拉刷新。
     */
    onPullDownRefresh?(): any;
    /**
     * 页面上拉触底事件的处理函数
     *
     * 可以在 app.json 的 window 选项中或页面配置中设置触发距离 `onReachBottomDistance` 。
     *
     * 在触发距离内滑动期间，本事件只会被触发一次。
     */
    onReachBottom?(): any;
    /**
     * 监听用户滚动页面事件
     */
    onPageScroll?(event: {
      /**
       * 页面在垂直方向已滚动的距离（单位px）
       */
      scrollTop: number;
    }): void;
    /**
     * 在 Page 中定义 onShareAppMessage 函数，
     * 设置该页面的分享信息。
     *
     * 用户点击分享按钮的时候会调用；
     */
    onShareAppMessage?(
      options?: {
        /**
         * 分享事件来源。
         *
         * - button：页面内转发按钮；
         * - menu：右上角分享菜单 。
         */
        from: 'button' | 'menu';
        /**
         * 如果 from 值是 button，
         * 则 currentTarget 是触发这次转发事件的 button，
         * 否则为 undefined 。
         */
        currentTarget?: obj;
      }
    ): ShareReturn;
  }

  interface ShareReturn {
    /**
     * 转发标题
     * @default 当前的智能小程序的名称
     */
    title?: string;
    /**
     * 分享内容
     */
    content?: string;
    /**
     * 分享图标
     */
    imageUrl?: string;
    /**
     * 转发路径
     * 当前页面 path ，必须是以 `/` 开头的完整路径
     */
    path?: string;
    /**
     * 接口调用成功的回调函数
     * @param res
     */
    success?(res: any): void;
    /**
     * 接口调用失败的回调函数
     * @param res
     */
    fail?(res: any): void;
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     * @param res
     */
    complete?(res: any): void;
  }

  interface Options extends BaseOptions {
    /**
     * 页面的初始数据
     */
    data: { [key: string]: any };
    /**
     * 其他的属性或方法
     */
    [key: string]: any;
  }
}

interface Page {
  setData<T extends Page.Options['data'] = Page.Options['data']>(
    data: { [key in keyof T]?: T[key] },
    callback?: () => void
  ): void;

  /**
   * 创建绘图上下文
   * @param {String} canvasId <canvas />组件的`canvas-id`属性的值
   */
  createCanvasContext?(canvasId: string): swan.createCanvasContext.CanvasContext;
}

/**
 * Page 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
 * @param {Page.Options} options
 */
declare function Page(options: Page.Options): void;

/**
 * getCurrentPages() 函数用于获取当前页面栈的实例，
 * 以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
 */
declare function getCurrentPages(): Page[];
