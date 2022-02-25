import "./style.css";

import { createAppByID } from "@leaf/core";
import { leafRender } from "@leaf/virtual-dom";

var i: number = 0;

function myElement() {
  i++;
  return (
    <section id="my-section">
      <h1>Hello Vite, from LeafJS! {i}th time</h1>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Documentation
      </a>
    </section>
  );
}

createAppByID("app").render(leafRender, myElement);
