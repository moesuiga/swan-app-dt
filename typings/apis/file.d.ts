/// <reference path="./index.d.ts" />

// 文件

declare namespace swan {
  // ======== 保存、获取文件 ======== //
  /**
   * 保存文件到本地
   *
   * @attention `saveFile` 会把临时文件移动，
   * 因此调用成功后传入的 `tempFilePath` 将不可用。
   *
   * @description 本地文件存储的大小限制为 `10M`。
   */
  export function saveFile(options: saveFile.Options): void;
  namespace saveFile {
    type Options = {
      /**
       * 需要保存的文件的临时路径
       */
      tempFilePath: string;
    } & ApiCallback<SuccessOptions>;
    type SuccessOptions = {
      /**
       * 文件的保存路径
       */
      savedFilePath: string;
    }
  }

  /**
   * 获取文件信息
   */
  export function getFileInfo(): void;
  namespace getFileInfo {
    type Options = {
      /**
       * 本地文件路径
       */
      filePath: string;
      /**
       * 计算文件摘要的算法，默认值 md5，有效值：md5，sha1。
       */
      digestAlgorithm?: 'md5' | 'sha1';
    } & ApiCallback<SuccessOptions>;

    type SuccessOptions = {
      /**
       * 文件大小，单位：B。
       */
      size: number;
      /**
       * 按照传入的 digestAlgorithm 计算得出的的文件摘要。
       */
      digest: string;
    }
  }

  /**
   * 获取本地已保存的文件列表
   */
  export function getSavedFileList(options: ApiCallback<getSavedFileList.FileList[]>): void;
  namespace getSavedFileList {
    interface FileList {
      /**
       * 文件的本地路径
       */
      filePath: string;
      /**
       * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数。
       */
      createTime: number;
      /**
       * 文件大小，单位 B
       */
      size: number;
    }
  }

  /**
   * 获取本地文件的文件信息。
   * 此接口只能用于获取已保存到本地的文件，
   * 若需要获取临时文件信息，请使用 getFileInfo 接口。
   */
  export function getSavedFileInfo(options: getSavedFileInfo.Options): void;
  namespace getSavedFileInfo {
    type Options = {
      /**
       * 文件路径
       */
      filePath: string;
    } & ApiCallback<SuccessOptions>;

    type SuccessOptions = {
      /**
       * 文件大小，单位B
       */
      size: number;
      /**
       * 文件保存时的时间戳，从1970/01/01 08:00:00 到该时刻的秒数。
       */
      createTime: number;
    }
  }

  // ======== 删除文件 ======== //
  /**
   * 删除本地存储的文件
   */
  export function removeSavedFile(options: removeSavedFile.Options): void;
  namespace removeSavedFile {
    type Options = {
      /**
       * 需要删除的文件路径
       */
      filePath: string;
    } & ApiCallback
  }

  // ======== 打开新的文件页面 ======== //
  /**
   * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx。
   */
  export function openDocument(options: openDocument.Options): void;
  namespace openDocument {
    type Options = {
      /**
       * 文件路径，可通过 downloadFile 获得
       */
      filePath: string;
      /**
       * 文件类型，指定文件类型打开文件，
       * 有效值 doc, xls, ppt, pdf, docx, xlsx, pptx。
       */
      fileType?:
        | 'doc'
        | 'xls'
        | 'ppt'
        | 'pdf'
        | 'docx'
        | 'xlsx'
        | 'pptx'
    } & ApiCallback;
  }
}
