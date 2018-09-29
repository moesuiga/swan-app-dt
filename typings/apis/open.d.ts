/// <reference path="./index.d.ts" />

// 开放接口

declare namespace swan {
  // ======== 登录 ======== //

  /**
   * 获取 Authorization Code，
   * 智能小程序可以使用swan.login()接口获取Authorization Code。
   */
  export function login(params: ApiCallback<{code: string}>): void;

  /**
   * 检测当前用户登录态是否有效，
   * 登录态过期后开发者可以再调用 swan.login 获取新的用户登录态。
   */
  export function checkSession(params: ApiCallback): void;

  // ======== 授权 ======== //
  /**
   * 提前向用户发起授权请求。
   * 调用后会立刻弹窗询问用户是否同意授权智能小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。
   * 如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
   *
   * @tip 授权操作为异步操作，完成前请不要多次调用。
   */
  export function authorize(options: authorize.Options): void;
  namespace authorize {
    type Options = {
      /**
       * 需要获取权限的 scope，详见 scope 列表。
       */
      scope:
        'scope.userInfo' |
        'scope.userLocation' |
        'scope.writePhotosAlbum' |
        'scope.address' |
        'scope.invoiceTitle' |
        'scope.record' |
        'scope.camera'
    } & ApiCallback<{ errMsg: string }>
  }

  // ======== 用户信息 ======== //
  /**
   * 获取 swanid。
   */
  export function getSwanId(options: getSwanId.Options): void;
  namespace getSwanId {
    type Options = ApiCallback<SuccessOptions>;
    type SuccessOptions = {
      errno: string;
      data: {
        swanid: string;
      }
      errmsg: string;
    }
  }
  /**
   * 获取用户信息
   */
  export function getUserInfo(): void;
  namespace getUserInfo {
    type Options = ApiCallback<SuccessOptions>;
    type SuccessOptions = {
      /**
       * 用户信息对象
       */
      userInfo: UserInfo;
      /**
       * 包括敏感数据在内的完整用户信息的加密数据，
       * 加解密逻辑参考用户[数据的签名验证和加解密。](https://smartprogram.baidu.com/docs/develop/api/open_login/#%E7%94%A8%E6%88%B7%E6%95%B0%E6%8D%AE%E7%9A%84%E7%AD%BE%E5%90%8D%E9%AA%8C%E8%AF%81%E5%92%8C%E5%8A%A0%E8%A7%A3%E5%AF%86)
       */
      data: string;
      /**
       * 加密算法的初始向量
       */
      iv: string;
    }
    interface UserInfo {
      /**
       * 用户名
       */
      nickName: string;
      /**
       * 用户头像
       */
      avatarUrl: string;
      /**
       * 性别:值为0时是女性，为1时是男性。
       */
      gender: string;
    }
  }

  // ======== 设置 ======== //
  /**
   * 调起客户端智能小程序设置界面，返回用户设置的操作结果。
   */
  export function openSetting(options: openSetting.Options): void;
  namespace openSetting {
    type Options = ApiCallback<SuccessOptions>;
    type SuccessOptions = {
      authSetting: {
        [scope in authorize.Options['scope']]: boolean;
      }
    }
  }
  /**
   * 获取用户的当前设置
   */
  export function getSetting(options: openSetting.Options): void;

  // ======== 分享 ======== //
  /**
   *  调起分享面板。
   */
  export function openShare(options: openShare.Options): void;
  namespace openShare {
    type Options = {
      /**
       * 分享标题
       */
      title?: string;
      /**
       * 分享内容
       */
      content?: string;
      /**
       * 分享图标
       */
      imageUrl?: string;
      /**
       * 页面 path ，必须是以 `/` 开头的完整路径。
       */
      path?: string;
    } & ApiCallback
  }

  // ======== 选择收货地址 ======== //
  /**
   * 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址，
   * 需要用户授权 scope.address。
   */
  export function chooseAddress(options: chooseAddress.Options): void;
  namespace chooseAddress {
    type Options = ApiCallback<SuccessOptions>;
    type SuccessOptions = {
      /**
       * 收货人姓名
       */
      userName: string;
      /**
       * 邮编
       */
      postalCode: string;
      /**
       * 国标收货地址第一级地址
       */
      provinceName: string;
      /**
       * 国标收货地址第二级地址
       */
      cityName: string;
      /**
       * 国标收货地址第三级地址
       *
       * @description 如果获取失败，请使用`countryName`，已反馈给百度修改，不知道什么时候改好
       * @date 2018年8月13日
       */
      countyName: string;
      /**
       * 国标收货地址第三级地址
       * @deprecated 请确认`countyName`获取无效时，再使用该属性
       */
      countryName: string;
      /**
       * 详细收货地址信息
       */
      detailInfo: string;
      /**
       * 收货人手机号码
       */
      telNumber: string;
      /**
       * 收货地址国家码
       */
      nationalCode: string;
    }
  }

  /**
   * 百度收银台，
   * 聚合了主流的百度钱包、微信、支付宝、网银等多种支付方式，
   * 方便开发者一站式快速接入多种支付渠道，
   * 让百度用户能在智能小程序场景下，直接完成支付、交易闭环，
   * 提升用户支付体验的同时，提高智能小程序的订单转化率。
   *
   * @since swanjs 1.8.5
   */
  export function requestPolymerPayment(options: requestPolymerPayment.Options): void;
  namespace requestPolymerPayment {
    type Options = {
      /**
       * 订单信息
       */
      orderInfo: OrderInfo;
      /**
       * 需要隐藏的支付方式
       */
      bannedChannels?: ('Alipay' | 'BDWallet' | 'WeChat')[];
    } & ApiCallback
    interface OrderInfo {
      /**
       * 跳转百度收银台支付必带参数之一，是百度收银台的财务结算凭证，
       * 与账号绑定的结算协议一一对应，每笔交易将结算到dealId对应的协议主体。
       *
       * 详见[核心参数获取。](https://dianshang.baidu.com/platform/doclist/index.html#!/doc/nuomiplus_1_guide/mini_program_cashier/parameter.md)
       */
      dealId: string;
      /**
       * 百度电商开放平台appKey，用以表示应用身份的唯一ID，在应用审核通过后进行分配，一经分配后不会发生更改，来唯一确定一个应用。
       *
       * 详见[核心参数获取。](https://dianshang.baidu.com/platform/doclist/index.html#!/doc/nuomiplus_1_guide/mini_program_cashier/parameter.md)
       */
      appKey: string;
      /**
       * 订单金额，单位为人民币分。
       */
      totalAmount: string;
      /**
       * 商户平台自己记录的订单ID，当支付状态发生变化时，会通过此订单ID通知商户。
       */
      tpOrderId: string;
      /**
       * 订单的名称
       */
      dealTitle: string;
      /**
       * 对appKey+dealId+tpOrderId进行RSA加密后的密文，防止订单被伪造。
       *
       * 签名过程见 [百度电商开放平台：签名与验签。](https://dianshang.baidu.com/platform/doclist/index.html#!/doc/nuomiplus_2_base/sign_v2.md)
       */
      rsaSign: string;
      /**
       * 订单详细信息，需要是一个可解析为JSON Object的字符串。
       *
       * 字段内容见： [百度电商开放平台：收银台接入。](https://dianshang.baidu.com/platform/doclist/index.html#!/doc/nuomiplus_1_guide/mini_program_cashier/parameter.md)
       */
      bizInfo: string;
    }
  }
}
