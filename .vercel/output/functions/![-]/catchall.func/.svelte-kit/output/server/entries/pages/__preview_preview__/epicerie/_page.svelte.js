import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { S as SliceZone, c as components } from "../../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<h1 data-svelte-h="svelte-1jt1y4u">Pouet Pouet</h1> ${validate_component(SliceZone, "SliceZone").$$render(
    $$result,
    {
      slices: data.page.data.slices,
      components
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
