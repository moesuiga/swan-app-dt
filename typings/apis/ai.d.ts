/// <reference path="../apis.d.ts" />

// AI

declare namespace swan {
  namespace ai {
    type ImageObject = {
      /**
       * 图像资源地址
       */
      image: string;
    };
    type LogID = {
      /**
       * 唯一的log id，用于问题定位
       */
      log_id: string;
    };
    /**
     * 用户向服务请求识别身份证，身份证识别包括正面和背面。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#ocrIdCard
     */
    export function ocrIdCard(options: ocrIdCard.BaseOptions): void;
    namespace ocrIdCard {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 是否检测图像旋转角度，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括：true：检测旋转角度并矫正识别；false：不检测旋转角度，针对摆放情况不可控制的情况建议本参数置为true
           */
          detect_direction?: boolean;
          /**
           * - front：身份证含照片的一面
           * - back：身份证带国徽的一面
           */
          id_card_side?: string;
          /**
           * 是否开启身份证风险类型(身份证复印件、临时身份证、身份证翻拍、修改过的身份证)功能，默认不开启，即：false。可选值:true-开启；false-不开启
           */
          detect_risk?: boolean;
        };
      type SuccessParams = LogID & {
        /**
         * 图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度，2:逆时针180度，3:逆时针270度
         */
        direction: number;
        /**
         * - normal-识别正常；
         * - reversed_side-身份证正反面颠倒；
         * - non_idcard-上传的图片中不包含身份证；
         * - blurred-身份证模糊；
         * - other_type_card-其他类型证照；
         * - over_exposure-身份证关键字段反光或过曝；
         * - unknown-未知状态
         */
        image_status: string;
        /**
         * 输入参数 detect_risk = true 时，则返回该字段识别身份证类型:
         * - normal-正常身份证；
         * - copy-复印件；
         * - temporary-临时身份证；
         * - screen-翻拍；
         * - unknow-其他未知情况
         */
        risk_type: string;
        /**
         * 如果参数 detect_risk = true 时，则返回此字段。
         * 如果检测身份证被编辑过，该字段指定编辑软件名称，如:Adobe Photoshop CC 2014 (Macintosh),如果没有被编辑过则返回值无此参数
         */
        edit_tool: string;
        /**
         * 定位和识别结果数组
         */
        words_result: any[];
        /**
         * 识别结果数，表示words_result的元素个数
         */
        words_result_num: number;
        /**
         * 位置数组（坐标0点为左上角）
         */
        location: any[];
        /**
         * 表示定位位置的长方形左上顶点的水平坐标
         */
        left: number;
        /**
         * 表示定位位置的长方形左上顶点的垂直坐标
         */
        top: number;
        /**
         * 表示定位位置的长方形的宽度
         */
        width: number;
        /**
         * 表示定位位置的长方形的高度
         */
        height: number;
        /**
         * 识别结果字符串
         */
        words: string;
      };
    }

    /**
     * 识别银行卡并返回卡号、发卡行和卡片类型。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#ocrBankCard
     */
    export function ocrBankCard(options: ocrBankCard.BaseOptions): void;
    namespace ocrBankCard {
      type BaseOptions = ApiCallback<SuccessParams> & ImageObject;
      type SuccessParams = LogID & {
        /**
         * 返回结果
         */
        result: {
          /**
           * 银行卡卡号
           */
          bank_card_number: string;
          /**
           * 银行名，不能识别时为空
           */
          bank_name: string;
          /**
           * 银行卡类型，
           * - 0: 不能识别
           * - 1: 借记卡
           * - 2: 信用卡
           */
          bank_card_type: string;
        };
      };
    }

