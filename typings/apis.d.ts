/// <reference path="./apis/network.d.ts" />
/// <reference path="./apis/media.d.ts" />
/// <reference path="./apis/open.d.ts" />

type cb<T = any> = (res: T) => void;
type obj = {
  [key: string]: any;
};

/**
 * 小程序接口的回调
 */
type ApiCallback<T = any> = {
  /**
   * 接口调用成功的回调
   */
  success?: cb<T>;
  /**
   * 接口调用失败的回调
   */
  fail?: cb;
  /**
   * 接口调用结束的回调，不论成功或失败
   */
  complete?: cb;
};

/**
 * 小程序接口的回调，
 * 成功的回调为必须项
 */
type NeedSuccessCallback<T = any> = {
  /**
   * 接口调用成功的回调
   */
  success: cb<T>;
  /**
   * 接口调用失败的回调
   */
  fail?: cb;
  /**
   * 接口调用结束的回调，不论成功或失败
   */
  complete?: cb;
}
