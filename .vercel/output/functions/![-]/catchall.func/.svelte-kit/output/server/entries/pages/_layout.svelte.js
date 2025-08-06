import { c as create_ssr_component, a as add_attribute, v as validate_component, e as escape, b as each } from "../../chunks/ssr.js";
import { getToolbarSrc } from "@prismicio/client";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/state.svelte.js";
import { p as page } from "../../chunks/index2.js";
import { r as repositoryName } from "../../chunks/prismicio.js";
import { P as PrismicImage, a as PrismicLink } from "../../chunks/PrismicLink.js";
const PrismicPreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let toolbarSrc;
  let { repositoryName: repositoryName2 } = $$props;
  let { routePrefix = "preview" } = $$props;
  let { routePrefixName = routePrefix } = $$props;
  if ($$props.repositoryName === void 0 && $$bindings.repositoryName && repositoryName2 !== void 0) $$bindings.repositoryName(repositoryName2);
  if ($$props.routePrefix === void 0 && $$bindings.routePrefix && routePrefix !== void 0) $$bindings.routePrefix(routePrefix);
  if ($$props.routePrefixName === void 0 && $$bindings.routePrefixName && routePrefixName !== void 0) $$bindings.routePrefixName(routePrefixName);
  toolbarSrc = getToolbarSrc(repositoryName2);
  return `${$$result.head += `<!-- HEAD_svelte-92dhp6_START --><script defer${add_attribute("src", toolbarSrc, 0)}><\/script><!-- HEAD_svelte-92dhp6_END -->`, ""}`;
});
const ExtLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="14" height="16" viewBox="0 0 14 16" fill="#000000" xmlns="http://www.w3.org/2000/svg"><path d="M8.82184 15.7544H2.6583C1.92882 15.7544 1.25459 15.4526 0.759514 14.9048C0.269799 14.3627 0 13.6265 0 12.8322V6.00858C0 5.2143 0.269799 4.47812 0.759514 3.936C1.25459 3.38823 1.92882 3.08643 2.6583 3.08643H5.44372C5.6513 3.08643 5.81919 3.263 5.81919 3.48131C5.81919 3.69963 5.6513 3.8762 5.44372 3.8762H2.6583C1.57106 3.8762 0.750932 4.7929 0.750932 6.00858V12.8322C0.750932 14.0479 1.57106 14.9646 2.6583 14.9646H8.82184C9.87368 14.9646 10.7292 14.0079 10.7292 12.8322V9.09829C10.7292 8.87997 10.8971 8.7034 11.1047 8.7034C11.3123 8.7034 11.4801 8.87997 11.4801 9.09829V12.8322C11.4801 14.4434 10.2878 15.7544 8.82184 15.7544Z"></path><path d="M6.51164 9.06973C6.30352 9.06973 6.0954 8.98511 5.93771 8.81644C5.62607 8.48304 5.6309 7.94712 5.9479 7.61993L12.1367 1.22503C12.4537 0.897275 12.9632 0.902352 13.2743 1.23575C13.5854 1.56915 13.5811 2.10506 13.2641 2.43225L7.07483 8.82715C6.91821 8.98906 6.71439 9.06973 6.5111 9.06973H6.51164Z"></path><path d="M12.9176 8.84106C12.4735 8.84106 12.113 8.46197 12.113 7.99487V2.44615H6.5116C6.06748 2.44615 5.70703 2.06706 5.70703 1.59997C5.70703 1.13288 6.06694 0.753784 6.5116 0.753784H12.9176C13.3617 0.753784 13.7222 1.13288 13.7222 1.59997V7.99487C13.7222 8.46197 13.3617 8.84106 12.9176 8.84106Z"></path></svg>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { settings } = $$props;
  let { regions = [] } = $$props;
  let { colors = [] } = $$props;
  if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0) $$bindings.settings(settings);
  if ($$props.regions === void 0 && $$bindings.regions && regions !== void 0) $$bindings.regions(regions);
  if ($$props.colors === void 0 && $$bindings.colors && colors !== void 0) $$bindings.colors(colors);
  return `<header class="sticky top-0 z-50 flex min-h-[85px] items-center justify-between gap-12 bg-secondary px-12 transition-all duration-300 hover:z-50"><a href="/">${validate_component(PrismicImage, "PrismicImage").$$render($$result, { field: settings.data.logo_header }, {}, {})}</a> <button class="block lg:hidden" data-svelte-h="svelte-1ag8qdi"> <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg></button> <nav class="hidden lg:ml-auto lg:flex lg:items-center xl:mr-40" aria-label="Header"><span class="sr-only">${escape(settings.data.site_title)} page d&#39;accueil</span> <ul class="flex content-center gap-16 md:gap-6">${each(settings.data.navigation, (item, index) => {
    return `<li class="relative uppercase hover:underline">${item.external_link ? `${validate_component(PrismicLink, "PrismicLink").$$render(
      $$result,
      {
        field: item.link,
        class: "flex items-center gap-2 hover:bg-secondary hover:text-primary"
      },
      {},
      {
        default: () => {
          return `${escape(item.label)} ${validate_component(ExtLink, "ExtLink").$$render($$result, {}, {}, {})} <span class="sr-only" data-svelte-h="svelte-r1a84w">External link</span> `;
        }
      }
    )}` : `${index === 1 ? `<button class="cursor-pointer uppercase">${escape(item.label)} </button>` : `${validate_component(PrismicLink, "PrismicLink").$$render($$result, { field: item.link }, {}, {
      default: () => {
        return `${escape(item.label)} `;
      }
    })}`}`} </li>`;
  })}</ul></nav></header> ${``} ${``}`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { settings } = $$props;
  if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0) $$bindings.settings(settings);
  return `<footer class="flex flex-col items-center md:flex-row"><nav class="w-full bg-primary md:min-h-80" aria-label="Footer"><span class="sr-only">${escape(settings.data.site_title)} page d&#39;accueil</span> <ul>${each(settings.data.navigation, (item) => {
    return `<li>${validate_component(PrismicLink, "PrismicLink").$$render(
      $$result,
      {
        field: item.link,
        class: "inline-flex min-h-11 items-center text-secondary"
      },
      {},
      {
        default: () => {
          return `${escape(item.label)} `;
        }
      }
    )} </li>`;
  })}</ul></nav> <aside class="flex min-w-96 flex-col justify-center gap-4 bg-[#f0efed] px-4 py-6 text-[15px] md:absolute md:right-0 md:mr-12"><a href="/" class="flex justify-center gap-2">${validate_component(PrismicImage, "PrismicImage").$$render($$result, { field: settings.data.logo_footer }, {}, {})} <div class="text-black font-['Sofia Pro'] h-7 w-[216px] text-[23px] font-light" data-svelte-h="svelte-1lljf3j">la Cave des Saveurs</div></a> <div class="text-center" data-svelte-h="svelte-dg7xk0"><span class="text-black font-['Sofia Pro'] font-normal">La Cave des Saveurs : vins et épicerie fine en Arles<br></span> <span class="text-black font-['Sofia Pro'] font-bold">L&#39;abus d&#39;alcool est dangereux pour la santé. <br> À consommer avec modération.</span> <div class="mt-4 flex justify-center gap-2"><div class="text-black font-['Sofia Pro'] font-normal underline">Mentions légales</div> <div style="text-black font-normal font-['Sofia Pro']">| Illustrations non contractuelles</div></div></div></aside></footer>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-qtsqyu_START -->${$$result.title = `<title>${escape(page.data.title)}</title>`, ""}${page.data.meta_description ? `<meta name="description"${add_attribute("content", page.data.meta_description, 0)}>` : ``}${page.data.meta_title ? `<meta name="og:title"${add_attribute("content", page.data.meta_title, 0)}>` : ``}${page.data.meta_image ? `<meta name="og:image"${add_attribute("content", page.data.meta_image.url, 0)}> <meta name="twitter:card" content="summary_large_image">` : ``}<!-- HEAD_svelte-qtsqyu_END -->`, ""} ${validate_component(Header, "Header").$$render(
    $$result,
    {
      settings: data.settings,
      regions: data.regions,
      colors: data.colors
    },
    {},
    {}
  )} <main>${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer").$$render($$result, { settings: page.data.settings }, {}, {})} ${validate_component(PrismicPreview, "PrismicPreview").$$render($$result, { repositoryName }, {}, {})}`;
});
export {
  Layout as default
};
