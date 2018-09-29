declare namespace swan {
  /**
   * 基础事件对象
   */
  export interface BaseEvent {
    /**
     * 事件的类型
     */
    type: string;
    /**
     * 事件触发的时间戳（毫秒）
     */
    timeStamp: number;
    /**
     * 触发事件的组件的属性值集合
     */
    target: EventTarget;
    /**
     * 当前组件的一些属性值集合
     */
    currentTarget: EventCurrentTarget;
  }

  /**
   * Touch事件对象
   */
  export interface TouchEvent extends BaseEvent {
    /**
     * 触摸事件类型存在，存放当前停留在屏幕中的触摸点信息的数组
     */
    touches: EventTouch[];
    /**
     * 触摸事件类型存在，存放当前变化的触摸点信息的数组
     */
    changedTouches: EventTouch[];
  }

  /**
   * 自定义事件对象
   */
  export interface CustomEvent extends BaseEvent {
    detail: obj;
  }

  /**
   * switch 组件 change 事件对象
   */
  export interface SwitchEvent extends BaseEvent {
    detail: {
      /**
       * 官方文档给出的说明是 event.detail = { value: checked }
       *
       * 但现在的实际情况是 event.detail = { checked: checked }
       *
       * -- 2018年9月28日
       */
      checked: boolean;
    }
  }

  interface EventTarget {
    /**
     * 触发事件组件的id
     */
    id: string;
    /**
     * 触发事件组件的类型
     */
    tagName: string;
    /**
     * 触发事件组件上由data-开头的自定义属性组成的集合
     *
     * 不能有大写(大写会自动转成小写)，
     * 最终的 - 在 dataset 中会将连字符转成驼峰式写法。
     */
    dataset: obj;
  }

  interface EventCurrentTarget {
    /**
     * 事件绑定的组件的id
     */
    id: string;
    /**
     * 事件绑定的组件的类型
     */
    tagName: string;
    /**
     * 事件绑定的组件上由data-开头的自定义属性组成的集合
     *
     * 不能有大写(大写会自动转成小写)，
     * 最终的 - 在 dataset 中会将连字符转成驼峰式写法。
     */
    dataset: obj;
  }

  interface EventTouch {
    /**
     * 距离页面可显示区域（屏幕除去导航条）左上角的X轴的距离
     */
    clientX: number;
    /**
     * 距离页面可显示区域（屏幕除去导航条）左上角的Y轴的距离
     */
    clientY: number;
    /**
     * 触摸点的标识符
     */
    identifier: number;
    /**
     * 距离文档左上角的X轴的距离
     */
    pageX: number;
    /**
     * 距离文档左上角的Y轴的距离
     */
    pageY: number;
  }
}
