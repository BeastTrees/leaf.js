import "./style.css";
import { h, render } from "@leaf/virtual-dom";

const app = document.querySelector("#app");

var i: number = 0;

function myElement() {
  i++;
  console.log("RENDER" + i);
  return h(
    "section",
    { id: "my-section" },
    h("h1", {}, "Hello Vite, from LeafJS! ", i, "th time"),
    h(
      "a",
      { href: "https://vitejs.dev/guide/features.html", target: "_blank" },
      "Documentation"
    )
  );
}

render(app, myElement);
