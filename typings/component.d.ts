type PropType<T> = { (): T } | { new (): T & object };

interface PropOption<T = any> {
  /**
   * 属性类型
   */
  type: PropType<T> | PropType<T>[] | null;
  /**
   * 属性初始值
   */
  value: T;
  /**
   * 属性值被更改时的响应函数
   */
  observer?(newVal: T, oldVal: T): void;
}

type DefaultProps = Record<string, any>;

type DefaultMethod<T> = Record<string, (this: T, ...args: any[]) => any>;

type DefaultData<T> = object | ((this: T) => object);

type DataDef<Data, Props, T> = Data | ((this: Readonly<Props> & T) => Data);

type PropValidator<T> = PropOption<T> | PropType<T> | PropType<T>[];

type PropsDef<T> = { [key in keyof T]: PropValidator<T[key]> };

type DefaultMessages = Record<string, (event: MessagesEvent) => void>;

interface MessagesEvent {
  /**
   * 派发消息的组件
   */
  target: any;

  /**
   * 消息的值
   */
  value: any;
}

type CombinedComponentInstance<
  Instance extends Component,
  Props,
  Data,
  Methods
> = Instance & { properties: Props } & { data: Data } & Methods;

type thisTypedComponentOptions<
  C extends Component,
  Props,
  Data,
  Methods
> = object &
  ComponentOptions<C, PropsDef<Props>, DataDef<Data, Props, C>, Methods> &
  ThisType<CombinedComponentInstance<C, Readonly<Props>, Data, Methods>>;

declare interface ComponentOptions<
  C extends Component = Component,
  Props = Record<string, PropOption>,
  Data = Record<string, any>,
  Method = DefaultMethod<C>
> {
  /**
   * 组件的对外属性，是属性名到属性设置的映射表
   *
   * 属性设置中可包含三个字段
   *
   * - type 表示属性类型
   * - value 表示属性初始值
   * - observer 表示属性值被更改时的响应函数
   */
  properties?: Props;

  /**
   * 组件的内部数据，
   * 和 properties 一同用于组件的模版渲染
   */
  data?: Data;

  /**
   * 组件的方法，
   *
   * 包括事件响应函数和任意的自定义方法，
   * 关于事件响应函数的使用
   */
  methods?: Method;

  /**
   * 通过 messages 可以声明组件要处理的消息。
   *
   * messages 是一个对象，
   * key 是消息名称，
   * value 是消息处理的函数，
   * 接收一个包含 target(派发消息的组件) 和 value(消息的值) 的参数对象。
   */
  messages?: DefaultMessages;

  /**
   * 组件生命周期函数
   *
   * 在组件实例进入页面节点树时执行
   */
  created?(): void;

  /**
   *
   * 组件生命周期函数
   *
   * 在组件实例进入页面节点树时执行
   */
  attached?(): void;

  /**
   * 组件生命周期函数
   *
   * 在组件布局完成后执行
   *
   * 此时可以获取节点信息
   */
  ready?(): void;

  /**
   * 组件生命周期函数
   *
   * 在组件实例被从页面节点树移除时执行
   */
  detached?(): void;

  /**
   * 其他自定义内容
   */
  [key: string]: any;
}

declare interface Component {
  /**
   * 设置data并执行视图层渲染
   * @param newData
   */
  setData(newData: obj, callback?: () => void): void;

  /**
   * 触发事件
   * @param {String} name 事件名
   * @param {Object} detail 提供给事件监听函数的参数
   */
  triggerEvent(name: string, detail: obj): void;

  /**
   * 通过 dispatch 方法，组件可以向组件树的上层派发消息。
   *
   * 消息将沿着组件树向上传递，
   * 直到遇到第一个处理该消息的组件，则停止。
   *
   * @param {String} message 消息名称
   * @param {Any} detail 消息内容
   */
  dispatch(message: string, detail: any): void;

  /**
   * 使用选择器选择组件实例节点
   *
   * 返回匹配到的第一个组件实例对象
   *
   * 在生命周期 onReay 开始时生效。
   *
   * @param {String} selector 选择器
   * @return {Component} 组件实例
   */
  selectComponent(selector: string): Component;

  /**
   * 使用选择器选择组件实例节点
   *
   * 返回匹配到的全部组件实例对象组成的数组。
   *
   * @param {String} selector 选择器
   * @return {Component[]} 组件实例数组
   */
  selectAllComponents(selector: string): Component[];
}

declare interface ComponentConstructor<C extends Component = Component> {
  <Data = Record<string, any>, Methods = object, Props = object>(
    options: thisTypedComponentOptions<C, Props, Data, Methods>
  ): void;
}

declare let Component: ComponentConstructor;
