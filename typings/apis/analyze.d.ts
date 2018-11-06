/// <reference path="./index.d.ts" />

// 数据分析

declare namespace swan {

  /**
   * 自定义分析数据上报接口。
   *
   * 使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。
   *
   * @param eventName 事件名
   * @param data 上报的自定义数据，key为配置中的字段名，value为上报的数据。
   */
  export function reportAnalytics(eventName: string, data: Record<string, any>): void;
}
