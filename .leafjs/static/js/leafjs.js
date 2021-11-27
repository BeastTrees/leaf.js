import Router from "./router.js";

export default class LeafJS {
    constructor() {
        this.router = new Router();
    }

    getRouter() {
        return this.router;
    }
}

const useLeafJS = new LeafJS();
Object.freeze(useLeafJS);

export { useLeafJS };