
Page({
  data: {
    name: 'index'
  },
  onLoad(options) {
    this.setData({
      name: 'other name'
    });
    swan.request({
      url: 'request:url',
      data: {
        key: 'value'
      },
      method: 'GET',
      success(res) {
        console.log('request success::', res);
      },
      fail(error) {
        console.error('request fail::', error);
      }
    })
  },
  customMethod() {
    const { name } = this.data;
    name.toUpperCase();
  }
});

// 建议使用如下用法
interface PageData {
  name: string;
}

interface IndexPage extends Page.Options {
  setData(
    data: { [key in keyof PageData]?: PageData[key] },
    callback?: () => void
  ): void;
}

class IndexPage implements Page {
  data: PageData = {
    name: 'index'
  }
  onLoad(options: obj) {
    this.setData({
      name: 'must be string',
      // name: false
      // error: true
    });
    swan.request({
      url: 'request:url',
      data: {
        key: 'value'
      },
      method: 'GET',
      success(res) {
        console.log('request success::', res);
      },
      fail(error) {
        console.error('request fail::', error);
      }
    })
  }
  customMethod() {
    const { name } = this.data;
    name.toUpperCase();
  }
  pay() {
    swan.requestPolymerPayment({
      orderInfo: {
        dealId: '',
        dealTitle: '',
        totalAmount: '23',
        tpOrderId: 'a',
        appKey: '',
        rsaSign: '',
        bizInfo: ''
      }
    })
  }
}

Page(new IndexPage());
