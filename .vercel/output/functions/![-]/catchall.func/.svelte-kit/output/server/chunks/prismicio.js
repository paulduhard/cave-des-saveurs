import * as prismic from "@prismicio/client";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./state.svelte.js";
const enableAutoPreviews = (config2) => {
  if (!config2.cookies) {
    return;
  }
  const cookie = config2.cookies.get(prismic.cookie.preview);
  if (cookie && /\.prismic\.io/.test(cookie)) {
    config2.client.queryContentFromRef(cookie);
  }
};
const repositoryName$1 = "cave-des-saveurs";
const config = {
  repositoryName: repositoryName$1
};
const repositoryName = config.repositoryName;
const routes = [
  {
    type: "page",
    uid: "home",
    path: "/"
  },
  {
    type: "page",
    path: "/:uid"
  },
  {
    type: "cave",
    path: "/cave/:uid"
  },
  {
    type: "epicerie",
    path: "/epicerie"
  },
  {
    type: "vin",
    path: "/vin/:uid"
  }
];
const createClient = ({ cookies = void 0, ...config2 } = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config2
  });
  enableAutoPreviews({ client, cookies });
  return client;
};
export {
  createClient as c,
  repositoryName as r
};
