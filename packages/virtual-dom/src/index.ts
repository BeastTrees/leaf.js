export { h } from "./renderer";
import { createElement, tick } from "./renderer";

// The main render function
export function leafRender(el: Element, renderFunction: Function) {
  var oldNode = renderFunction();
  el.appendChild(createElement(oldNode));
  setTimeout(() => tick(el, 0, renderFunction, oldNode), 500);
}
