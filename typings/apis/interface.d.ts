/// <reference path="./index.d.ts" />

// 界面

declare namespace swan {
  // @todo
  // ======== 绘图 ======== //

  // ======== 交互反馈 ======== //
  /**
   * 显示消息提示框
   */
  export function showToast(options: showToast.Options): void;
  namespace showToast {
    type Options = {
      /**
       * 提示的内容
       */
      title: string;
      /**
       * 图标，有效值 “success”、“loading”、“none”, 默认“success”
       *
       * |  有效值  |                        说明                        |
       * | ------- | -------------------------------------------------- |
       * | success | 显示成功图标,此时title文本最多显示`7`个汉字长度.默认值 |
       * | loading | 显示加载图标,此时title文本最多显示`7`个汉字长度.      |
       * | none    | 不显示图标,此时title文本最多可显示两行.               |
       */
      icon?: 'success' | 'loading' | 'none';
      /**
       * 自定义图标的本地路径，image 的优先级高于 icon
       */
      image?: string;
      /**
       * 提示的延迟时间，单位毫秒，默认：2000
       */
      duration?: number;
      /**
       * 是否显示透明蒙层，防止触摸穿透，默认：false
       */
      mask?: boolean;
    } & ApiCallback;
  }

  /**
   * 显示 loading 提示框,
   * 需主动调用 `hideLoading` 才能关闭提示框。
   */
  export function showLoading(options: showLoading.Options): void;
  namespace showLoading {
    type Options = {
      /**
       * 提示的内容
       */
      title: string;
      /**
       * 是否显示透明蒙层，防止触摸穿透，
       * 默认：false。
       */
      mask?: boolean;
    } & ApiCallback;
  }

  /**
   * 隐藏消息提示框
   */
  export function hideToast(): void;

  /**
   * 隐藏 loading 提示框
   */
  export function hideLoading(): void;

  /**
   * 显示模态弹窗
   */
  export function showModal(options: showModal.Options): void;
  namespace showModal {
    type Options = {
      /**
       * 提示的标题
       */
      title: string;
      /**
       * 提示的内容
       */
      content: string;
      /**
       * 是否显示取消按钮，默认为 true。
       */
      showCancel?: boolean;
      /**
       * 取消按钮的文字，默认为“取消”，最多 4 个字符。
       */
      cancelText?: string;
      /**
       * 取消按钮的文字颜色，默认为 “#000000”。
       */
      cancelColor?: string;
      /**
       * 确定按钮的文字，默认为“确定”，最多 4 个字符。
       */
      confirmText?: string;
      /**
       * 确定按钮的文字颜色，默认颜色为“#3c76ff”。
       */
      confirmColor?: string;
    } & ApiCallback<SuccessOptions>;

    type SuccessOptions = {
      /**
       * 为 true 时，表示用户点击了确定按钮 。
       */
      confirm: boolean;
      /**
       * 为 true 时，表示用户点击了取消。
       */
      cancel: boolean;
    }
  }

  /**
   * 显示操作菜单
   */
  export function showActionSheet(options: showActionSheet.Options): void;
  namespace showActionSheet {
    type Options = {
      /**
       * 按钮的文字数组，数组长度最大为6个。
       */
      itemList: string[];
      /**
       * 按钮的文字颜色，默认颜色为“#3c76ff”。
       */
      itemColor?: string;
    } & ApiCallback<{
      /**
       * 用户点击的按钮，
       * 从上到下的顺序，从0开始。
       */
      tapIndex: number;
    }>
  }

  // ======== 设置导航条 ======== //
  /**
   * 动态设置当前页面的标题。
   */
  export function setNavigationBarTitle(options: setNavigationBarTitle.Options): void;
  namespace setNavigationBarTitle {
    type Options = {
      /**
       * 页面标题
       */
      title: string;
    } & ApiCallback;
  }

  /**
   * 该方法在当前页面显示导航条加载动画。
   */
  export function showNavigationBarLoading(): void;

  /**
   * 隐藏导航条加载动画。
   */
  export function hideNavigationBarLoading(): void;

  /**
   * 动态设置当前页面导航条的颜色。
   */
  export function setNavigationBarColor(options: setNavigationBarColor.Options): void;
  namespace setNavigationBarColor {
    type Options = {
      /**
       * 前景颜色值，包括按钮、标题、状态栏的颜色，
       * 仅支持 `#ffffff` 和 `#000000`。
       */
      frontColor: string;
      /**
       * 背景颜色值，有效值为十六进制颜色。
       */
      backgroundColor: string;
      /**
       * 动画效果
       */
      animation?: {
        /**
         * 动画变化时间，默认0，单位：毫秒。
         */
        duration?: number;
        /**
         * 动画变化方式，默认 linear
         */
        timingFunc?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
      };
    } & ApiCallback<{errMsg: string}>;
  }

  // ======== 设置tabBar ======== //
  namespace TabBar {
    type CommonOptions = {
      /**
       * tabBar的哪一项，从左边算起
       */
      index: number;
    } & ApiCallback;
  }
  /**
   * 为 tabBar 某一项的右上角添加文本
   */
  export function setTabBarBadge(options: TabBar.CommonOptions & {
    /**
     * 显示的文本，超过 4 个字符则显示成“…”
     */
    text: string;
  }): void;
  /**
   * 移除tabBar某一项右上角的文本。
   */
  export function removeTabBarBadge(options: TabBar.CommonOptions): void;

