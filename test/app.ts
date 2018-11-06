App({
  onLaunch(options) {
    const { scene, query } = options;
    console.log('app onLaunch', scene, query);
  },
  onShow(options) {
    console.warn('app onShow', options)
  },
  onHide() {
    console.warn('app onHide')
  },
  globalData: {
    name: 'test'
  }
})

// 或者像下面这样用
interface MyApp extends App {}

class MyApp implements App {
  onLaunch(options: App.AppLaunchOrShowParam) {
    const { scene } = options;
    console.log('onLaunch', scene);
  }
  onShow() {
    console.log('onShow');
  }
  globalData = {
    name: 'demo'
  }
  priMethod() {
    // do something
    const map = swan.createMapContext('');
    map.includePoints({
      points: [],
      padding: [1, 2, 3, 4]
    })
    swan.onMemoryWarning((res) => {
      console.warn('onMemoryWarningReceive', res.level)
    })
  }
}

App(new MyApp());
