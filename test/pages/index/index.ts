
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
  animation: any;
}

interface IndexPage extends Page.Options {
  setData(
    data: { [key in keyof PageData]?: PageData[key] },
    callback?: () => void
  ): void;
}

class IndexPage implements Page {
  data: PageData = {
    name: 'index',
    animation: null
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
    const anim = swan.createAnimation();
    anim.width(100).height(200).step();
    this.setData({
      animation: anim.export()
    })
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
