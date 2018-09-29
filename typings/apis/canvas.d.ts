/// <reference path="./index.d.ts" />

// 绘图
declare namespace swan {
  /**
   * 在 Page 中，
   * 推荐使用`this.createCanvasContext(canvasId)`，
   * 进行绘图上下文的创建。
   *
   * 也可使用`swan.createCanvasContext(canvasId)`，
   *
   * 但使用`swan.createCanvasContext(canvasId)`进行创建时，
   * 并非在执行所在的 Page 对象中使用 `canvasId` 进行查找，
   * 而是在**用户当前可视**的 Page 中使用 `canvasId` 进行查找。
   *
   * @param {String} canvasId <canvas />组件的`canvas-id`属性的值
   */
  export function createCanvasContext(canvasId: string): createCanvasContext.CanvasContext;
  namespace createCanvasContext {
    interface CanvasContext {
      /**
       * 设置填充色。
       * @param {String} color 设置的填充颜色
       */
      setFillStyle(color: string): void;

      /**
       * 设置边框颜色。
       * @param {String} color 设置的填充颜色
       */
      setStrokeStyle(color: string): void;

      /**
       * 设置阴影样式。
       * @param {Number} offsetX 阴影相对于形状在水平方向的偏移
       * @param {Number} offsetY 阴影相对于形状在竖直方向的偏移
       * @param {Number} blur 阴影的模糊级别，数值越大越模糊，范围：0 ~ 100。
       * @param {String} color 阴影的颜色
       */
      setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;

      /**
       * 创建一个线性的渐变颜色。
       * @param {Number} x0 起点的 x 坐标
       * @param {Number} y0 起点的 y 坐标
       * @param {Number} x1 终点的 x 坐标
       * @param {Number} y1 终点的 y 坐标
       */
      createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;

      /**
       * 创建一个圆形的渐变颜色。
       * @param {Number} x 圆心的 x 坐标
       * @param {Number} y 圆心的 y 坐标
       * @param {Number} r 圆的半径
       */
      createCircularGradient(x: number, y: number, r: number): CanvasGradient;

      /**
       * 设置线条的宽度。
       * @param {Number} lineWidth 线条的宽度(单位是 px)
       */
      setLineWidth(lineWidth: number): void;

      /**
       * 设置线条的端点样式。
       * @param {'butt' | 'round' | 'square'} lineCap 线条的结束端点样式
       */
      setLineCap(lineCap: 'butt' | 'round' | 'square'): void;

      /**
       * 设置线条的交点样式。
       * @param {'bevel' | 'round' | 'miter'} lineJoin 线条的结束交点样式。
       */
      setLineJoin(lineJoin: 'bevel' | 'round' | 'miter'): void;

      /**
       * 设置线条的宽度。
       * @param {Array<number>} pattern 一组描述交替绘制线段和间距（坐标空间单位）长度的数字。
       * @param {Number} offset 虚线偏移量
       */
      setLineDash(pattern: number[], offset: number): void;

      /**
       * 设置最大斜接长度，
       *
       * 斜接长度指的是在两条线交汇处内角和外角之间的距离，
       *
       * 当 `setLineJoin()` 为 `miter` 时才有效，
       *
       * 超过最大倾斜长度的，连接处将以 `lineJoin` 为 `bevel` 来显示。
       * @param {Number} miterLimit 最大斜接长度
       */
      setMiterLimit(miterLimit: number): void;

      /**
       * 创建一个矩形。
       * @param {Number} x 矩形路径左上角的 x 坐标
       * @param {Number} y 矩形路径左上角的 y 坐标
       * @param {Number} width 矩形路径的宽度
       * @param {Number} height 矩形路径的高度
       */
      rect(x: number, y: number, width: number, height: number): void;

      /**
       * 填充一个矩形。
       * @param {Number} x 矩形路径左上角的 x 坐标
       * @param {Number} y 矩形路径左上角的 y 坐标
       * @param {Number} width 矩形路径的宽度
       * @param {Number} height 矩形路径的高度
       */
      fillRect(x: number, y: number, width: number, height: number): void;

