declare namespace App {
  type AppLaunchOrShowParam = {
    /**
     * 打开小程序的路径
     */
    path: string
    /**
     * 打开小程序的query
     */
    query: {
      [key: string]: any;
    };
    /**
     * 打开小程序的场景值
     */
    scene: string
    /**
     * shareTicket
     */
    shareTicket: string
    /**
     * 当场景为由从另一个小程序打开时
     */
    referrerInfo: {
      /**
       * 来源小程序的appId
       */
      appId: string
      /**
       * 来源小程序传过来的数据，scene=1037或1038时支持。
       */
      extraData?: any
    }
  }

  interface BaseOptions {
    /**
     * SWAN 初始化的生命周期函数
     *
     * 当 SWAN App 初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch?(options: AppLaunchOrShowParam): void
    /**
     * SWAN App 展示时调用的生命周期函数
     *
     * SWAN App 从后台进入前台，触发 onShow
     */
    onShow?(options: AppLaunchOrShowParam): void
    /**
     * SWAN App 隐藏时调用的生命周期函数
     *
     * SWAN App 从前台进入后台，触发 onHide
     */
    onHide?(): void
  }

  interface Options extends BaseOptions {
    globalData?: any
    [key: string]: any
  }
}

interface App extends App.Options {}

declare function App(options: App.Options): void;

declare function getApp(): App
