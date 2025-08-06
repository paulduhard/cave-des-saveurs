import { n as noop, c as create_ssr_component, a as add_attribute, v as validate_component, e as escape, d as subscribe, b as each } from "../../../../../chunks/ssr.js";
import { P as PrismicImage } from "../../../../../chunks/PrismicLink.js";
import { P as PrismicRichText } from "../../../../../chunks/PrismicRichText.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/state.svelte.js";
import { p as page } from "../../../../../chunks/index2.js";
import { w as writable } from "../../../../../chunks/index.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const WineCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { wine } = $$props;
  if ($$props.wine === void 0 && $$bindings.wine && wine !== void 0) $$bindings.wine(wine);
  return `<div class="group flex h-full flex-col font-light"><a${add_attribute("href", `/vin/${wine.uid}`, 0)} class="flex flex-grow flex-col items-start rounded-md p-4 transition-shadow duration-300 ease-in-out hover:shadow-xl"> ${wine.image.url ? `${validate_component(PrismicImage, "PrismicImage").$$render($$result, { field: wine.image, class: "self-center" }, {}, {})}` : `<div class="bg-red-200 relative flex h-full w-full items-center justify-center rounded-lg" data-svelte-h="svelte-1udqszv"><img src="/assets/placeholder.png" alt="" class="opacity-50"> <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform text-xl">Photo à venir</span></div>`} <span class="mt-8 font-span">${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: wine.title }, {}, {})}</span> <span class="mb-2 font-span text-xl">${escape(wine.domaineName)}</span> ${validate_component(PrismicRichText, "PrismicRichText").$$render($$result, { field: wine.resume }, {}, {})} <div class="mt-auto pt-4" data-svelte-h="svelte-1ik67f3"><button class="inline-block border border-primary px-8 py-2 font-light text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-secondary">Découvrir</button></div></a></div>`;
});
const ArrowIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="${escape($$props.class, true) + " " + escape($$props.isSelected ? "rotate-180" : "", true) + " transition-transform duration-300"}"><rect width="15" height="9" fill="#F5F5F5"></rect><g id="LA CAVE Ã€ VINS RÃ‰GION" clip-path="url(#clip0_314_164)"><rect width="1280" height="3467" transform="translate(-316 -420)" fill="white"></rect><path id="Vector" d="M14 1L7.5 7.89333L1 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_314_164"><rect width="1280" height="3467" fill="white" transform="translate(-316 -420)"></rect></clipPath></defs></svg>`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i])
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token) fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const css = {
  code: ".range-input.svelte-or95b0{position:absolute;left:0;top:0;width:100%;height:2px;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;pointer-events:none}.range-input.svelte-or95b0::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:black;cursor:pointer;pointer-events:auto;margin-top:-7px}.range-input.svelte-or95b0::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:black;cursor:pointer;pointer-events:auto;margin-top:-7px}.range-input.svelte-or95b0::-webkit-slider-runnable-track{background:transparent;height:2px}.range-input.svelte-or95b0::-moz-range-track{background:transparent;height:2px}.word-cloud.svelte-or95b0{display:flex;flex-direction:column;gap:10px}.appellation-word.svelte-or95b0{cursor:pointer;background:none;border:none;padding:0;margin:0;width:100%;font:inherit}.appellation-word.svelte-or95b0:hover{text-decoration:underline}",
  map: `{"version":3,"file":"Aside.svelte","sources":["Aside.svelte"],"sourcesContent":["<script lang=\\"ts\\">\\"use strict\\";\\nimport ArrowIcon from \\"./ArrowIcon.svelte\\";\\nimport { spring } from \\"svelte/motion\\";\\nlet isDomainSectionExpanded = true;\\nlet isAppellationSectionExpanded = true;\\nlet minPrice = 5;\\nlet maxPrice = 200;\\nlet leftValue = spring(minPrice);\\nlet rightValue = spring(maxPrice);\\nconst minGap = 15;\\n$: currentMinPrice = Math.round($leftValue);\\n$: currentMaxPrice = Math.round($rightValue);\\nexport let filterData = {\\n  colors: [],\\n  selectedColors: /* @__PURE__ */ new Set(),\\n  domains: [],\\n  selectedDomain: null,\\n  appellations: [],\\n  selectedAppellation: null,\\n  priceRange: { min: minPrice, max: maxPrice }\\n};\\nexport let handleFilterChange = () => {\\n};\\nexport let appellationNames = {};\\nexport const getWinesByAppellation = () => [];\\nfunction toggleDomainSection() {\\n  isDomainSectionExpanded = !isDomainSectionExpanded;\\n}\\nfunction toggleAppellationSection() {\\n  isAppellationSectionExpanded = !isAppellationSectionExpanded;\\n}\\nfunction handleLeftChange(event) {\\n  let value = parseFloat(event.target.value);\\n  let rightValuePercentage = ($rightValue - minPrice) / (maxPrice - minPrice) * 100;\\n  let maxLeftValuePercentage = rightValuePercentage - minGap;\\n  let maxLeftValue = maxLeftValuePercentage / 100 * (maxPrice - minPrice) + minPrice;\\n  if (value > maxLeftValue) {\\n    value = maxLeftValue;\\n    const target = event.target;\\n    target.value = String(value);\\n  }\\n  leftValue.set(value);\\n  handleFilterChange(\\"prix\\", { min: Math.round(value), max: currentMaxPrice });\\n}\\nfunction handleRightChange(event) {\\n  let value = parseFloat(event.target.value);\\n  let leftValuePercentage = ($leftValue - minPrice) / (maxPrice - minPrice) * 100;\\n  let minRightValuePercentage = leftValuePercentage + minGap;\\n  let minRightValue = minRightValuePercentage / 100 * (maxPrice - minPrice) + minPrice;\\n  if (value < minRightValue) {\\n    value = minRightValue;\\n    const target = event.target;\\n    target.value = String(value);\\n  }\\n  rightValue.set(value);\\n  handleFilterChange(\\"prix\\", { min: currentMinPrice, max: Math.round(value) });\\n}\\nfunction calculatePosition(value) {\\n  return (value - minPrice) / (maxPrice - minPrice) * 100;\\n}\\n$: leftPosition = calculatePosition($leftValue);\\n$: rightPosition = calculatePosition($rightValue);\\n$: leftLabelOffset = 14 / sliderWidth * 100;\\nlet sliderWidth = 1;\\nfunction handleResize() {\\n  const slider = document.querySelector(\\".slider-container\\");\\n  if (slider) {\\n    sliderWidth = slider.offsetWidth;\\n  }\\n}\\nimport { onMount } from \\"svelte\\";\\nonMount(() => {\\n  handleResize();\\n  window.addEventListener(\\"resize\\", handleResize);\\n  return () => window.removeEventListener(\\"resize\\", handleResize);\\n});\\nfunction localHandleFilterChange(filterType, value) {\\n  try {\\n    if (filterType === \\"color\\" && typeof value === \\"string\\") {\\n      if (filterData.selectedColors.has(value)) {\\n        filterData.selectedColors.delete(value);\\n      } else {\\n        filterData.selectedColors.add(value);\\n      }\\n      filterData.selectedColors = new Set(filterData.selectedColors);\\n      handleFilterChange(filterType, filterData.selectedColors);\\n    } else if (filterType === \\"domain\\" && typeof value === \\"string\\") {\\n      filterData.selectedDomain = filterData.selectedDomain === value ? null : value;\\n      handleFilterChange(filterType, filterData.selectedDomain || \\"\\");\\n      generateAppellationWordCloud();\\n    } else if (filterType === \\"appellation\\" && typeof value === \\"string\\") {\\n      filterData.selectedAppellation = filterData.selectedAppellation === value ? null : value;\\n      handleFilterChange(filterType, filterData.selectedAppellation || \\"\\");\\n    } else {\\n      handleFilterChange(filterType, value);\\n    }\\n  } catch (error) {\\n    console.error(\\"Error in localHandleFilterChange:\\", error);\\n  }\\n}\\nfunction generateAppellationWordCloud() {\\n  try {\\n    if (!filterData.selectedDomain || !filterData.domains) {\\n      filterData.appellations = [];\\n      return;\\n    }\\n    const selectedDomain = filterData.domains.find(\\n      (domain) => domain.uid === filterData.selectedDomain\\n    );\\n    if (selectedDomain && selectedDomain.appellations) {\\n      const uniqueAppellations = new Set(\\n        selectedDomain.appellations.map((appellation) => appellation.uid)\\n      );\\n      filterData.appellations = Array.from(uniqueAppellations).map((uid) => {\\n        const appellation = selectedDomain.appellations.find((a) => a.uid === uid);\\n        return appellation;\\n      }).filter(Boolean);\\n    } else {\\n      filterData.appellations = [];\\n    }\\n  } catch (error) {\\n    console.error(\\"Error in generateAppellationWordCloud:\\", error);\\n    filterData.appellations = [];\\n  }\\n}\\n<\/script>\\n\\n<aside class=\\"bg-gray-100 w-1/4\\">\\n\\t<!-- Domain Section -->\\n\\t<div class=\\"mb-6 border-t border-primary\\">\\n\\t\\t<button\\n\\t\\t\\tclass=\\"mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase\\"\\n\\t\\t\\ton:click={toggleDomainSection}\\n\\t\\t\\taria-expanded={isDomainSectionExpanded}\\n\\t\\t\\taria-controls=\\"domain-list\\"\\n\\t\\t>\\n\\t\\t\\tNOS VINS PAR DOMAINES\\n\\t\\t\\t<ArrowIcon isSelected={isDomainSectionExpanded} class=\\"ml-2\\" />\\n\\t\\t</button>\\n\\n\\t\\t<div id=\\"domain-list\\" class={isDomainSectionExpanded ? '' : 'hidden'}>\\n\\t\\t\\t{#if filterData?.domains && filterData.domains.length > 0}\\n\\t\\t\\t\\t{#each filterData.domains as domain (domain.uid)}\\n\\t\\t\\t\\t\\t<div class=\\"mb-2\\">\\n\\t\\t\\t\\t\\t\\t<label\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"block {filterData.selectedDomain === domain.uid\\n\\t\\t\\t\\t\\t\\t\\t\\t? 'cursor-default'\\n\\t\\t\\t\\t\\t\\t\\t\\t: 'cursor-pointer hover:underline'} focus:no-underline\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\t\\ttype=\\"radio\\"\\n\\t\\t\\t\\t\\t\\t\\t\\tname=\\"domain\\"\\n\\t\\t\\t\\t\\t\\t\\t\\tvalue={domain.uid}\\n\\t\\t\\t\\t\\t\\t\\t\\tchecked={filterData.selectedDomain === domain.uid}\\n\\t\\t\\t\\t\\t\\t\\t\\ton:change={() => localHandleFilterChange('domain', domain.uid)}\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"hidden\\"\\n\\t\\t\\t\\t\\t\\t\\t\\taria-label={\`Domaine \${domain.name || 'Nom non défini'}\`}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center justify-between font-light\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<span\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{filterData.selectedDomain === domain.uid\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'font-bold'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ''} hover:text-gray-700\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{domain.name || 'Nom non défini'}\\n\\t\\t\\t\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t</label>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<p class=\\"text-gray-500 text-sm\\">Aucun domaine disponible</p>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<!-- Appellation Section -->\\n\\t<div class=\\"mb-6 border-t border-primary\\">\\n\\t\\t<button\\n\\t\\t\\tclass=\\"mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase\\"\\n\\t\\t\\ton:click={toggleAppellationSection}\\n\\t\\t\\taria-expanded={isAppellationSectionExpanded}\\n\\t\\t\\taria-controls=\\"appellation-list\\"\\n\\t\\t>\\n\\t\\t\\tNOS VINS PAR APPELLATIONS\\n\\t\\t\\t<ArrowIcon isSelected={isAppellationSectionExpanded} class=\\"ml-2\\" />\\n\\t\\t</button>\\n\\n\\t\\t<div id=\\"appellation-list\\" class={isAppellationSectionExpanded ? '' : 'hidden'}>\\n\\t\\t\\t{#if filterData?.appellations && filterData.appellations.length > 0}\\n\\t\\t\\t\\t<div class=\\"word-cloud\\">\\n\\t\\t\\t\\t\\t{#each filterData.appellations as appellation (appellation.uid)}\\n\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"appellation-word text-left {filterData.selectedAppellation === appellation.uid\\n\\t\\t\\t\\t\\t\\t\\t\\t? 'font-bold text-primary'\\n\\t\\t\\t\\t\\t\\t\\t\\t: ''}\\"\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => localHandleFilterChange('appellation', appellation.uid)}\\n\\t\\t\\t\\t\\t\\t\\ton:keydown={(e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\tif (e.key === 'Enter' || e.key === ' ') {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\te.preventDefault();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tlocalHandleFilterChange('appellation', appellation.uid);\\n\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\taria-pressed={filterData.selectedAppellation === appellation.uid}\\n\\t\\t\\t\\t\\t\\t\\taria-label={\`Appellation \${appellationNames[appellation.uid] || appellation.name || 'Nom inconnu'}\`}\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t{appellationNames[appellation.uid] || appellation.name || 'Nom inconnu'}\\n\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<p class=\\"text-gray-500 text-sm\\">\\n\\t\\t\\t\\t\\t{filterData?.selectedDomain\\n\\t\\t\\t\\t\\t\\t? 'Aucune appellation disponible pour ce domaine'\\n\\t\\t\\t\\t\\t\\t: 'Sélectionnez un domaine pour voir les appellations'}\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<!-- New Price Range Filter -->\\n\\t<div class=\\"border-black mb-6 border-t\\">\\n\\t\\t<h3 class=\\"mt-2 text-xl uppercase\\">Prix</h3>\\n\\t\\t<div class=\\"relative pb-2 pt-10\\">\\n\\t\\t\\t<div class=\\"slider-container relative h-[2px] w-full\\">\\n\\t\\t\\t\\t<div class=\\"bg-gray-300 absolute left-0 right-0 top-0 h-full\\"></div>\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"absolute top-0 h-full bg-primary\\"\\n\\t\\t\\t\\t\\tstyle=\\"left: {leftPosition}%; right: {100 - rightPosition}%;\\"\\n\\t\\t\\t\\t></div>\\n\\t\\t\\t\\t<div class=\\"absolute left-0 right-0 top-[-32px]\\">\\n\\t\\t\\t\\t\\t<span\\n\\t\\t\\t\\t\\t\\tclass=\\"absolute whitespace-nowrap text-sm\\"\\n\\t\\t\\t\\t\\t\\tstyle=\\"left: calc({leftPosition}% + {leftLabelOffset}%); transform: translateX(-50%);\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{currentMinPrice}€\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t<span\\n\\t\\t\\t\\t\\t\\tclass=\\"absolute whitespace-nowrap text-sm\\"\\n\\t\\t\\t\\t\\t\\tstyle=\\"left: {rightPosition}%; transform: translateX(-50%);\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{currentMaxPrice}€\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\ttype=\\"range\\"\\n\\t\\t\\t\\t\\tmin={minPrice}\\n\\t\\t\\t\\t\\tmax={maxPrice}\\n\\t\\t\\t\\t\\tstep=\\"1\\"\\n\\t\\t\\t\\t\\tbind:value={$leftValue}\\n\\t\\t\\t\\t\\ton:input={handleLeftChange}\\n\\t\\t\\t\\t\\tclass=\\"range-input\\"\\n\\t\\t\\t\\t\\taria-label=\\"Prix minimum\\"\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\ttype=\\"range\\"\\n\\t\\t\\t\\t\\tmin={minPrice}\\n\\t\\t\\t\\t\\tmax={maxPrice}\\n\\t\\t\\t\\t\\tstep=\\"1\\"\\n\\t\\t\\t\\t\\tbind:value={$rightValue}\\n\\t\\t\\t\\t\\ton:input={handleRightChange}\\n\\t\\t\\t\\t\\tclass=\\"range-input\\"\\n\\t\\t\\t\\t\\taria-label=\\"Prix maximum\\"\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<div class=\\"mb-6 border-t border-primary\\">\\n\\t\\t<h3 class=\\"mb-2 mt-2 text-xl uppercase\\">Couleurs</h3>\\n\\t\\t<div class=\\"grid grid-cols-3 gap-x-2 gap-y-4\\">\\n\\t\\t\\t{#if filterData?.colors && filterData.colors.length > 0}\\n\\t\\t\\t\\t{#each filterData.colors as color (color.uid)}\\n\\t\\t\\t\\t\\t<label class=\\"flex cursor-pointer items-center font-light\\">\\n\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"checkbox\\"\\n\\t\\t\\t\\t\\t\\t\\tvalue={color.uid}\\n\\t\\t\\t\\t\\t\\t\\tchecked={filterData.selectedColors.has(color.uid)}\\n\\t\\t\\t\\t\\t\\t\\ton:change={() => localHandleFilterChange('color', color.uid)}\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"sr-only\\"\\n\\t\\t\\t\\t\\t\\t\\taria-label={\`Couleur \${color.name || 'Nom non défini'}\`}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t<div class=\\"border-gray-300 relative mr-2 h-[17px] w-[17px] flex-shrink-0 border\\">\\n\\t\\t\\t\\t\\t\\t\\t{#if filterData.selectedColors.has(color.uid)}\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"absolute inset-0 m-[2px] bg-primary\\"></div>\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t<span class=\\"truncate\\">{color.name || 'Nom non défini'}</span>\\n\\t\\t\\t\\t\\t</label>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<p class=\\"text-gray-500 text-sm\\">Aucune couleur disponible</p>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n</aside>\\n\\n<style>\\n\\t.range-input {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 2px;\\n\\t\\t-webkit-appearance: none;\\n\\t\\t   -moz-appearance: none;\\n\\t\\t        appearance: none;\\n\\t\\tbackground: transparent;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\t.range-input::-webkit-slider-thumb {\\n\\t\\t-webkit-appearance: none;\\n\\t\\twidth: 16px;\\n\\t\\theight: 16px;\\n\\t\\tborder-radius: 50%;\\n\\t\\tbackground: black;\\n\\t\\tcursor: pointer;\\n\\t\\tpointer-events: auto;\\n\\t\\tmargin-top: -7px; /* (16px height - 2px line height) / 2 */\\n\\t}\\n\\n\\t.range-input::-moz-range-thumb {\\n\\t\\twidth: 16px;\\n\\t\\theight: 16px;\\n\\t\\tborder-radius: 50%;\\n\\t\\tbackground: black;\\n\\t\\tcursor: pointer;\\n\\t\\tpointer-events: auto;\\n\\t\\tmargin-top: -7px; /* (16px height - 2px line height) / 2 */\\n\\t}\\n\\n\\t.range-input::-webkit-slider-runnable-track {\\n\\t\\tbackground: transparent;\\n\\t\\theight: 2px;\\n\\t}\\n\\n\\t.range-input::-moz-range-track {\\n\\t\\tbackground: transparent;\\n\\t\\theight: 2px;\\n\\t}\\n\\n\\t.word-cloud {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 10px;\\n\\t}\\n\\n\\t.appellation-word {\\n\\t\\tcursor: pointer;\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\twidth: 100%;\\n\\t\\tfont: inherit;\\n\\t}\\n\\t.appellation-word:hover {\\n\\t\\ttext-decoration: underline;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA2SC,0BAAa,CACZ,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,kBAAkB,CAAE,IAAI,CACrB,eAAe,CAAE,IAAI,CAChB,UAAU,CAAE,IAAI,CACxB,UAAU,CAAE,WAAW,CACvB,cAAc,CAAE,IACjB,CAEA,0BAAY,sBAAuB,CAClC,kBAAkB,CAAE,IAAI,CACxB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,OAAO,CACf,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,IACb,CAEA,0BAAY,kBAAmB,CAC9B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,OAAO,CACf,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,IACb,CAEA,0BAAY,+BAAgC,CAC3C,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,GACT,CAEA,0BAAY,kBAAmB,CAC9B,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,GACT,CAEA,yBAAY,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACN,CAEA,+BAAkB,CACjB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,CACX,IAAI,CAAE,OACP,CACA,+BAAiB,MAAO,CACvB,eAAe,CAAE,SAClB"}`
};
let minPrice = 5;
let maxPrice = 200;
function calculatePosition(value) {
  return (value - minPrice) / (maxPrice - minPrice) * 100;
}
const Aside = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentMinPrice;
  let currentMaxPrice;
  let leftPosition;
  let rightPosition;
  let leftLabelOffset;
  let $rightValue, $$unsubscribe_rightValue;
  let $leftValue, $$unsubscribe_leftValue;
  let isDomainSectionExpanded = true;
  let isAppellationSectionExpanded = true;
  let leftValue = spring(minPrice);
  $$unsubscribe_leftValue = subscribe(leftValue, (value) => $leftValue = value);
  let rightValue = spring(maxPrice);
  $$unsubscribe_rightValue = subscribe(rightValue, (value) => $rightValue = value);
  let { filterData = {
    colors: [],
    selectedColors: /* @__PURE__ */ new Set(),
    domains: [],
    selectedDomain: null,
    appellations: [],
    selectedAppellation: null,
    priceRange: { min: minPrice, max: maxPrice }
  } } = $$props;
  let { handleFilterChange = () => {
  } } = $$props;
  let { appellationNames = {} } = $$props;
  const getWinesByAppellation = () => [];
  let sliderWidth = 1;
  if ($$props.filterData === void 0 && $$bindings.filterData && filterData !== void 0) $$bindings.filterData(filterData);
  if ($$props.handleFilterChange === void 0 && $$bindings.handleFilterChange && handleFilterChange !== void 0) $$bindings.handleFilterChange(handleFilterChange);
  if ($$props.appellationNames === void 0 && $$bindings.appellationNames && appellationNames !== void 0) $$bindings.appellationNames(appellationNames);
  if ($$props.getWinesByAppellation === void 0 && $$bindings.getWinesByAppellation && getWinesByAppellation !== void 0) $$bindings.getWinesByAppellation(getWinesByAppellation);
  $$result.css.add(css);
  currentMinPrice = Math.round($leftValue);
  currentMaxPrice = Math.round($rightValue);
  leftPosition = calculatePosition($leftValue);
  rightPosition = calculatePosition($rightValue);
  leftLabelOffset = 14 / sliderWidth * 100;
  $$unsubscribe_rightValue();
  $$unsubscribe_leftValue();
  return `<aside class="bg-gray-100 w-1/4"> <div class="mb-6 border-t border-primary"><button class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"${add_attribute("aria-expanded", isDomainSectionExpanded, 0)} aria-controls="domain-list">NOS VINS PAR DOMAINES
			${validate_component(ArrowIcon, "ArrowIcon").$$render(
    $$result,
    {
      isSelected: isDomainSectionExpanded,
      class: "ml-2"
    },
    {},
    {}
  )}</button> <div id="domain-list"${add_attribute("class", "", 0)}>${filterData?.domains && filterData.domains.length > 0 ? `${each(filterData.domains, (domain) => {
    return `<div class="mb-2"><label class="${"block " + escape(
      filterData.selectedDomain === domain.uid ? "cursor-default" : "cursor-pointer hover:underline",
      true
    ) + " focus:no-underline"}"><input type="radio" name="domain"${add_attribute("value", domain.uid, 0)} ${filterData.selectedDomain === domain.uid ? "checked" : ""} class="hidden"${add_attribute("aria-label", `Domaine ${domain.name || "Nom non défini"}`, 0)}> <div class="flex items-center justify-between font-light"><span class="${escape(
      filterData.selectedDomain === domain.uid ? "font-bold" : "",
      true
    ) + " hover:text-gray-700"}">${escape(domain.name || "Nom non défini")}</span> </div></label> </div>`;
  })}` : `<p class="text-gray-500 text-sm" data-svelte-h="svelte-5cazz2">Aucun domaine disponible</p>`}</div></div>  <div class="mb-6 border-t border-primary"><button class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"${add_attribute("aria-expanded", isAppellationSectionExpanded, 0)} aria-controls="appellation-list">NOS VINS PAR APPELLATIONS
			${validate_component(ArrowIcon, "ArrowIcon").$$render(
    $$result,
    {
      isSelected: isAppellationSectionExpanded,
      class: "ml-2"
    },
    {},
    {}
  )}</button> <div id="appellation-list"${add_attribute("class", "", 0)}>${filterData?.appellations && filterData.appellations.length > 0 ? `<div class="word-cloud svelte-or95b0">${each(filterData.appellations, (appellation) => {
    return `<button type="button" class="${"appellation-word text-left " + escape(
      filterData.selectedAppellation === appellation.uid ? "font-bold text-primary" : "",
      true
    ) + " svelte-or95b0"}"${add_attribute("aria-pressed", filterData.selectedAppellation === appellation.uid, 0)}${add_attribute("aria-label", `Appellation ${appellationNames[appellation.uid] || appellation.name || "Nom inconnu"}`, 0)}>${escape(appellationNames[appellation.uid] || appellation.name || "Nom inconnu")} </button>`;
  })}</div>` : `<p class="text-gray-500 text-sm">${escape(filterData?.selectedDomain ? "Aucune appellation disponible pour ce domaine" : "Sélectionnez un domaine pour voir les appellations")}</p>`}</div></div>  <div class="border-black mb-6 border-t"><h3 class="mt-2 text-xl uppercase" data-svelte-h="svelte-4jrnmk">Prix</h3> <div class="relative pb-2 pt-10"><div class="slider-container relative h-[2px] w-full"><div class="bg-gray-300 absolute left-0 right-0 top-0 h-full"></div> <div class="absolute top-0 h-full bg-primary" style="${"left: " + escape(leftPosition, true) + "%; right: " + escape(100 - rightPosition, true) + "%;"}"></div> <div class="absolute left-0 right-0 top-[-32px]"><span class="absolute whitespace-nowrap text-sm" style="${"left: calc(" + escape(leftPosition, true) + "% + " + escape(leftLabelOffset, true) + "%); transform: translateX(-50%);"}">${escape(currentMinPrice)}€</span> <span class="absolute whitespace-nowrap text-sm" style="${"left: " + escape(rightPosition, true) + "%; transform: translateX(-50%);"}">${escape(currentMaxPrice)}€</span></div> <input type="range"${add_attribute("min", minPrice, 0)}${add_attribute("max", maxPrice, 0)} step="1" class="range-input svelte-or95b0" aria-label="Prix minimum"${add_attribute("value", $leftValue, 0)}> <input type="range"${add_attribute("min", minPrice, 0)}${add_attribute("max", maxPrice, 0)} step="1" class="range-input svelte-or95b0" aria-label="Prix maximum"${add_attribute("value", $rightValue, 0)}></div></div></div> <div class="mb-6 border-t border-primary"><h3 class="mb-2 mt-2 text-xl uppercase" data-svelte-h="svelte-wfm4gd">Couleurs</h3> <div class="grid grid-cols-3 gap-x-2 gap-y-4">${filterData?.colors && filterData.colors.length > 0 ? `${each(filterData.colors, (color) => {
    return `<label class="flex cursor-pointer items-center font-light"><input type="checkbox"${add_attribute("value", color.uid, 0)} ${filterData.selectedColors.has(color.uid) ? "checked" : ""} class="sr-only"${add_attribute("aria-label", `Couleur ${color.name || "Nom non défini"}`, 0)}> <div class="border-gray-300 relative mr-2 h-[17px] w-[17px] flex-shrink-0 border">${filterData.selectedColors.has(color.uid) ? `<div class="absolute inset-0 m-[2px] bg-primary"></div>` : ``}</div> <span class="truncate">${escape(color.name || "Nom non défini")}</span> </label>`;
  })}` : `<p class="text-gray-500 text-sm" data-svelte-h="svelte-1izomvt">Aucune couleur disponible</p>`}</div></div> </aside>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let uid;
  let currentRegion;
  let regionData;
  let wineResults;
  let { data } = $$props;
  let filterData = {
    colors: [],
    selectedColors: /* @__PURE__ */ new Set(),
    domains: [],
    selectedDomain: null,
    appellations: [],
    selectedAppellation: null,
    priceRange: { min: 5, max: 200 }
  };
  let appellationNames = {};
  function handleFilterChange(filterType, value) {
    if (filterType === "color") {
      if (typeof value === "string") {
        if (filterData.selectedColors.has(value)) {
          filterData.selectedColors.delete(value);
        } else {
          filterData.selectedColors.add(value);
        }
        filterData.selectedColors = new Set(filterData.selectedColors);
      } else if (value instanceof Set) {
        filterData.selectedColors = value;
      }
    } else if (filterType === "domain") {
      filterData.selectedDomain = value;
    } else if (filterType === "appellation") {
      filterData.selectedAppellation = value;
    } else if (filterType === "prix") {
      filterData.priceRange = value;
    }
    updateWineResults();
  }
  function updateWineResults() {
    let filtered = data.allWines?.filter((w) => w.regionUID === uid) || [];
    if (filterData.selectedColors.size > 0) {
      filtered = filtered.filter((wine) => {
        const wineColorUid = wine.couleur?.uid || wine.couleur;
        return wineColorUid && filterData.selectedColors.has(wineColorUid);
      });
    }
    if (filterData.selectedDomain) {
      const selectedDomain = filterData.domains.find((d) => d.uid === filterData.selectedDomain);
      if (selectedDomain) {
        filtered = filtered.filter((wine) => wine.domaineName === selectedDomain.name);
      }
    }
    if (filterData.selectedAppellation) {
      filtered = filtered.filter((wine) => {
        const appellationUid = wine.appellation?.uid || wine.appellation?.data?.appellation?.toLowerCase().replace(/\s+/g, "-");
        return appellationUid === filterData.selectedAppellation;
      });
    }
    if (filterData.priceRange) {
      filtered = filtered.filter((wine) => {
        const price = wine.prix || 0;
        return price >= filterData.priceRange.min && price <= filterData.priceRange.max;
      });
    }
    wineResults = filtered;
  }
  function getWinesByAppellation(appellationUid) {
    return data.allWines?.filter((wine) => {
      const wineAppellationUid = wine.appellation?.uid || wine.appellation?.data?.appellation?.toLowerCase().replace(/\s+/g, "-");
      return wineAppellationUid === appellationUid;
    }) || [];
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    uid = page.params.uid;
    currentRegion = data.regions.find((r) => r.uid === uid);
    regionData = currentRegion?.data;
    wineResults = data.allWines?.filter((w) => w.regionUID === uid) || [];
    {
      if (data) {
        filterData.colors = data.colors?.map((color) => ({
          uid: color.uid,
          name: color.data?.couleur || color.uid
        })) || [];
        const domainMap = /* @__PURE__ */ new Map();
        const appellationMap = /* @__PURE__ */ new Map();
        data.allWines?.forEach((wine) => {
          if (wine.domaineName && wine.domaineName !== "Domaine non spécifié") {
            const domainUid = wine.domaineName.toLowerCase().replace(/\s+/g, "-");
            if (!domainMap.has(domainUid)) {
              domainMap.set(domainUid, {
                uid: domainUid,
                name: wine.domaineName,
                appellations: []
              });
            }
          }
          if (wine.appellation?.data?.appellation) {
            const appellationName = wine.appellation.data.appellation;
            const appellationUid = wine.appellation.uid || appellationName.toLowerCase().replace(/\s+/g, "-");
            if (!appellationMap.has(appellationUid)) {
              appellationMap.set(appellationUid, {
                uid: appellationUid,
                name: appellationName
              });
              appellationNames[appellationUid] = appellationName;
            }
            if (wine.domaineName && wine.domaineName !== "Domaine non spécifié") {
              const domainUid = wine.domaineName.toLowerCase().replace(/\s+/g, "-");
              const domain = domainMap.get(domainUid);
              if (domain && !domain.appellations.some((a) => a.uid === appellationUid)) {
                domain.appellations.push({
                  uid: appellationUid,
                  name: appellationName
                });
              }
            }
          }
        });
        filterData.domains = Array.from(domainMap.values());
      }
    }
    $$rendered = `<div class="container mx-auto mt-12"><header class="mx-12 flex flex-grow items-center justify-between"><h1 class="mb-4 font-span text-5xl font-bold transition-all duration-500 ease-in-out">${escape(regionData?.region || "Region")}</h1> <button class="duration-600 hidden h-12 border border-primary px-20 font-light text-primary transition-all hover:bg-primary hover:text-secondary md:block" data-svelte-h="svelte-1aclc0b">Alcools et spiritueux</button></header> <p class="mx-12 mb-4 font-span text-lg font-bold transition-all duration-500 ease-in-out">${escape(regionData?.description?.[0]?.text || "")}</p> <div class="mx-12 flex">${validate_component(Aside, "Aside").$$render(
      $$result,
      {
        handleFilterChange,
        appellationNames,
        getWinesByAppellation,
        filterData
      },
      {
        filterData: ($$value) => {
          filterData = $$value;
          $$settled = false;
        }
      },
      {}
    )} <main class="mx-6">     <div class="my-12">${Object.keys(wineResults).length > 0 ? `<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">${each(wineResults, (wine) => {
      return `${validate_component(WineCard, "WineCard").$$render($$result, { wine }, {}, {})}`;
    })}</div>` : `<p class="top-1/2 w-full text-center" data-svelte-h="svelte-2z9cnm">Aucun vin trouvé pour cette sélection.</p>`}</div></main></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
