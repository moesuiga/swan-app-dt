
declare type CombinedPageInstance<Instance extends Page, Data, Method> = {
  data: Data
} & Instance &
  Method &
  swan.IData;

declare type ThisTypedPageOptionsWithArrayProps<
  P extends Page,
  Data extends Record<string, any>,
  Method
> = PageOptions<P, Data> &
  Method &
  ThisType<CombinedPageInstance<P, Data, Method>>;

/**
 * Page 实现的接口对象
 */
declare interface PageOptions<P extends Page = Page, Data = DefaultData<P>> {
  [key: string]: any;
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad?(options: swan.IData): void;
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady?(options: swan.IData): void;
  /**
   * 生命周期函数--监听页面显示
   */
  onShow?(options: swan.IData): void;
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide?(): void;
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload?(): void;
}

declare interface IPage extends PageOptions {
  /**
   * 将数据从逻辑层发送到视图层，同时改变对应的数据
   */
  setData(data: swan.IData): void;
  /**
   * 当前页面的路径
   */
  uri: string;
}

declare interface Page extends IPage {}

interface IPageClass extends PageOptions<IPage, object> {}

declare type DefaultData<V> = object | ((this: V) => object);

declare type DefaultMethods<V> = {
  [key: string]: (this: V, ...args: any[]) => any;
}

/**
 * Page 的构造方法
 */
declare interface IPageConstructor<P extends Page = Page> {
  <Data = Record<string, any>, Method extends PageOptions = PageOptions>(
    opts: ThisTypedPageOptionsWithArrayProps<P, Data, Method>
  ): void;
}

/**
 * getCurrentPages() 函数用于获取当前页面栈的实例，
 * 以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
 */
declare function getCurrentPages(): CombinedPageInstance<
  Page,
  DefaultData<Page>,
  DefaultMethods<Page>
>[]

declare let Page: IPageConstructor;