      /**
       * 画一个矩形(非填充)。
       * @param {Number} x 矩形路径左上角的 x 坐标
       * @param {Number} y 矩形路径左上角的 y 坐标
       * @param {Number} width 矩形路径的宽度
       * @param {Number} height 矩形路径的高度
       */
      strokeRect(x: number, y: number, width: number, height: number): void;

      /**
       * 清除画布上在该矩形区域内的内容。
       * @param {Number} x 矩形路径左上角的 x 坐标
       * @param {Number} y 矩形路径左上角的 y 坐标
       * @param {Number} width 矩形路径的宽度
       * @param {Number} height 矩形路径的高度
       */
      clearRect(x: number, y: number, width: number, height: number): void;

      /**
       * 对当前路径中的内容进行填充。
       * 默认的填充色为黑色。
       */
      fill(): void;

      /**
       * 画出当前路径的边框。默认颜色为黑色。
       */
      stroke(): void;

      /**
       * 开始创建一个路径，
       * 需要调用 `fill` 或者 `stroke` 才会使用路径进行填充或描边。
       */
      beginPath(): void;

      /**
       * 关闭一个路径。
       */
      closePath(): void;

      /**
       * 把路径移动到画布中的指定点，不创建线条。
       * @param {Number} x 目标位置的 x 坐标
       * @param {Number} y 目标位置的 y 坐标
       */
      moveTo(x: number, y: number): void;

      /**
       * lineTo 方法增加一个新点，
       * 然后创建一条从上次指定点到目标点的线。
       * @param {Number} x 目标位置的 x 坐标
       * @param {Number} y 目标位置的 y 坐标
       */
      lineTo(x: number, y: number): void;

      /**
       * 画一条弧线。
       * @param {Number} x 圆的 x 坐标
       * @param {Number} y 圆的 y 坐标
       * @param {Number} r 圆的 y 坐标
       * @param {Number} sAngle 起始弧度，单位弧度（在3点钟方向）
       * @param {Number} eAngle 终止弧度
       * @param {Boolean=} counterclockwise 指定弧度的方向是逆时针还是顺时针。默认是 false，即顺时针。
       */
      arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: boolean): void;

      /**
       * 在调用scale方法后，
       * 之后创建的路径其横纵坐标会被缩放。
       *
       * 多次调用scale，倍数会相乘。
       *
       * @param {Number} scaleWidth 横坐标缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
       * @param {Number} scaleHeight 纵坐标轴缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
       */
      scale(scaleWidth: number, scaleHeight: number): void;

      /**
       * 以原点为中心，原点可以用 `translate` 方法修改。
       *
       * 顺时针旋转当前坐标轴。
       *
       * 多次调用 rotate，旋转的角度会叠加。
       *
       * @param {Number} rotate 旋转角度，以弧度计(degrees * Math.PI/180；degrees范围为0~360)。
       */
      rotate(rotate: number): void;

      /**
       * 对当前坐标系的原点 (0, 0) 进行变换，
       * 默认的坐标系原点为页面左上角。
       * @param x 水平坐标平移量
       * @param y 竖直坐标平移量
       */
      translate(x: number, y: number): void;

      /**
       * `clip()` 方法从原始画布中剪切任意形状和尺寸。
       *
       * 一旦剪切了某个区域，
       * 则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。
       *
       * 可以在使用 `clip()` 方法前通过使用 `save()` 方法对当前画布区域进行保存，
       *
       * 并在以后的任意时间对其进行恢复（通过 `restore()` 方法）。
       */
      clip(): void;

      /**
       * 设置字体的字号。
       * @param {Number} fontSize 字体的字号
       */
      setFontSize(fontSize: number): void;

      /**
       * 在画布上绘制被填充的文本。
       * @param {String} text 在画布上输出的文本
       * @param {Number} x 绘制文本的左上角 x 坐标位置
       * @param {Number} y 绘制文本的左上角 y 坐标位置
       * @param {Number} maxWidth 需要绘制的最大宽度
       */
      fillText(text: string, x: number, y: number, maxWidth?: number): void;

