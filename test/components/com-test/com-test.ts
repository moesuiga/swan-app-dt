Component({
  properties: {
    tip: {
      type: String,
      value: 'a tip',
      observer(nv: string, ov: string) {
        console.log('new tip', nv);
        console.log('old tip', ov);
      }
    },
    nullTest: {
      type: null,
      value: null,
      observer(newVal: any, oldVal: any) {
        console.log(newVal, oldVal);
      }
    }
  },
  data: {
    componentName: 'com-test'
  },
  created() {
    console.log('created')
  },
  attached() {
    this.otherMethod(this.data.componentName);
  },
  ready() {
    console.log('component ready');
    this.setData({
      componentName: 'new name'
    })
  },
  detached() {
    console.log('detached');
  },
  methods: {
    tapTest() {
      console.log('tap test');
      this.otherMethod('')
      this.properties.nullTest
      this.triggerEvent('myevent', { name: this.data.componentName });
    },
    otherMethod(a: string) {
      console.log(a);
      this.dispatch('childMsg', { name: 'dispatch event' });
    }
  },
  messages: {
    childMsg(e) {
      console.log('child message', e.value)
    }
  }
})