  /**
   * 显示 tabBar 某一项的右上角的红点
   */
  export function showTabBarRedDot(options: TabBar.CommonOptions): void;

  /**
   * 隐藏 tabBar 某一项的右上角的红点
   */
  export function hideTabBarRedDot(options: TabBar.CommonOptions): void;

  /**
   * 动态设置 tabBar 的整体样式
   */
  export function setTabBarStyle(options?: setTabBarStyle.Options): void;
  namespace setTabBarStyle {
    type Options = {
      /**
       * tab 上的文字默认颜色
       */
      color?: string;
      /**
       * tab 上的文字选中时的颜色
       */
      selectedColor?: string;
      /**
       * tab 的背景色
       */
      backgroundColor?: string;
      /**
       * tabbar上边框的颜色， 仅支持 black/white
       */
      borderStyle?: 'black' | 'white';
    } & ApiCallback;
  }

  /**
   * 动态设置 tabBar 某一项的内容
   */
  export function setTabBarItem(options: setTabBarItem.Options): void;
  namespace setTabBarItem {
    type Options = TabBar.CommonOptions & {
      /**
       * tab 上按钮文字
       */
      text?: string;
      /**
       * 图片绝对路径，
       * icon 大小限制为 40KB，建议尺寸为 81px * 81px，
       * 当 position 为 top 时，此参数无效，
       * 不支持网络图片。
       */
      iconPath?: string;
      /**
       * 选中时的图片的绝对路径，
       * icon 大小限制为 40KB，建议尺寸为 81px * 81px ，
       * 当position为 top 时，此参数无效。
       */
      selectedIconPath?: string;
    }
  }

  /**
   * 显示 tabBar
   */
  export function showTabBar(options: ApiCallback & {
    /**
     * 是否需要动画效果，默认无。
     */
    animation?: boolean;
  }): void;

  /**
   * 隐藏 tabBar
   */
  export function hideTabBar(options: ApiCallback & {
    /**
     * 是否需要动画效果，默认无。
     */
    animation?: boolean;
  }): void;

  // ======== 导航 ======== //
  namespace Navigate {
    interface CommonOptions extends ApiCallback {
      /**
       * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。
       *
       * 参数与路径之间使用`?`分隔，
       * 参数键与参数值用`=`相连，
       * 不同参数用`&`分隔；
       *
       * 如 ‘path?key=value&key2=value2’。
       *
       * 如果跳转的页面路径是 `tabBar` 页面则不能带参数。
       */
      url: string;
    }
  }
  /**
   * 保留当前页面，跳转到应用内的某个页面，
   * 使用 `swan.navigateBack` 可以返回到原页面。
   *
   * @description 为了减少用户在使用智能小程序时的困扰，我们规定页面路径只能是五层，请尽量避免多层级的交互方式。
   */
  export function navigateTo(options: Navigate.CommonOptions): void;

  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   */
  export function redirectTo(options: Navigate.CommonOptions): void;

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
   */
  export function switchTab(options: Navigate.CommonOptions): void;

  /**
   * 关闭当前页面，返回上一页面或多级页面。
   */
  export function navigateBack(options?: {
    /**
     * 返回的页面数，
     * 如果 delta 大于现有页面数，则返回到首页，
     * 默认为 1。
     */
    delta?: number;
  }): void;

  /**
   * 关闭所有页面，打开到应用内的某个页面。
   */
  export function reLaunch(options: Navigate.CommonOptions): void;

  // ======== 动画 ======== //
  /**
   * 创建一个动画实例 animation
   */
  export function createAnimation(options?: createAnimation.Options): createAnimation.Animation;
  namespace createAnimation {
    type Options = {
      /**
       * 动画持续时间，单位 ms 。
       *
       * @default 400
       */
      duration?: number;
      /**
       * 定义动画的效果
       *
       * @default 'linear'
       */
      timingFunction?:
        | 'linear'
        | 'ease'
        | 'ease-in'
        | 'ease-in-out'
        | 'ease-out'
        | 'step-start'
        | 'step-end'
      /**
       * 动画延迟时间，单位 ms 。
       *
       * @default 0
       */
      delay?: number;
      /**
       * 动画
       *
       * @default '50% 50% 0'
       */
      transformOrigin?: string;
    }
    interface Animation {
      // 普通样式
      /**
       * 设置透明度
       * @param {Number} value 透明度，参数范围 0~1
       */
      opacity(value: number): Animation;
      /**
       * 设置背景色
       * @param {String} color 颜色值
       */
      backgroundColor(color: string): Animation;
      /**
       * 设置宽度
       * @param {Number | String} length 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值。
       */
      width(length: number | string): Animation;
      /**
       * 设置高度
       * @param {Number | String} length 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值。
       */
      height(length: number | string): Animation;
      /**
       * 设置top值
       * @param {Number | String} length 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值。
       */
      top(length: number | string): Animation;
      /**
       * 设置left值
       * @param {Number | String} length 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值。
       */
      left(length: number | string): Animation;
      /**
       * 设置bottom值
       * @param {Number | String} length 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值。
       */
      bottom(length: number | string): Animation;
      /**
       * 设置right值
       * @param {Number | String} length 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值。
       */
      right(length: number | string): Animation;