      /**
       * 用于设置文字的对齐。
       * @param {'left' | 'center' | 'right'} align 对齐方式
       */
      setTextAlign(align: 'left' | 'center' | 'right'): void;

      /**
       * 用于设置文字的水平对齐。
       * @param textBaseline 水平对齐方式
       */
      setTextBaseline(textBaseline: 'top' | 'bottom' | 'middle' | 'normal'): void;

      /**
       * 绘制图像到画布。
       * @param {String} imageResource 所要绘制的图片资源
       * @param {Number} dx 图像的左上角在目标 canvas 上 X 轴的位置。
       * @param {Number} dy 图像的左上角在目标 canvas 上 Y 轴的位置 。
       * @param {Number} dWidth 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 。
       * @param {Number} dHeight 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 。
       */
      drawImage(imageResource: string, dx: number, dy: number, dWidth: number, dHeight: number): void;
      /**
       * 绘制图像到画布。
       * @param {String} imageResource 所要绘制的图片资源
       * @param {Number} dx 图像的左上角在目标 canvas 上 X 轴的位置。
       * @param {Number} dy 图像的左上角在目标 canvas 上 Y 轴的位置 。
       * @param {Number} dWidth 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 。
       * @param {Number} dHeight 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 。
       * @param {Number} sx 源图像的矩形选择框的左上角 X 坐标。
       * @param {Number} sy 源图像的矩形选择框的左上角 Y 坐标。
       * @param {Number} sWidth 源图像的矩形选择框的宽度
       * @param {Number} sHeight 源图像的矩形选择框的高度
       */
      drawImage(imageResource: string, dx: number, dy: number, dWidth: number, dHeight: number, sx: number, sy: number, sWidth: number, sHeight: number): void;

      /**
       * 设置全局画笔透明度。
       * @param alpha 透明度，0 表示完全透明，1 表示完全不透明。
       */
      setGlobalAlpha(alpha: number): void;

      /**
       * 测量文本尺寸信息，目前仅返回文本宽度。同步接口。
       * @param {String} text 要测量的文本
       */
      measureText(text: string): TextMetrix;

      /**
       * 根据控制点和半径绘制圆弧路径。
       * @param {Number} x1 第一个控制点的 x 轴坐标
       * @param {Number} y1 第一个控制点的 y 轴坐标
       * @param {Number} x2 第二个控制点的 x 轴坐标
       * @param {Number} y2 第二个控制点的 y 轴坐标
       * @param {Number} radius 圆弧的半径
       */
      arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

      /**
       * 给定的 `(x, y)` 位置绘制文本描边的方法。
       * @param {String} text 要绘制的文本
       * @param {Number} x 文本起始点的 x 轴坐标
       * @param {Number} y 文本起始点的 y 轴坐标
       * @param {Number} maxWidth 需要绘制的最大宽度
       */
      strokeText(text: string, x: number, y: number, maxWidth?: number): void;

      /**
       * 设置虚线偏移量的属性。
       *
       * ⚠ ！不是方法，是属性
       *
       * 示例
       *
       *     canvasContext.setLineDashOffset = value;
       *
       */
      setLineDashOffset: number;

