function testDecorator() {
  console.log('test decorator');
  return function (target: IndexPage, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target);
  }
}

interface IndexPage extends IPage {}

class IndexPage implements IPageClass {
  data: {
    props: string[]
    version: string
  } = {
    props: [],
    version: '1.0.0'
  }
  test: () => void;
  onLoad(options: swan.IData) {
    this.test = () => {
      console.log('this is a test method.')
    }
    // this.abc = 1;
    // this.noMethod();
  }

  @testDecorator()
  myMethod() {
    const { props } = this.data;
    props.push('first prop');
    this.setData({ props })
  }

  handleEvent(e: swan.IBaseEvent) {
    const { name } = e.currentTarget.dataset;
    console.log('name is ', name);
  }
}

Page(new IndexPage())
