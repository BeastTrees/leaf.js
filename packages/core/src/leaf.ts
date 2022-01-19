export function createApp(mainComponent: any): LeafApp {
  return new LeafApp(mainComponent);
}

export class LeafApp {
  mainComponent: any;

  constructor(mainComponent: any) {
    this.mainComponent = mainComponent;
  }

  use<A extends LeafAddon>(addon: new (...args: any[]) => A): LeafApp {
    let addonInstance = new addon(this);
    return this;
  }
}

export abstract class LeafAddon {
  readonly app: LeafApp;
  constructor(app: LeafApp) {
    this.app = app;
  }
}
