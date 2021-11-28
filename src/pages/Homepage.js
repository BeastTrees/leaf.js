import AbstractView from "~/.leafjs/static/js/AbstractView";
import { useLeafJS } from "~/.leafjs/static/js/leafjs";

export default class Homepage extends AbstractView {
  constructor(params) {
    super(params);
    console.log(params);
    console.log(useLeafJS.getRouter());
    this.setTitle("Homepage");
  }

  async getHTML() {
    return (
      <>
        <h2 class="font-mono text-blue-400 text-center"> Welcome back,</h2>{" "}
        <h1>Lixou :D</h1>
        <p>
          Lixou is cool or something like that so smash like, gamerssssssssss!
          :)
        </p>
        <p>
          <a href="/featured" router-link class="font-bold">
            Hear new Songs!
          </a>
        </p>
      </>
    );
  }
}
