declare namespace swan {
  /**
   * 目前支持的事件类型有：
   * - touchstart: 手指触摸开始
   * - touchmove: 手指触摸后进行移动
   * - touchend: 手指触摸结束
   * - touchcancel: 手指触摸动作被打断，如来电提醒等
   * - tap: 手指触摸后马上离开动作
   */
  type EventType =
    | 'touchstart'
    | 'touchmove'
    | 'touchend'
    | 'touchcancel'
    | 'tap';

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
    dataset: obj;
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
  export interface ITouchEvent<T extends IEventTouch = IEventTouch>
    extends IBaseEvent {
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
}
