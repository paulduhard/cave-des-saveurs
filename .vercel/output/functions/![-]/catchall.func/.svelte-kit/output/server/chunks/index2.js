import "./state.svelte.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import { w as writable } from "./index.js";
import { g as getContext } from "./ssr.js";
function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
const stores = {
  updated: /* @__PURE__ */ create_updated_store()
};
({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get data() {
    return context().page.data;
  },
  get params() {
    return context().page.params;
  }
};
const page = page$1;
export {
  page as p
};
