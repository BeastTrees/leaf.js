import ViewContent from "~/.leafjs/static/js/ViewContent";
import "~/src/style/styles.css";

function LeafApp({ CurrentPage }) {
  return (
    <>
      <div class="flex gap-x-2">
        <a
          class="text-indigo-400 underline hover:text-indigo-600 cursor-pointer"
          href="/" router-link
        >
          Home
        </a>
        <a
          class="text-indigo-400 underline hover:text-indigo-600 cursor-pointer"
          href="/featured" router-link
        >
          Featured
        </a>
      </div>

      <ViewContent PageContent={CurrentPage} />
    </>
  );
}

export default LeafApp;
