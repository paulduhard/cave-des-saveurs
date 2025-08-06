import { c as create_ssr_component, b as each, v as validate_component, m as missing_component, a as add_attribute, e as escape } from "./ssr.js";
import { isFilled } from "@prismicio/client";
import { a as PrismicLink, P as PrismicImage } from "./PrismicLink.js";
import { P as PrismicRichText } from "./PrismicRichText.js";
const TodoComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  "slice_type" in slice ? slice.slice_type : slice.type;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  return `${``}`;
});
const SliceZone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slices = [] } = $$props;
  let { components: components2 = {} } = $$props;
  let { context = {} } = $$props;
  let { defaultComponent = void 0 } = $$props;
  if ($$props.slices === void 0 && $$bindings.slices && slices !== void 0) $$bindings.slices(slices);
  if ($$props.components === void 0 && $$bindings.components && components2 !== void 0) $$bindings.components(components2);
  if ($$props.context === void 0 && $$bindings.context && context !== void 0) $$bindings.context(context);
  if ($$props.defaultComponent === void 0 && $$bindings.defaultComponent && defaultComponent !== void 0) $$bindings.defaultComponent(defaultComponent);
  return ` ${each(slices, (slice, index) => {
    let type = "slice_type" in slice ? slice.slice_type : slice.type, Component = components2[type] || defaultComponent;
    return `  ${Component ? `${slice.__mapped ? (() => {
      let { __mapped, ...mappedProps } = slice;
      return ` ${validate_component(Component || missing_component, "svelte:component").$$render($$result, Object.assign({}, mappedProps), {}, {})}`;
    })() : `${validate_component(Component || missing_component, "svelte:component").$$render($$result, { slice, slices, context, index }, {}, {})}`}` : `${validate_component(TodoComponent, "TodoComponent").$$render($$result, { slice }, {}, {})}`}`;
  })}`;
});
function isExternalLink(url) {
  const regex = /^(https?:)?\/\//i;
  return regex.test(url);
}
const css$4 = {
  code: "section.svelte-1nhfcg4 p,section.svelte-1nhfcg4 a{color:white}section.svelte-1nhfcg4 a{border:0.5px solid white;padding:0.3rem 2.5rem}@media(min-width: 1280px){section.svelte-1nhfcg4 a{padding-inline:3rem;padding-block:0.3rem 0.5rem}}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n\\timport { PrismicRichText, PrismicLink } from '@prismicio/svelte';\\n\\timport { isFilled } from '@prismicio/client';\\n\\timport { isExternalLink } from '../../functions.js';\\n\\n\\t/** @type {import(\\"@prismicio/client\\").Content.BannerEventSlice} */\\n\\texport let slice;\\n<\/script>\\n\\n{#if slice.variation === 'default'}\\n\\t<section\\n\\t\\tdata-slice-type={slice.slice_type}\\n\\t\\tdata-slice-variation={slice.variation}\\n\\t\\tclass=\\"flex h-0 flex-col justify-center gap-4 bg-primary py-7 text-center md:flex-row md:items-center md:gap-6 md:py-4\\"\\n\\t>\\n\\t\\t<div class=\\"font-light md:text-xl\\">\\n\\t\\t\\t{#if isFilled.richText(slice.primary.text)}\\n\\t\\t\\t\\t<PrismicRichText field={slice.primary.text} />\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<p class=\\"text-gray-400\\">No content available</p>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t\\t<div class=\\"text-sm font-thin tracking-wider\\">\\n\\t\\t\\t{#if isFilled.link(slice.primary.link)}\\n\\t\\t\\t\\t{#if isExternalLink(slice.primary.link.url)}\\n\\t\\t\\t\\t\\t<PrismicLink\\n\\t\\t\\t\\t\\t\\tfield={slice.primary.link}\\n\\t\\t\\t\\t\\t\\tclass=\\"group transition-all duration-700 hover:bg-secondary hover:text-primary\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{slice.primary.label}\\n\\t\\t\\t\\t\\t\\t<img\\n\\t\\t\\t\\t\\t\\t\\tsrc=\\"/assets/icone-external-link.svg\\"\\n\\t\\t\\t\\t\\t\\t\\talt=\\"lien externe\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"mb-1 ml-2 inline h-4 w-4 group-hover:filter-secondary\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</PrismicLink>\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<PrismicLink\\n\\t\\t\\t\\t\\t\\tfield={slice.primary.link}\\n\\t\\t\\t\\t\\t\\tclass=\\"transition-all duration-700 hover:bg-secondary hover:text-primary\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{slice.primary.label}\\n\\t\\t\\t\\t\\t</PrismicLink>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<p class=\\"text-gray-400\\">No link available</p>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</section>\\n{:else if slice.variation === 'bannerEventXl'}\\n\\t<section\\n\\t\\tdata-slice-type={slice.slice_type}\\n\\t\\tdata-slice-variation={slice.variation}\\n\\t\\tclass=\\"flex flex-col justify-center gap-4 bg-primary py-7 text-center md:flex-row md:items-center md:gap-6\\"\\n\\t>\\n\\t\\t<div class=\\"font-light md:text-4xl\\">\\n\\t\\t\\t{#if isFilled.richText(slice.primary.text)}\\n\\t\\t\\t\\t<PrismicRichText field={slice.primary.text} />\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<p class=\\"text-gray-400\\">No content available</p>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t\\t<div class=\\"mt-2 text-sm font-thin tracking-wider\\">\\n\\t\\t\\t{#if isFilled.link(slice.primary.link)}\\n\\t\\t\\t\\t{#if isExternalLink(slice.primary.link.url)}\\n\\t\\t\\t\\t\\t<PrismicLink\\n\\t\\t\\t\\t\\t\\tfield={slice.primary.link}\\n\\t\\t\\t\\t\\t\\tclass=\\"group transition-all duration-700 hover:bg-secondary hover:text-primary\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{slice.primary.label}\\n\\t\\t\\t\\t\\t\\t<img\\n\\t\\t\\t\\t\\t\\t\\tsrc=\\"/assets/icone-external-link.svg\\"\\n\\t\\t\\t\\t\\t\\t\\talt=\\"lien externe\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"mb-1 ml-2 inline h-4 w-4 transition-all duration-700 group-hover:filter-secondary\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</PrismicLink>\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<PrismicLink field={slice.primary.link} class=\\"hover:bg-secondary hover:text-primary\\">\\n\\t\\t\\t\\t\\t\\t{slice.primary.label}\\n\\t\\t\\t\\t\\t</PrismicLink>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<p class=\\"text-gray-400\\">No link available</p>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</section>\\n{/if}\\n\\n<style>\\n\\tsection :global(p),\\n\\tsection :global(a) {\\n\\t\\tcolor: white;\\n\\t}\\n\\tsection :global(a) {\\n\\t\\tborder: 0.5px solid white;\\n\\t\\tpadding: 0.3rem 2.5rem;\\n\\t}\\n\\n\\t@media (min-width: 1280px) {\\n\\t\\tsection :global(a) {\\n\\t\\t\\tpadding-inline: 3rem;\\n\\t\\t\\tpadding-block: 0.3rem 0.5rem;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyFC,sBAAO,CAAS,CAAE,CAClB,sBAAO,CAAS,CAAG,CAClB,KAAK,CAAE,KACR,CACA,sBAAO,CAAS,CAAG,CAClB,MAAM,CAAE,KAAK,CAAC,KAAK,CAAC,KAAK,CACzB,OAAO,CAAE,MAAM,CAAC,MACjB,CAEA,MAAO,YAAY,MAAM,CAAE,CAC1B,sBAAO,CAAS,CAAG,CAClB,cAAc,CAAE,IAAI,CACpB,aAAa,CAAE,MAAM,CAAC,MACvB,CACD"}`
};
const Evenements = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  $$result.css.add(css$4);
  return `${slice.variation === "default" ? `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)} class="flex h-0 flex-col justify-center gap-4 bg-primary py-7 text-center md:flex-row md:items-center md:gap-6 md:py-4 svelte-1nhfcg4"><div class="font-light md:text-xl">${isFilled.richText(slice.primary.text) ? `${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.text }, {}, {})}` : `<p class="text-gray-400" data-svelte-h="svelte-14tgr2u">No content available</p>`}</div> <div class="text-sm font-thin tracking-wider">${isFilled.link(slice.primary.link) ? `${isExternalLink(slice.primary.link.url) ? `${validate_component(PrismicLink, "PrismicLink").$$render(
    $$result,
    {
      field: slice.primary.link,
      class: "group transition-all duration-700 hover:bg-secondary hover:text-primary"
    },
    {},
    {
      default: () => {
        return `${escape(slice.primary.label)} <img src="/assets/icone-external-link.svg" alt="lien externe" class="mb-1 ml-2 inline h-4 w-4 group-hover:filter-secondary">`;
      }
    }
  )}` : `${validate_component(PrismicLink, "PrismicLink").$$render(
    $$result,
    {
      field: slice.primary.link,
      class: "transition-all duration-700 hover:bg-secondary hover:text-primary"
    },
    {},
    {
      default: () => {
        return `${escape(slice.primary.label)}`;
      }
    }
  )}`}` : `<p class="text-gray-400" data-svelte-h="svelte-1lzpmtv">No link available</p>`}</div></section>` : `${slice.variation === "bannerEventXl" ? `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)} class="flex flex-col justify-center gap-4 bg-primary py-7 text-center md:flex-row md:items-center md:gap-6 svelte-1nhfcg4"><div class="font-light md:text-4xl">${isFilled.richText(slice.primary.text) ? `${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.text }, {}, {})}` : `<p class="text-gray-400" data-svelte-h="svelte-14tgr2u">No content available</p>`}</div> <div class="mt-2 text-sm font-thin tracking-wider">${isFilled.link(slice.primary.link) ? `${isExternalLink(slice.primary.link.url) ? `${validate_component(PrismicLink, "PrismicLink").$$render(
    $$result,
    {
      field: slice.primary.link,
      class: "group transition-all duration-700 hover:bg-secondary hover:text-primary"
    },
    {},
    {
      default: () => {
        return `${escape(slice.primary.label)} <img src="/assets/icone-external-link.svg" alt="lien externe" class="mb-1 ml-2 inline h-4 w-4 transition-all duration-700 group-hover:filter-secondary">`;
      }
    }
  )}` : `${validate_component(PrismicLink, "PrismicLink").$$render(
    $$result,
    {
      field: slice.primary.link,
      class: "hover:bg-secondary hover:text-primary"
    },
    {},
    {
      default: () => {
        return `${escape(slice.primary.label)}`;
      }
    }
  )}`}` : `<p class="text-gray-400" data-svelte-h="svelte-1lzpmtv">No link available</p>`}</div></section>` : ``}`}`;
});
const Newsletter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  return `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)}>Placeholder component for ${escape(slice.slice_type)} (variation: ${escape(slice.variation)}) Slices</section>`;
});
const Avis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeIndex = 0;
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  return `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)} class="bg-secondary pb-12 text-center"><div class="pt-8 text-2xl underline decoration-1 underline-offset-8 md:px-0 md:text-4xl lg:px-24">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.title }, {}, {})}</div> <div class="pt-8 md:pt-20">${each(slice.items, (item, index) => {
    return `<div${add_attribute("class", index === activeIndex ? "" : "hidden", 0)}><div class="uppercase">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: item.subtitle }, {}, {})}</div> <div class="flex min-h-36 items-center px-4 pt-4 md:px-[15%]"><button data-svelte-h="svelte-1k0h135"><img src="/assets/chevron-gauche.svg" alt="Précédent" class="h-24 w-24 md:h-6 md:w-6"></button> <div class="mx-8 text-xs md:mx-24 md:text-base">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: item.text }, {}, {})}</div> <button data-svelte-h="svelte-1tahqn2"><img src="/assets/chevron-droit.svg" alt="Suivant" class="h-24 w-24 md:h-6 md:w-6"> </button></div> </div>`;
  })}</div> <div class="mt-4 flex justify-center">${each(slice.items, (item, index) => {
    return `<button${add_attribute(
      "class",
      `mx-1 h-3 w-3 rounded-full ${index === activeIndex ? "bg-primary" : "border border-primary"}`,
      0
    )}${add_attribute("aria-label", `Aller à la diapositive ${index + 1}`, 0)}></button>`;
  })}</div> <div class="mt-8 text-center text-base font-light text-primary">${isExternalLink(slice.primary.link.url) ? `${validate_component(PrismicLink, "PrismicLink").$$render(
    $$result,
    {
      field: slice.primary.link,
      class: "border px-6 pb-2 pt-1"
    },
    {},
    {
      default: () => {
        return `${escape(slice.primary.label)} <img src="/assets/icone-external-link-primary.svg" alt="lien externe" class="mb-1 ml-2 inline h-4 w-4">`;
      }
    }
  )}` : `${validate_component(PrismicLink, "PrismicLink").$$render(
    $$result,
    {
      field: slice.primary.link,
      class: "border px-6 pb-2 pt-1"
    },
    {},
    {
      default: () => {
        return `${escape(slice.primary.label)}`;
      }
    }
  )}`}</div></section>`;
});
const Reseaux = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  return `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)} class="py-24 text-center"><div class="px-24 text-2xl md:px-0 md:text-4xl">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.text }, {}, {})}</div> <div class="flex items-baseline justify-center gap-12 pt-8">${each(slice.items, (item) => {
    return `${validate_component(PrismicLink, "PrismicLink").$$render(
      $$result,
      {
        field: item.link,
        class: "transition-transform duration-300 ease-in-out hover:translate-y-1 hover:scale-95"
      },
      {},
      {
        default: () => {
          return `${validate_component(PrismicImage, "PrismicImage").$$render($$result, { field: item.icon }, {}, {})}`;
        }
      }
    )}`;
  })}</div></section>`;
});
const css$3 = {
  code: "section.svelte-8qbt9x img{-o-object-fit:cover;object-fit:cover;aspect-ratio:50/51}@media(min-width: 1280px){section.svelte-8qbt9x img{aspect-ratio:7/2}}section.svelte-8qbt9x a{border:0.5px solid;padding:0.4rem 1.5rem 0.6rem 1.5rem}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n\\timport { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';\\n\\n\\t/** @type {import(\\"@prismicio/client\\").Content.HeroSlice} */\\n\\texport let slice;\\n<\/script>\\n\\n{#if slice.variation === 'default'}\\n\\t<section\\n\\t\\tdata-slice-type={slice.slice_type}\\n\\t\\tdata-slice-variation={slice.variation}\\n\\t\\tclass=\\"mb-28 p-8 text-center\\"\\n\\t>\\n\\t\\t<div\\n\\t\\t\\tclass=\\"relative h-[340px] md:aspect-auto md:h-[400px]\\n\\"\\n\\t\\t>\\n\\t\\t\\t<PrismicImage\\n\\t\\t\\t\\tfield={slice.primary.image}\\n\\t\\t\\t\\tclass=\\"absolute inset-0 h-full w-full object-cover\\"\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t\\t<div class=\\"mt-8 text-2xl md:text-4xl\\">\\n\\t\\t\\t<PrismicRichText field={slice.primary.title} />\\n\\t\\t</div>\\n\\t\\t<div class=\\"mx-6 mt-4 text-xs md:mt-8 md:px-[12%] md:text-lg lg:px-[25%]\\">\\n\\t\\t\\t<PrismicRichText field={slice.primary.text} />\\n\\t\\t</div>\\n\\t\\t<div class=\\"mt-8 text-center text-base font-light text-primary\\">\\n\\t\\t\\t<PrismicLink\\n\\t\\t\\t\\tfield={slice.primary.link}\\n\\t\\t\\t\\tclass=\\"transition duration-300 ease-in-out hover:bg-primary hover:text-secondary\\"\\n\\t\\t\\t\\t>{slice.primary.label}</PrismicLink\\n\\t\\t\\t>\\n\\t\\t</div>\\n\\t</section>\\n{:else if slice.variation === 'heroTextOnly'}\\n\\t<section\\n\\t\\tdata-slice-type={slice.slice_type}\\n\\t\\tdata-slice-variation={slice.variation}\\n\\t\\tclass=\\"bg-secondary pb-8 text-center\\"\\n\\t>\\n\\t\\t<div class=\\"pt-8 font-span text-2xl font-semibold md:text-4xl\\">\\n\\t\\t\\t<PrismicRichText field={slice.primary.title} />\\n\\t\\t</div>\\n\\t\\t<div class=\\"mx-8 mt-4 text-justify indent-8 text-xs md:mt-8 md:px-[12%] md:text-lg lg:px-[25%]\\">\\n\\t\\t\\t<PrismicRichText field={slice.primary.text} />\\n\\t\\t</div>\\n\\t</section>\\n{/if}\\n\\n<style>\\n\\tsection :global(img) {\\n\\t\\t-o-object-fit: cover;\\n\\t\\t   object-fit: cover;\\n\\t\\taspect-ratio: 50/51;\\n\\t}\\n\\n\\t@media (min-width: 1280px) {\\n\\t\\tsection :global(img) {\\n\\t\\t\\taspect-ratio: 7/2;\\n\\t\\t}\\n\\t}\\n\\n\\tsection :global(a) {\\n\\t\\tborder: 0.5px solid;\\n\\t\\tpadding: 0.4rem 1.5rem 0.6rem 1.5rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoDC,qBAAO,CAAS,GAAK,CACpB,aAAa,CAAE,KAAK,CACjB,UAAU,CAAE,KAAK,CACpB,YAAY,CAAE,EAAE,CAAC,EAClB,CAEA,MAAO,YAAY,MAAM,CAAE,CAC1B,qBAAO,CAAS,GAAK,CACpB,YAAY,CAAE,CAAC,CAAC,CACjB,CACD,CAEA,qBAAO,CAAS,CAAG,CAClB,MAAM,CAAE,KAAK,CAAC,KAAK,CACnB,OAAO,CAAE,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAC/B"}`
};
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  $$result.css.add(css$3);
  return `${slice.variation === "default" ? `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)} class="mb-28 p-8 text-center svelte-8qbt9x"><div class="relative h-[340px] md:aspect-auto md:h-[400px] ">${validate_component(PrismicImage, "PrismicImage").$$render(
    $$result,
    {
      field: slice.primary.image,
      class: "absolute inset-0 h-full w-full object-cover"
    },
    {},
    {}
  )}</div> <div class="mt-8 text-2xl md:text-4xl">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.title }, {}, {})}</div> <div class="mx-6 mt-4 text-xs md:mt-8 md:px-[12%] md:text-lg lg:px-[25%]">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.text }, {}, {})}</div> <div class="mt-8 text-center text-base font-light text-primary">${validate_component(PrismicLink, "PrismicLink").$$render(
    $$result,
    {
      field: slice.primary.link,
      class: "transition duration-300 ease-in-out hover:bg-primary hover:text-secondary"
    },
    {},
    {
      default: () => {
        return `${escape(slice.primary.label)}`;
      }
    }
  )}</div></section>` : `${slice.variation === "heroTextOnly" ? `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)} class="bg-secondary pb-8 text-center svelte-8qbt9x"><div class="pt-8 font-span text-2xl font-semibold md:text-4xl">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.title }, {}, {})}</div> <div class="mx-8 mt-4 text-justify indent-8 text-xs md:mt-8 md:px-[12%] md:text-lg lg:px-[25%]">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.text }, {}, {})}</div></section>` : ``}`}`;
});
const css$2 = {
  code: ".map-embed.svelte-qa9d6k.svelte-qa9d6k{width:100%;height:100%}.map-embed.svelte-qa9d6k>iframe.svelte-qa9d6k{width:100%;aspect-ratio:21/9}section.svelte-qa9d6k a{text-decoration:none;color:inherit}section.svelte-qa9d6k a:hover{text-decoration:underline}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script lang=\\"ts\\">\\"use strict\\";\\nimport { PrismicRichText, PrismicEmbed } from \\"@prismicio/svelte\\";\\nimport { isFilled } from \\"@prismicio/client\\";\\nexport let slice;\\n<\/script>\\n\\n<section\\n\\tdata-slice-type={slice.slice_type}\\n\\tdata-slice-variation={slice.variation}\\n\\tclass=\\"flex flex-col items-center gap-8 py-8 md:flex-row\\"\\n>\\n\\t<!-- Map Section -->\\n\\t<div class=\\"w-full md:w-1/2\\">\\n\\t\\t<div class=\\"aspect-w-16 aspect-h-9 map-embed\\">\\n\\t\\t\\t{#if slice.primary.map_iframe}\\n\\t\\t\\t\\t<div class=\\"map-embed\\">\\n\\t\\t\\t\\t\\t<iframe\\n\\t\\t\\t\\t\\t\\tsrc={slice.primary.map_iframe}\\n\\t\\t\\t\\t\\t\\tstyle=\\"border:0;\\"\\n\\t\\t\\t\\t\\t\\tallowfullscreen\\n\\t\\t\\t\\t\\t\\tloading=\\"lazy\\"\\n\\t\\t\\t\\t\\t\\treferrerpolicy=\\"no-referrer-when-downgrade\\"\\n\\t\\t\\t\\t\\t\\ttitle=\\"Carte Google Maps de La Cave des Saveurs\\"\\n\\t\\t\\t\\t\\t></iframe>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<!-- Contact Information Section -->\\n\\t<div class=\\"w-full space-y-6 md:w-1/2\\">\\n\\t\\t<!-- Location Title -->\\n\\t\\t<h2 class=\\"text-2xl font-bold\\">\\n\\t\\t\\t{slice.primary.location_title}\\n\\t\\t</h2>\\n\\n\\t\\t<!-- Address -->\\n\\t\\t<div class=\\"space-y-2\\">\\n\\t\\t\\t<h3 class=\\"font-semibold\\">Adresse</h3>\\n\\t\\t\\t<p>\\n\\t\\t\\t\\t{slice.primary.address}\\n\\t\\t\\t</p>\\n\\t\\t</div>\\n\\n\\t\\t<!-- Contact Title -->\\n\\t\\t<h3 class=\\"font-semibold\\">\\n\\t\\t\\t{slice.primary.contact_title}\\n\\t\\t</h3>\\n\\n\\t\\t<!-- Contact Methods -->\\n\\t\\t<div class=\\"space-y-4\\">\\n\\t\\t\\t{#each slice.primary.contact_methods as method}\\n\\t\\t\\t\\t<div class=\\"flex items-center gap-2\\">\\n\\t\\t\\t\\t\\t<div>\\n\\t\\t\\t\\t\\t\\t{method.value}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t</div>\\n</section>\\n\\n<style>\\n\\t.map-embed {\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\t.map-embed > iframe {\\n\\t\\twidth: 100%;\\n\\t\\taspect-ratio: 21/9;\\n\\t}\\n\\n\\tsection :global(a) {\\n\\t\\ttext-decoration: none;\\n\\t\\tcolor: inherit;\\n\\t}\\n\\n\\tsection :global(a:hover) {\\n\\t\\ttext-decoration: underline;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+DC,sCAAW,CACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACT,CAEA,wBAAU,CAAG,oBAAO,CACnB,KAAK,CAAE,IAAI,CACX,YAAY,CAAE,EAAE,CAAC,CAClB,CAEA,qBAAO,CAAS,CAAG,CAClB,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,OACR,CAEA,qBAAO,CAAS,OAAS,CACxB,eAAe,CAAE,SAClB"}'
};
const LocationContactInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  $$result.css.add(css$2);
  return `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)} class="flex flex-col items-center gap-8 py-8 md:flex-row svelte-qa9d6k"> <div class="w-full md:w-1/2"><div class="aspect-w-16 aspect-h-9 map-embed svelte-qa9d6k">${slice.primary.map_iframe ? `<div class="map-embed svelte-qa9d6k"><iframe${add_attribute("src", slice.primary.map_iframe, 0)} style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Carte Google Maps de La Cave des Saveurs" class="svelte-qa9d6k"></iframe></div>` : ``}</div></div>  <div class="w-full space-y-6 md:w-1/2"> <h2 class="text-2xl font-bold">${escape(slice.primary.location_title)}</h2>  <div class="space-y-2"><h3 class="font-semibold" data-svelte-h="svelte-k8g70v">Adresse</h3> <p>${escape(slice.primary.address)}</p></div>  <h3 class="font-semibold">${escape(slice.primary.contact_title)}</h3>  <div class="space-y-4">${each(slice.primary.contact_methods, (method) => {
    return `<div class="flex items-center gap-2"><div>${escape(method.value)}</div> </div>`;
  })}</div></div> </section>`;
});
const NewsletterSignup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  return `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)}>Placeholder component for ${escape(slice.slice_type)} (variation: ${escape(slice.variation)}) Slices</section>`;
});
const css$1 = {
  code: "section.svelte-2v1pdy img{-o-object-fit:cover;object-fit:cover;aspect-ratio:4/3}section.svelte-2v1pdy .label{background-color:white !important}section.svelte-2v1pdy p{line-height:1}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n\\timport { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';\\n\\t/** @type {import(\\"@prismicio/client\\").Content.ProduitsSlice} */\\n\\texport let slice;\\n<\/script>\\n\\n<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>\\n\\t<div\\n\\t\\tclass=\\"mx-8 mb-24 mt-8 flex flex-col items-center gap-6 text-left font-light text-primary md:mx-0 md:mr-12 md:flex-row\\"\\n\\t>\\n\\t\\t<div class=\\"basis-1/3\\">\\n\\t\\t\\t<PrismicLink field={slice.primary.link_2}>\\n\\t\\t\\t\\t<div class=\\"relative\\">\\n\\t\\t\\t\\t\\t<PrismicImage field={slice.primary.image_2} class=\\"h-44 md:h-auto\\" />\\n\\t\\t\\t\\t\\t<p\\n\\t\\t\\t\\t\\t\\tclass=\\"label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xs text-primary md:text-lg\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{slice.primary.label_2}\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div></PrismicLink\\n\\t\\t\\t>\\n\\t\\t</div>\\n\\t\\t<div class=\\"basis-1/3\\">\\n\\t\\t\\t<PrismicLink field={slice.primary.link}>\\n\\t\\t\\t\\t<div class=\\"relative\\">\\n\\t\\t\\t\\t\\t<PrismicImage field={slice.primary.image} class=\\"h-44 md:h-auto\\" />\\n\\t\\t\\t\\t\\t<p class=\\"label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xl text-primary\\">\\n\\t\\t\\t\\t\\t\\t{slice.primary.label}\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div></PrismicLink\\n\\t\\t\\t>\\n\\t\\t</div>\\n\\t\\t<div class=\\"basis-1/3\\">\\n\\t\\t\\t<div class=\\"text-center text-2xl font-medium md:text-left md:text-4xl\\">\\n\\t\\t\\t\\t<PrismicRichText field={slice.primary.title} />\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"mt-3 text-xs md:mt-8 md:text-lg\\">\\n\\t\\t\\t\\t<PrismicRichText field={slice.primary.text} />\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</section>\\n\\n<style>\\n\\tsection :global(img) {\\n\\t\\t-o-object-fit: cover;\\n\\t\\t   object-fit: cover;\\n\\t\\taspect-ratio: 4/3;\\n\\t}\\n\\n\\tsection :global(.label) {\\n\\t\\tbackground-color: white !important;\\n\\t}\\n\\n\\tsection :global(p) {\\n\\t\\tline-height: 1;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4CC,qBAAO,CAAS,GAAK,CACpB,aAAa,CAAE,KAAK,CACjB,UAAU,CAAE,KAAK,CACpB,YAAY,CAAE,CAAC,CAAC,CACjB,CAEA,qBAAO,CAAS,MAAQ,CACvB,gBAAgB,CAAE,KAAK,CAAC,UACzB,CAEA,qBAAO,CAAS,CAAG,CAClB,WAAW,CAAE,CACd"}`
};
const Produits = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  $$result.css.add(css$1);
  return `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)} class="svelte-2v1pdy"><div class="mx-8 mb-24 mt-8 flex flex-col items-center gap-6 text-left font-light text-primary md:mx-0 md:mr-12 md:flex-row"><div class="basis-1/3">${validate_component(PrismicLink, "PrismicLink").$$render($$result, { field: slice.primary.link_2 }, {}, {
    default: () => {
      return `<div class="relative">${validate_component(PrismicImage, "PrismicImage").$$render(
        $$result,
        {
          field: slice.primary.image_2,
          class: "h-44 md:h-auto"
        },
        {},
        {}
      )} <p class="label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xs text-primary md:text-lg">${escape(slice.primary.label_2)}</p></div>`;
    }
  })}</div> <div class="basis-1/3">${validate_component(PrismicLink, "PrismicLink").$$render($$result, { field: slice.primary.link }, {}, {
    default: () => {
      return `<div class="relative">${validate_component(PrismicImage, "PrismicImage").$$render(
        $$result,
        {
          field: slice.primary.image,
          class: "h-44 md:h-auto"
        },
        {},
        {}
      )} <p class="label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xl text-primary">${escape(slice.primary.label)}</p></div>`;
    }
  })}</div> <div class="basis-1/3"><div class="text-center text-2xl font-medium md:text-left md:text-4xl">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.title }, {}, {})}</div> <div class="mt-3 text-xs md:mt-8 md:text-lg">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: slice.primary.text }, {}, {})}</div></div></div> </section>`;
});
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { node } = $$props;
  if ($$props.node === void 0 && $$bindings.node && node !== void 0) $$bindings.node(node);
  return `${node.data.label === "codespan" ? `<code>${slots.default ? slots.default({}) : ``}</code>` : `<span${add_attribute("class", node.data.label, 0)}>${slots.default ? slots.default({}) : ``}</span>`}`;
});
const css = {
  code: ".container.svelte-1u9i9n8{max-width:600px;margin:6em auto}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n\\timport { PrismicRichText } from '@prismicio/svelte';\\n\\timport Label from './Label.svelte';\\n\\n\\t/** @type {import(\\"@prismicio/client\\").Content.RichTextSlice} */\\n\\texport let slice;\\n<\/script>\\n\\n<section class=\\"container\\">\\n\\t<PrismicRichText\\n\\t\\tfield={slice.primary.content}\\n\\t\\tcomponents={{\\n\\t\\t\\tlabel: Label\\n\\t\\t}}\\n\\t/>\\n</section>\\n\\n<style>\\n\\t.container {\\n\\t\\tmax-width: 600px;\\n\\t\\tmargin: 6em auto;\\n\\t\\t/* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,\\n\\t\\t\\t'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; */\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAkBC,yBAAW,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,GAAG,CAAC,IAGb"}`
};
const Texte = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  $$result.css.add(css);
  return `<section class="container svelte-1u9i9n8">${validate_component(PrismicRichText, "PrismicRichText").$$render(
    $$result,
    {
      field: slice.primary.content,
      components: { label: Label }
    },
    {},
    {}
  )} </section>`;
});
const Espace = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  return `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)}>${slice.primary.size == "Petit" ? `<div class="h-8"></div>` : `${slice.primary.size == "Moyen" ? `<div class="h-16"></div>` : `${slice.primary.size == "Grand" ? `<div class="h-32"></div>` : ``}`}`}</section>`;
});
const Title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { slice } = $$props;
  if ($$props.slice === void 0 && $$bindings.slice && slice !== void 0) $$bindings.slice(slice);
  return `<section${add_attribute("data-slice-type", slice.slice_type, 0)}${add_attribute("data-slice-variation", slice.variation, 0)}>Placeholder component for ${escape(slice.slice_type)} (variation: ${escape(slice.variation)}) Slices</section>`;
});
const components = {
  banner_event: Evenements,
  banner_newsletter: Newsletter,
  banner_review: Avis,
  banner_social: Reseaux,
  hero: Hero,
  location_contact_info: LocationContactInfo,
  newsletter_signup: NewsletterSignup,
  produits: Produits,
  rich_text: Texte,
  spacer: Espace,
  title: Title
};
export {
  SliceZone as S,
  components as c
};
