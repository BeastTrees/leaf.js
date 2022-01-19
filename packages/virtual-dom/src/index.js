import { h, render } from "./renderer";

export function view(count) {
  const r = [...Array(count).keys()];
  return (
    <ul id="cool" className={`my-class-${count % 3}`}>
      {r.map((n) => (
        <li>
          {n.toString()} Row: {(count * n).toString()}
        </li>
      ))}
    </ul>
  );
}

render(document.querySelector("#leafjs-container"), view);
