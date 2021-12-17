import { ViewContent } from "@leaf/core";
import "~/src/style/styles.css";
import leafJS from "~/src/assets/ljs_icon_2048.png";

function LeafApp({ CurrentPage }) {
  return (
    <>
      <div class="flex gap-x-2">
        <img src={leafJS} width="100" height="100" alt="" />
        <a
          class="text-indigo-400 underline hover:text-indigo-600 cursor-pointer"
          href="/"
          router-link
        >
          Home
        </a>
        <a
          class="text-indigo-400 underline hover:text-indigo-600 cursor-pointer"
          href="/featured"
          router-link
        >
          Featured
        </a>
      </div>

      <ViewContent PageContent={CurrentPage} />
    </>
  );
}

export default LeafApp;
