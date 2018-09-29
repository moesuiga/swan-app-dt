/// <reference path="./index.d.ts" />

// 位置

declare namespace swan {

  // ======== 获取位置 ======== //
  /**
   * 获取当前的地理位置、速度。
   * 当用户离开智能小程序后，此接口无法调用。
   */
  export function getLocation(): void;
  namespace getLocation {
    type Options = {
      /**
       * 默认为 wgs84 返回 gps 坐标，可选 gcj02 。
       */
      type?: 'wgs84' | 'gcj02';
      /**
       * 传入 true 会返回高度信息，
       * 获取高度需要较高精度且需要打开 gps ，会很耗时，
       * 默认没有用 gps。
       */
      altitude?: boolean;
    } & NeedSuccessCallback<SuccessOptions>;

    type SuccessOptions = {
      /**
       * 纬度，浮点数，范围为-90~90，负数表示南纬。
       */
      latitude: number;
      /**
       * 经度，浮点数，范围为-180~180，负数表示西经。
       */
      longitude: number;
      /**
       * 速度，浮点数，单位m/s。
       */
      speed: number;
      /**
       * 位置的精确度
       */
      accuracy: number;
      /**
       * 高度，单位 m 。
       */
      altitude: number;
      /**
       * 垂直精度，单位 m（Android 无法获取，返回 0） 。
       */
      verticalAccuracy: number;
      /**
       * 水平精度，单位 m 。
       */
      horizontalAccuracy: number;
      /**
       * 街道名称
       */
      street: string;
      /**
       * 城市编码
       */
      cityCode: string;
      /**
       * 城市名称
       */
      city: string;
      /**
       * 国家
       */
      country: string;
      /**
       * 省份
       */
      province: string;
      /**
       * 街道号码
       */
      streetNumber: string;
      /**
       * 区
       */
      district: string;
    }
  }

  /**
   * 打开地图选择位置。
   * 需要用户授权 `scope.userLocation`。
   */
  export function chooseLocation(options: chooseLocation.Options): void;
  namespace chooseLocation {
    type Options = ApiCallback<chooseLocation.SuccessOptions>;
    interface SuccessOptions {
      /**
       * 位置名称
       */
      name: string;
      /**
       * 详细地址
       */
      address: string;
      /**
       * 纬度，浮点数，范围为-90~90，负数表示南纬。使用 gcj02 国测局坐标系。
       */
      latitude: number;
      /**
       * 经度，浮点数，范围为-180~180，负数表示西经。使用 gcj02 国测局坐标系。
       */
      longitude: number;
    }
  }

  // ======== 查看位置 ======== //
  /**
   * 使用百度 App 内置地图查看位置。
   */
  export function openLocation(options: openLocation.Options): void;
  namespace openLocation {
    type Options = {
      /**
       * 纬度，范围为 -90~90，负数表示南纬。
       */
      latitude: number;
      /**
       * 经度，范围为 -180~180，负数表示西经。
       */
      longitude: number;
      /**
       * 缩放比例，范围 5~18，默认为18。
       */
      scale?: 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
      /**
       * 位置名
       */
      name?: string;
      /**
       * 地址的详细说明
       */
      address?: string;
    } & ApiCallback;
  }

  // ======== 地图组件控制 ======== //
  /**
   * 创建并返回 map 上下文 mapContext 对象。
   * 在自定义组件下，第二个参数传入组件实例 this，以操作组件内 <map/> 组件。
   * mapContext 通过 mapId 跟一个 组件绑定，通过它可以操作对应的 组件。
   */
  export function createMapContext(mapId: string, context?: any): createMapContext.MapContext;
  namespace createMapContext {
    interface MapContext {
      /**
       * 获取当前地图中心的经纬度，
       * 返回的是 gcj02 坐标系，可以用于 swan.openLocation。
       */
      getCenterLocation(options: ApiCallback<Coordinate>): void;
      /**
       * 将地图中心移动到当前定位点，
       * 需要配合 map 组件的 `show-location` 使用 。
       */
      moveToLocation(): void;
      /**
       * 平移 marker，带动画 。
       */
      translateMarker(options: TranslateMarkerOptions): void;
      /**
       * 缩放视野展示所有经纬度
       */
      includePoints(options: IncludePointsOptions): void;
      /**
       * 获取当前地图的视野范围
       */
      getRegion(options: ApiCallback<{
        /**
         * 西南角的经纬度
         */
        southwest: Coordinate;
        /**
         * 东北角的经纬度
         */
        northeast: Coordinate;
      }>): void;
      /**
       * 获取当前地图的缩放级别
       */
      getScale(options: ApiCallback<{
        scale: number;
      }>): void;
    }

    interface Coordinate {
      /**
       * 经度
       */
      longitude: number;
      /**
       * 纬度
       */
      latitude: number;
    }

    interface TranslateMarkerOptions {
      /**
       * 指定 marker
       */
      markerId: number;
      /**
       * 指定marker移动到的目标点
       */
      destination: Coordinate;
      /**
       * 移动过程中是否自动旋转 marker
       */
      autoRotate: boolean;
      /**
       * marker 的旋转角度
       */
      rotate: number;
      /**
       * 动画持续时长，默认值1000ms，平移与旋转分别计算。
       */
      duration?: number;
      /**
       * 接口调用失败的回调函数
       */
      fail?(error?: any): void;
      /**
       * 动画结束时回调函数
       */
      animationEnd?(): void;
    }

    interface IncludePointsOptions {
      /**
       * 要显示在可视区域内的坐标点列表，
       * [{latitude, longitude}] 。
       */
      points: Coordinate[];
      /**
       * 坐标点形成的矩形边缘到地图边缘的距离，单位像素。
       *
       * 格式为[上,右,下,左]，
       *
       * 安卓上只能识别数组第一项，上下左右的 padding 一致。
       * 开发者工具暂不支持 padding 参数。
       */
      // padding?: [number, number?, number?, number?]
      padding?: Pad
    }

    interface Pad {
      length: 1 | 2 | 3 | 4;
      0: number;
      1?: number;
      2?: number;
      3?: number;
    }
  }
}
