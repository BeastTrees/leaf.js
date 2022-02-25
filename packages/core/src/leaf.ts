export function createAppByID(mainComponentID: string): LeafApp {
  return new LeafApp(document.getElementById(mainComponentID));
}

export function createApp(mainComponent: Element): LeafApp {
  return new LeafApp(mainComponent);
}

export class LeafApp {
  mainComponent: Element;

  constructor(mainComponent: any) {
    this.mainComponent = mainComponent;
  }

  use<T extends LeafAddon>(addon: new (...args: any[]) => T): LeafApp {
    let addonInstance = new addon(this);
    return this;
  }

  render(renderer: Function, renderFunction: Function): void {
    renderer(this.mainComponent, renderFunction);
  }
}

export abstract class LeafAddon {
  readonly app: LeafApp;
  constructor(app: LeafApp) {
    this.app = app;
  }
}
