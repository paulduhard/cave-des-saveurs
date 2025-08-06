import { c as create_ssr_component, v as validate_component, b as each, e as escape } from "../../../../../chunks/ssr.js";
import { a as PrismicLink, P as PrismicImage } from "../../../../../chunks/PrismicLink.js";
import { P as PrismicRichText } from "../../../../../chunks/PrismicRichText.js";
import { S as SliceZone, c as components } from "../../../../../chunks/index3.js";
import { p as page } from "../../../../../chunks/index2.js";
const Socials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { settings } = $$props;
  if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0) $$bindings.settings(settings);
  return `<section class="flex flex-col justify-center gap-4 py-24 text-center md:h-[395px]"><div class="px-24 text-2xl md:px-0 md:text-4xl">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: settings.data.texte }, {}, {})}</div> <div class="flex items-baseline justify-center gap-12 pt-8">${each(settings.data.item, (item) => {
    return `${validate_component(PrismicLink, "PrismicLink").$$render(
      $$result,
      {
        class: "cursor-pointer transition-transform duration-700 ease-in-out hover:scale-90 hover:cursor-pointer",
        field: item.lien
      },
      {},
      {
        default: () => {
          return `${validate_component(PrismicImage, "PrismicImage").$$render($$result, { field: item.icone }, {}, {})} `;
        }
      }
    )}`;
  })}</div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="mx-auto mt-12"><div class="ml-12 font-sofia text-xl font-normal"><div class="font-span text-4xl font-bold">${escape(data.domaine)}</div> ${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: data.page.data.title }, {}, {})}</div>  <div class="mb-20 flex flex-col items-center justify-center md:flex-row">${data.page.data.image.url ? `${validate_component(PrismicImage, "PrismicImage").$$render(
    $$result,
    {
      field: data.page.data.image,
      class: "h-[490px] w-[380px]"
    },
    {},
    {}
  )}` : `<div class="bg-red-200 relative flex h-full w-full items-center justify-center rounded-lg" data-svelte-h="svelte-1udqszv"><img src="/assets/placeholder.png" alt="" class="opacity-50"> <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform text-xl">Photo à venir</span></div>`} <div><div class="text-primary"><div>RÉGION : <span class="font-light">${escape(data.region || "***")}</span></div> ${data.regionDescription ? `<div class="mt-2">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: data.regionDescription }, {}, {})}</div>` : ``} <div>APPELLATION : <span class="font-light">${escape(data.appellation || "***")}</span></div> ${data.appellationDescription ? `<div class="mt-2">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: data.appellationDescription }, {}, {})}</div>` : ``} <div>TERROIR : <span class="font-light">${escape(data.page.data.terroir || "***")}</span></div> <div>COULEUR : <span class="font-light">${escape(data.couleur || "***")}</span></div> <div>CÉPAGE(S) :
					<span class="font-light">${escape(data.page.data.cepages || "***")}</span></div> <div>À L&#39;OEIL : <span class="font-light">${escape(data.page.data.oeil || "***")}</span></div> <div>AU NEZ : <span class="font-light">${escape(data.page.data.nez || "***")}</span></div> <div>EN BOUCHE : <span class="font-light">${escape(data.page.data.bouche || "***")}</span></div> <div class="flex">SE DÉGUSTE AVEC : 
					<span class="font-light">${data.page.data.degustation && data.page.data.degustation.length > 0 ? `${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: data.page.data.degustation }, {}, {})}` : `***`}</span></div></div> <div class="my-8 flex w-[542px] flex-col gap-4 bg-secondary py-6" data-svelte-h="svelte-lprepm"><div class="px-22 text-center text-[15px] tracking-tight">Chez nous, tout se passe en boutique ! Nous vous invitons à nous contacter par téléphone
					ou mail pour passer commande.</div> <div class="flex justify-center gap-8"><a href="tel:+33490471181" class="border px-6 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-secondary">04 90 47 11 81</a> <a href="mailto:contact@cave-des-saveurs.com" class="border border-primary px-6 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-secondary">contact@cave-des-saveurs.com</a></div></div></div></div> ${validate_component(SliceZone, "SliceZone").$$render(
    $$result,
    {
      slices: data.page.data.slices,
      components
    },
    {},
    {}
  )} ${validate_component(Socials, "Socials").$$render($$result, { settings: page.data.settings }, {}, {})}</div>`;
});
export {
  Page as default
};
