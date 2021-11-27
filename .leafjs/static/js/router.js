import LeafApp from "../../../src/LeafApp";
import Featured from "../../../src/pages/Featured";
import Homepage from "../../../src/pages/Homepage";

export default class Router {
    constructor() {
        const pathToRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

        const getParams = (match) => {
            const values = match.result.slice(1);
            const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

            return Object.fromEntries(keys.map((key, i) => { return [key, values[i]]; }));
        }

        this.navigateTo = (url) => {
            history.pushState(null, null, url);
            router();
        };

        const router = async () => {
            const routes = [
                { path: "/", view: Homepage },
                { path: "/featured", view: Featured },
                { path: "/user/:userid", view: Featured },
                // { path: "/featured", view: () => console.log("New Songs are Featured!") },
                // { path: "/settings", view: () => console.log("Setting some settings...") }
            ];

            const potentialMatches = routes.map(route => {
                return {
                    route: route,
                    result: location.pathname.match(pathToRegex(route.path))
                };
            });

            let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

            if (!match) {
                match = {
                    route: routes[0],
                    result: true
                };
            }

            const view = new match.route.view(getParams(match));

            document.querySelector("#__leafjs_content").replaceChildren(<LeafApp CurrentPage={await view.getHTML()} />);
        };

        /* EVENT HANDLER */
        window.addEventListener("popstate", router);

        document.addEventListener("DOMContentLoaded", (e) => {
            document.body.addEventListener("click", (e) => {
                if (e.target.matches("[router-link]")) {
                    e.preventDefault();
                    this.navigateTo(e.target.href);
                }
            })

            router();
        })
    }
}