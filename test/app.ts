interface IMyApp extends IApp {}

class IMyApp implements IAppClass {
  onLaunch(options: AppShowOptions) {
    console.log(options.scene);
  }
}

App(new IMyApp())
