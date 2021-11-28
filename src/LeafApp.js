import ViewContent from "../.leafjs/static/js/ViewContent";
import './style/styles.css';

function LeafApp({ CurrentPage }) {
  return (
    <>
      <div class="flex gap-x-2">
        <h1
          class="text-indigo-400 underline hover:text-indigo-600 cursor-pointer"
          onClick={() => console.log("HI")}
        >
          Home
        </h1>
        <h1 class="text-indigo-400 underline hover:text-indigo-600 cursor-pointer">
          Featured
        </h1>
      </div>

      <ViewContent PageContent={CurrentPage} />
    </>
  );
}

export default LeafApp;