    /**
     * 对机动车驾驶证所有关键字段进行识别。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#ocrDrivingLicense
     */
    export function ocrDrivingLicense(
      options: ocrDrivingLicense.BaseOptions
    ): void;
    namespace ocrDrivingLicense {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 是否检测图像旋转角度，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:true：检测旋转角度并矫正识别；false：不检测旋转角度，针对摆放情况不可控制的情况建议本参数置为true。
           */
          detect_direction?: boolean;
          /**
           * true: 归一化格式输出；false 或无此参数按非归一化格式输出
           */
          unified_valid_period?: boolean;
        };
      type SuccessParams = LogID & {
        /**
         * 识别结果数，表示words_result的元素个数
         */
        words_result_num: number;
        /**
         * 识别结果数组
         */
        words_result: any[];
        /**
         * 识别结果字符串
         */
        words: string;
      };
    }

    /**
     * 对机动车行驶证正本所有关键字段进行识别。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#ocrVehicleLicense
     */
    export function ocrVehicleLicense(): void;
    namespace ocrVehicleLicense {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 是否检测图像旋转角度，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:true：检测旋转角度并矫正识别；false：不检测旋转角度，针对摆放情况不可控制的情况建议本参数置为true。
           */
          detect_direction?: boolean;
          /**
           * normal 使用快速服务，1200ms左右时延；缺省或其它值使用高精度服务，1600ms左右时延
           */
          accuracy?: string;
        };
      type SuccessParams = LogID & {
        /**
         * 识别结果数，表示words_result的元素个数
         */
        words_result_num: number;
        /**
         * 识别结果数组
         */
        words_result: any[];
        /**
         * 识别结果字符串
         */
        words: string;
      };
    }

    /**
     * 运用业界领先的深度学习技术，判断一段文本内容是否符合网络发文规范，实现自动化、智能化的文本审核。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#textReview
     */
    export function textReview(options: textReview.BaseOptions): void;
    namespace textReview {
      type BaseOptions = ApiCallback<SuccessParams> & {
        /**
         * 待审核文本，UTF-8，不可为空，不超过20000字节
         */
        content: string;
      };
      type SuccessParams = LogID & {
        /**
         * 审核结果详情
         */
        result: {
          /**
           * 请求中是否包含违禁，0表示非违禁，1表示违禁，2表示建议人工复审
           */
          spam: number;
          /**
           * 审核未通过的类别列表与详情
           */
          reject: any[];
          /**
           * 待人工复审的类别列表与详情
           */
          review: any[];
          /**
           * 审核通过的类别列表与详情
           */
          pass: any[];
          /**
           * 请求中的违禁类型
           * - 1: 暴恐违禁。
           * - 2: 文本色情。
           * - 3: 政治敏感。
           * - 4: 恶意推广。
           * - 5: 低俗辱骂。
           */
          label: number;
          /**
           * 违禁检测分，范围0~1，数值从低到高代表风险程度的高低
           */
          score: number;
          /**
           * 违禁类型对应命中的违禁词集合，可能为空
           */
          hit: any[];
        };
      };
    }

    /**
     * 将文本转换为可以播放的mp3文件。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#textToAudio
     */
    export function textToAudio(options: textToAudio.BaseOptions): void;
    namespace textToAudio {
      type BaseOptions = ApiCallback<SuccessParams> & {
        /**
         * 合成的文本，使用UTF-8编码。小于512个中文字或者英文数字。（文本在百度服务器内转换为GBK后，长度必须小于1024字节）
         */
        tex: string;
        /**
         * 客户端类型选择，web端填写固定值1
         */
        ctp: string;
        /**
         * 固定值zh。语言选择,目前只有中英文混合模式，填写固定值zh
         */
        lan: string;
        /**
         * 语速，取值0-9，默认为5中语速
         */
        spd?: string;
        /**
         * 音调，取值0-9，默认为5中语调
         */
        pit?: string;
        /**
         * 音量，取值0-9，默认为5中音量
         */
        vol?: string;
        /**
         * 发音人选择,
         * - 0为普通女声，
         * - 1为普通男生，
         * - 3为情感合成-度逍遥，
         * - 4为情感合成-度丫丫，
         *
         * 默认为普通女声
         */
        per?: string;
      };
      type SuccessParams = {
        data: obj & {
          /**
           * 合成语音的地址
           */
          filePath: string;
        };
      };
    }

    /**
     * 自定义图像审核。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#imageAudit
     */
    export function imageAudit(options: imageAudit.BaseOptions): void;
    namespace imageAudit {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 网图URL地址，以网图形式请求，图片Url需要做UrlEncode。不能与image并存。
           */
          imgUrl?: string;
        };
      type SuccessParams = {
        /**
         * 请求唯一id
         */
        log_id: number;
        /**
         * 审核结果描述，成功才返回，失败不返回
         */
        conclusion: string;
        /**
         * 审核结果标识，成功才返回，失败不返回
         *
         * 参数说明
         * - 1: 合规
         * - 2: 不合规
         * - 3: 疑似
         * - 4: 审核失败
         */
        conclusionType: number;
        /**
         * 审核项详细信息，响应成功并且conclusion为疑似或不合规时才返回，响应失败或conclusion为合规是不返回。
         */
        data: any[];
        /**
         * 审核类型，1：色情、2：性感、3：暴恐、4:恶心、5：水印码、6：二维码、7：条形码、8：政治人物、9：敏感词、10：自定义敏感词
         */
        type: number;
        /**
         * 不合规项描述信息
         */
        msg: string;
        /**
         * 不合规项置信度
         */
        probability: number;
        /**
         * 政治人物列表数组，只有政治人物审核不通过才有
         */
        stars: any[];
        /**
         * 审核不通过敏感词，只有敏感词审核不通过才有
         */
        words: string;
      };
    }

    /**
     * 通用物体及场景识别，即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片中的多个物体及场景标签。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#advancedGeneralIdentify
     */
    export function advancedGeneralIdentify(
      options: advancedGeneralIdentify.BaseOptions
    ): void;
    namespace advancedGeneralIdentify {
      type BaseOptions = ApiCallback<SuccessParams> & ImageObject;
      type SuccessParams = {
        /**
         * 唯一的log id，用于问题定位
         */
        log_id: number;
        /**
         * 返回结果数目，及result数组中的元素个数
         */
        result_num: number;
        /**
         * 标签结果数组
         */
        result: any[];
        /**
         * 图片中的物体或场景名称
         */
        keyword: string;
        /**
         * 置信度，0-1
         */
        score: number;
        /**
         * 识别结果的上层标签，有部分钱币、动漫、烟酒等tag无上层标签
         */
        root: string;
      };
    }

    /**
     * 用户向服务请求检测图像中的主体位置。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#objectDetectIdentify
     */
    export function objectDetectIdentify(
      options: objectDetectIdentify.BaseOptions
    ): void;
    namespace objectDetectIdentify {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 如果检测主体是人，主体区域是否带上人脸部分，
           * - 0-不带人脸区域，
           * - 其他-带人脸区域，
           *
           * 裁剪类需求推荐带人脸，检索/识别类需求推荐不带人脸。
           * 默认取1，带人脸。
           */
          with_face?: number;
        };
      /**
       * @todo 感觉这个参数说明写错了，字段与说明和识别菜品的接口一样
       */
      type SuccessParams = {
        /**
         * 唯一的log id，用于问题定位
         */
        log_id: number;
        /**
         * 返回结果数目，及result数组中的元素个数
         */
        result_num: number;
        /**
         * 菜品识别结果数组
         */
        result: any[];
        /**
         * 菜名，示例：鱼香肉丝
         */
        name: string;
        /**
         * 卡路里，每100g的卡路里含量
         */
        calorie: number;
        /**
         * 识别结果中每一行的置信度值，0-1
         */
        probability: number;
      };
    }

    /**
     * 用于检测一张车辆图片的具体车型，即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片的车辆品牌及型号、颜色及年份、位置信息。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#carClassify
     */
    export function carClassify(options: carClassify.BaseOptions): void;
    namespace carClassify {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 返回结果top n,默认5
           */
          top_num?: number;
        };
      type SuccessParams = {
        /**
         * 唯一的log id，用于问题定位
         */
        log_id: number;
        /**
         * 颜色
         */
        color_result: string;
        /**
         * 车型识别结果数组
         */
        result: Result[];
        /**
         * 车在图片中的位置信息
         */
        location_result: {
          /**
           * 左起像素位置
           */
          left: number;
          /**
           * 上起像素位置
           */
          top: number;
          /**
           * 像素宽
           */
          width: number;
          /**
           * 像素高
           */
          height: number;
        };
      };
      interface Result {
        /**
         * 车型名称，示例：宝马x6
         */
        name: string;
        /**
         * 置信度，示例：0.5321
         */
        score: number;
        /**
         * 年份
         */
        year: string;
      }
    }

    /**
     * 用于菜品识别，即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片的菜品名称、卡路里信息、置信度。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#dishClassify
     */
    export function dishClassify(options: dishClassify.BaseOptions): void;
    namespace dishClassify {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 返回结果top n,默认5
           */
          top_num?: number;
          /**
           * 默认0.95，可以通过该参数调节识别效果，降低非菜识别率
           */
          filter_threshold: number;
        };
      type SuccessParams = {
        /**
         * 唯一的log id，用于问题定位
         */
        log_id: number;
        /**
         * 返回结果数目，及result数组中的元素个数
         */
        result_num: number;
        /**
         * 菜品识别结果数组
         */
        result: {
          /**
           * 菜名，示例：鱼香肉丝
           */
          name: string;
          /**
           * 卡路里，每100g的卡路里含量
           */
          calorie: number;
          /**
           * 识别结果中每一行的置信度值，0-1
           */
          probability: number;
        }[];
      };
    }

    /**
     * 用于检测和识别图片中的品牌LOGO信息。即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片中LOGO的名称、位置和置信度。 当效果欠佳时，可以建立子库（在控制台创建应用并申请建库）并通过调用logo入口接口完成自定义logo入库，提高识别效果。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#logoClassify
     */
    export function logoClassify(options: logoClassify.BaseOptions): void;
    namespace logoClassify {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 是否只检索用户子库，true则只检索用户子库，false(默认)为检索底库+用户子库
           */
          custom_lib?: boolean;
        };
      type SuccessParams = {
        /**
         * 唯一的log id，用于问题定位
         */
        log_id: number;
        /**
         * 识别结果数，标识返回结果数目
         */
        result_num: number;
        /**
         * 返回结果数组，每一项为一个识别出的logo
         */
        result: {
          /**
           * ype=0 为1千种高优商标识别结果；
           * type=1 为2万类logo库的结果；
           * 其它type为自定义logo库结果。
           */
          type: number;
          /**
           * 识别的品牌名称
           */
          name: string;
          /**
           * 分类结果置信度（0–1.0）
           */
          probability: number;
          /**
           * 位置信息（左起像素位置、上起像素位置、像素宽、像素高）
           */
          location: {
            /**
             * 坐起像素位置
             */
            left: number;
            /**
             * 上起像素位置
             */
            top: number;
            /**
             * 像素宽
             */
            width: number;
            /**
             * 像素高
             */
            height: number;
          };
        }[];
      };
    }

    /**
     * 该请求用于识别一张图片，即对于输入的一张图片（可正常解码，且长宽比较合适），输出动物识别结果。
     * @see https://smartapp.baidu.com/docs/develop/api/ai/#animalClassify
     */
    export function animalClassify(options: animalClassify.BaseOptions): void;
    namespace animalClassify {
      type BaseOptions = ApiCallback<SuccessParams> &
        ImageObject & {
          /**
           * 返回预测得分top结果数，默认为6
           */
          top_num?: number;
        };
      type SuccessParams = {
        /**
         * 唯一的log id，用于问题定位
         */
        log_id: number;
        /**
         * 识别结果数组
         */
        result: {
          /**
           * 动物名称，示例：蒙古马
           */
          name: string;
          /**
           * 置信度，示例：0.5321
           */
          score: number;
        }[];
      };
    }

    /**
     * 该请求用于识别一张图片，即对于输入的一张图片（可正常解码，且长宽比较合适），输出植物识别结果。
     * @see https://smartapp.baidu.com/docs/develop/api/ai_classify/#plantClassify/
     */
    export function plantClassify(options: plantClassify.BaseOptions): void;
    namespace plantClassify {
      type BaseOptions = ApiCallback<SuccessParams> & {
        /**
         * 图像资源地址
         */
        image: string;
      }
      type SuccessParams = {
        log_id: number;
        result: Result[];
      }
      interface Result {
        /**
         * 植物名称，示例：吉娃莲。
         */
        name: string;
        /**
         * 置信度，示例：0.5321。
         */
        score: number;
      }
    }
  }
}
