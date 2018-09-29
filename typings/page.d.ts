declare namespace Page {
  type obj = {
    [key: string]: any;
  };
  interface BaseOptions {
    /**
     * 监听页面加载的生命周期函数
     */
    onLoad?(options: obj): void;
    /**
     * 监听页面初次渲染完成的生命周期函数
     */
    onReady?(options: obj): void;
    /**
     * 监听页面显示的生命周期函数
     */
    onShow?(options: obj): void;
    /**
     * 监听页面隐藏的生命周期函数
     */
    onHide?(): void;
    /**
     * 监听页面卸载的生命周期函数
     */
    onUnload?(): void;
    /**
     * 监听用户下拉动作
     */
    onPullDownRefresh?(event: any): any;
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom?(event: any): any;
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
    /**
     * 错误监听函数
     */
    onError?(error: any): any;
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

interface Page extends Page.Options {
  setData<T extends Page.Options['data'] = Page.Options['data']>(
    data: { [key in keyof T]?: T[key] },
    callback?: () => void
  ): void;
}

declare function Page(options: Page.Options): void;

/**
 * getCurrentPages() 函数用于获取当前页面栈的实例，
 * 以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
 */
declare function getCurrentPages(): Page[];