      /**
       * 对指定的图像创建模式的方法，可在指定的方向上重复元图像。
       * @param {String} image 重复的图像源，仅支持包内路径和临时路径 。
       * @param {'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'} repetition 指定如何重复图像
       */
      createPattern(image: string, repetition: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'): any;

      /**
       * 创建三次方贝塞尔曲线路径。
       * @param {Number} cp1x 第一个贝塞尔控制点的 x 坐标
       * @param {Number} cp1y 第一个贝塞尔控制点的 y 坐标
       * @param {Number} cp2x 第二个贝塞尔控制点的 x 坐标
       * @param {Number} cp2y 第二个贝塞尔控制点的 y 坐标
       * @param {Number} x 结束点的 x 坐标
       * @param {Number} y 结束点的 y 坐标
       */
      bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;

      /**
       * 结束点的 y 坐标
       * @param {Number} cpx 贝塞尔控制点的 x 坐标
       * @param {Number} cpy 贝塞尔控制点的 y 坐标
       * @param {Number} x 结束点的 x 坐标
       * @param {Number} y 结束点的 y 坐标
       */
      quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

      /**
       * 保存当前的绘图上下文。
       */
      save(): void;

      /**
       * 恢复之前保存的绘图上下文。
       */
      restore(): void;

      /**
       * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
       */
      draw(callback?: cb): void;

      /**
       * 设置当前字体样式的属性。
       *
       * 符合 CSS font 示例的 DOMString 字符串，
       * 至少需要提供字体大小和字体族名，
       *
       * 默认值为 `10px sans-serif` 。
       *
       * value 支持的属性有：
       *
       * | 属性   |                   说明                    |
       * | ------ | ---------------------------------------- |
       * | style  | 字体样式，仅支持 italic, oblique, normal。 |
       * | weight | 字体粗细，仅支持 normal, bold。            |
       * | size   | 字体大小                                  |
       * | family | 字体族名，注意确认各平台所支持的字体 。      |
       */
      font: string;

      /**
       * 使用矩阵重新设置（覆盖）当前变换的方法。
       * @param scaleX 水平缩放
       * @param scaleY 垂直缩放
       * @param skewX 水平倾斜
       * @param skewY 垂直倾斜
       * @param translateX 水平移动
       * @param translateY 水平移动
       */
      setTransform(scaleX: number, scaleY: number, skewX: number, skewY: number, translateX: number, translateY: number): void;

      /**
       * 填充样式
       *
       * 文档中未提出的属性，但在`createPattern`方法的示例中有用到
       *
       * [createPattern](https://smartapp.baidu.com/docs/develop/api/show_canvas/#canvasContext-createPattern/)
       */
      fillStyle: any;

      /**
       * 根据 `fillStyle` 属性，推测，应有这个属性
       */
      strokeStyle: any;
    }

    interface CanvasGradient {
      /**
       * 创建一个颜色的渐变点。
       * @param {Number} stop 表示渐变点在起点和终点中的位置
       * @param {String} color 渐变点的颜色
       *
       * @description `addColorStop` 目前在 Android 有bug。
       * @date 2018年9月29日
       */
      addColorStop(stop: number, color: string): void;
    }

    interface TextMetrix {
      /**
       * 文本的宽度
       *
       * 官方文档给出的类型是String
       * 但实际是一个浮点数
       */
      width: number;
    }
  }

  /**
   * 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
   *
   * 在自定义组件下，第二个参数传入组件实例this，以操作组件内<canvas/>组件。
   */
  export function canvasToTempFilePath(options: canvasToTempFilePath.Options, componentInstance?: any): void;
  namespace canvasToTempFilePath {
    type Options = {
      /**
       * 画布标识，传入<canvas/>的 canvas-id
       */
      canvasId: string;
      /**
       * 画布 x 轴起点（默认 0 ）
       */
      x?: number;
      /**
       * 画布 y 轴起点（默认 0 ）
       */
      y?: number;
      /**
       * 画布宽度（默认为 canvas 宽度 -x）
       */
      width?: number;
      /**
       * 画布高度（默认为 canvas 高度 -y）
       */
      height?: number;
      /**
       * 输出图片宽度（默认为 width * 屏幕像素密度）
       */
      destWidth?: number;
      /**
       * 输出图片高度（默认为 height * 屏幕像素密度）
       */
      destHeight?: number;
      /**
       * 目标文件的类型，只支持 ‘jpg’ 或 ‘png’，默认为 ‘png’ 。
       */
      fileType?: 'jpg' | 'png';
      /**
       * 图片的质量，取值范围为 (0, 1]，不在范围内时当作 1.0 处理 。
       */
      quality?: number;
    } & ApiCallback<{tempFilePath: string}>;
  }
}