      // 旋转
      /**
       * 旋转
       * @param {Number} deg deg的范围-180~180，从原点顺时针旋转一个 deg 角度。
       */
      rotate(deg: number): Animation;
      /**
       * 绕X轴旋转
       * @param {Number} deg deg的范围-180~180，在X轴旋转一个 deg 角度。
       */
      rotateX(deg: number): Animation;
      /**
       * 绕Y轴旋转
       * @param {Number} deg deg的范围-180~180，在Y轴旋转一个 deg 角度。
       */
      rotateY(deg: number): Animation;
      /**
       * 绕Z轴旋转
       * @param {Number} deg deg的范围-180~180，在Z轴旋转一个 deg 角度。
       */
      rotateZ(deg: number): Animation;
      /**
       * 同 transform-function rotate3d
       * @param {Number} x X轴向量
       * @param {Number} y Y轴向量
       * @param {Number} z Z轴向量
       * @param {Number} deg 旋转角度
       */
      rotate3d(x: number, y: number, z: number, deg: number): Animation;

      // 缩放
      /**
       * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；
       *
       * 两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数。
       */
      scale(sx: number, sy?: number): Animation;
      /**
       * 在X轴缩放sx倍数
       * @param {Number} sx 缩放倍数
       */
      scaleX(sx: number): Animation;
      /**
       * 在Y轴缩放sy倍数
       * @param {Number} sy 缩放倍数
       */
      scaleY(sy: number): Animation;
      /**
       * 在Z轴缩放sz倍数
       * @param {Number} sz 缩放倍数
       */
      scaleZ(sz: number): Animation;
      /**
       * 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数。
       * @param {Number} sx 缩放倍数
       * @param {Number} sy 缩放倍数
       * @param {Number} sz 缩放倍数
       */
      scale3d(sx: number, sy: number, sz: number): Animation;

      // 偏移
      /**
       * 一个参数时，表示在X轴偏移 tx ，单位 px ；
       *
       * 两个参数时，表示在 X 轴偏移 tx ，在 Y 轴偏移 ty ，单位 px 。
       */
      translate(tx: number, ty?: number): Animation;
      /**
       * 在 X 轴偏移 tx ，单位 px。
       * @param {Number} tx X轴偏移量
       */
      translateX(tx: number): Animation;
      /**
       * 在 Y 轴偏移 tx ，单位 px。
       * @param {Number} ty Y轴偏移量
       */
      translateY(ty: number): Animation;
      /**
       * 在 Z 轴偏移 tx ，单位 px。
       * @param {Number} tz Z轴偏移量
       */
      translateZ(tz: number): Animation;
      /**
       * 在 X 轴偏移 tx ，在 Y 轴偏移 ty ，在 Z 轴偏移 tz，单位 px。
       * @param {Number} tx X轴偏移量
       * @param {Number} ty Y轴偏移量
       * @param {Number} tz Z轴偏移量
       */
      translate3d(tx: number, ty: number, tz: number): Animation;

      // 倾斜
      /**
       * 参数范围-180~180；
       *
       * 一个参数时， Y 轴坐标不变， X 轴坐标延顺时针倾斜 ax 度；
       *
       * 两个参数时，分别在 X 轴倾斜 ax 度，在 Y 轴倾斜 ay 度。
       */
      skew(ax: number, ay?: number): Animation;
      /**
       * 参数范围-180~180；
       *
       * Y 轴坐标不变， X 轴坐标延顺时针倾斜 ax 度。
       * @param ax X 轴坐标倾斜度数
       */
      skewX(ax: number): Animation;
      /**
       * 参数范围-180~180；
       *
       * X 轴坐标不变， Y 轴坐标延顺时针倾斜 ay 度。
       * @param ay Y 轴坐标倾斜度数
       */
      skewY(ay: number): Animation;

      // 矩阵变换
      /**
       * 同[transform-function matrix](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix)
       */
      matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): Animation;
      /**
       * 3D转换，同[transform-function matrix3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d)
       */
      matrix3d(
        a1: number,
        b1: number,
        c1: number,
        d1: number,
        a2: number,
        b2: number,
        c2: number,
        d2: number,
        a3: number,
        b3: number,
        c3: number,
        d3: number,
        a4: number,
        b4: number,
        c4: number,
        d4: number
      ): Animation;

      /**
       * 表示一组动画完成，
       *
       * 可以在一组动画中调用任意多个动画方法，
       *
       * 一组动画中的所有动画会同时开始，
       *
       * 一组动画完成后才会进行下一组动画。
       */
      step(): void;
      /**
       * 导出动画队列。
       */
      export(): any;
    }
  }

  // ======== 位置 ======== //

  // ======== 下拉刷新 ======== //

  // ======== 节点信息 ======== //
}
