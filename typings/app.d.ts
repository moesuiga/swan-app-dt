declare type AppShowOptions = {
  /**
   * 打开小程序的路径
   */
  path: string;
  /**
   * 打开小程序的query
   */
  query: string;
  /**
   * 打开小程序的场景值
   */
  scene: string;
  /**
   * shareTicket
   */
  shareTicket: string;
  /**
   * 当场景为由从另一个小程序打开时
   */
  referrerInfo: {
    /**
     * 来源小程序的appId
     */
    appId: string;
    /**
     * 来源小程序传过来的数据
     */
    extraData?: swan.IData;
  }
}

declare interface AppOptions {
  [key: string]: any;
  /**
   * 生命周期函数--监听小程序初始化
   *
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch?(options?: AppShowOptions): void;
  /**
   * 生命周期函数
   *
   * 当小程序从后台进入前台时触发
   */
  onShow?(options?: AppShowOptions): void;
  /**
   * 生命周期函数
   *
   * 当小程序从前台进入后台时触发
   */
  onHide?(): void;
  /**
   * 错误监听函数
   *
   * 当小程序发送错误时触发
   */
  onError?(): void;
}

interface IAppClass extends AppOptions {}

declare type CombineAppInstance<
  Instance extends App,
  Data,
  Method extends AppOptions
> = Instance & Method & swan.IData;

declare type ThisTypedAppOptionsWithArrayProps<
  A extends App,
  Data extends Record<string, any>,
  Method extends AppOptions
> = AppOptions &
  Method &
  ThisType<CombineAppInstance<A, Data, Method>>;

/**
 * App 实现的接口对象
 */
declare interface IApp {
  [key: string]: any;
}

declare interface App extends IApp {}

declare interface IAppConstructor<P extends App = App> {
  <Data = Record<string, any>, Method extends AppOptions = AppOptions>(
    opts: ThisTypedAppOptionsWithArrayProps<P, Data, Method>
  ): void;
}

declare let App: IAppConstructor;

declare function getApp(): AppOptions;
