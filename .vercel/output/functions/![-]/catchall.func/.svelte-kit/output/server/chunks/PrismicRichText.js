import { c as create_ssr_component, a as add_attribute, v as validate_component, b as each, e as escape, m as missing_component } from "./ssr.js";
import { asTree } from "@prismicio/richtext";
import { isFilled } from "@prismicio/client";
import { P as PrismicImage, a as PrismicLink } from "./PrismicLink.js";
const PrismicEmbed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { field } = $$props;
  if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
  return ` ${isFilled.embed(field) ? `<div${add_attribute("data-oembed", field.embed_url, 0)}${add_attribute("data-oembed-type", field.type, 0)}${add_attribute("data-oembed-provider", field.provider_name, 0)}> <!-- HTML_TAG_START -->${field.html}<!-- HTML_TAG_END --></div>` : ``}`;
});
const DefaultComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dir;
  let { node } = $$props;
  if ($$props.node === void 0 && $$bindings.node && node !== void 0) $$bindings.node(node);
  dir = "direction" in node && node.direction === "rtl" ? "rtl" : void 0;
  return `${node.type === "heading1" ? `<h1${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</h1>` : `${node.type === "heading2" ? `<h2${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</h2>` : `${node.type === "heading3" ? `<h3${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</h3>` : `${node.type === "heading4" ? `<h4${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</h4>` : `${node.type === "heading5" ? `<h5${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</h5>` : `${node.type === "heading6" ? `<h6${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</h6>` : `${node.type === "paragraph" ? `<p${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</p>` : `${node.type === "preformatted" ? `<pre>${slots.default ? slots.default({}) : ``}</pre>` : `${node.type === "strong" ? `<strong>${slots.default ? slots.default({}) : ``}</strong>` : `${node.type === "em" ? `<em>${slots.default ? slots.default({}) : ``}</em>` : `${node.type === "list-item" ? `<li${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</li>` : `${node.type === "o-list-item" ? `<li${add_attribute("dir", dir, 0)}>${slots.default ? slots.default({}) : ``}</li>` : `${node.type === "group-list-item" ? `<ul>${slots.default ? slots.default({}) : ``}</ul>` : `${node.type === "group-o-list-item" ? `<ol>${slots.default ? slots.default({}) : ``}</ol>` : `${node.type === "image" ? `<p class="block-img">${validate_component(PrismicImage, "PrismicImage").$$render($$result, { field: node }, {}, {})}</p>` : `${node.type === "embed" ? `${validate_component(PrismicEmbed, "PrismicEmbed").$$render($$result, { field: node.oembed }, {}, {})}` : `${node.type === "hyperlink" ? `${validate_component(PrismicLink, "PrismicLink").$$render($$result, { field: node.data }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : `${node.type === "label" ? `<span${add_attribute("class", node.data.label, 0)}>${slots.default ? slots.default({}) : ``}</span>` : `${each(node.text.split("\n"), (line, index) => {
    return `${index > 0 ? `<br>` : ``}${escape(line)}`;
  })}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`;
});
const Serialize = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { components = {} } = $$props;
  let { children } = $$props;
  const CHILD_TYPE_RENAMES = {
    "list-item": "listItem",
    "o-list-item": "oListItem",
    "group-list-item": "list",
    "group-o-list-item": "oList"
  };
  function getComponent(child) {
    return components[CHILD_TYPE_RENAMES[child.type] || child.type] || DefaultComponent;
  }
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0) $$bindings.children(children);
  return `${each(children, (child) => {
    return `${validate_component(getComponent(child) || missing_component, "svelte:component").$$render($$result, { node: child.node }, {}, {
      default: () => {
        return ` ${child.children.length > 0 ? `${validate_component(Serialize, "svelte:self").$$render($$result, { children: child.children, components }, {}, {})}` : ``}`;
      }
    })}`;
  })}`;
});
const PrismicRichText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let children;
  let { field } = $$props;
  let { components = {} } = $$props;
  if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  children = asTree(field).children;
  return ` ${validate_component(Serialize, "Serialize").$$render($$result, { children, components }, {}, {})}`;
});
export {
  PrismicRichText as P
};
