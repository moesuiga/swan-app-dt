
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

    const query = swan.createSelectorQuery();
    query.select('#test').boundingClientRect((rect) => {
      rect.dataset;
      rect.width;
      rect.right;
    }).exec((rects) => {
      rects.forEach((rect) => {
        rect.id;
        rect.left;
        rect.top;
        rect.scrollLeft;
      })
    });

    query.selectAll('.all').boundingClientRect((rects) => {
      rects.forEach((rect) => {
        rect.id;
        rect.height;
      })
    }).exec();
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
  call(phone: string) {
    swan.makePhoneCall({
      phoneNumber: phone
    })
  }
}

Page(new IndexPage());
