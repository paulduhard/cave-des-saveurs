import { c as createClient } from "../../../../chunks/prismicio.js";
async function load({ fetch, cookies }) {
  const client = createClient({ fetch, cookies });
  const page = await client.getSingle("epicerie");
  return {
    page,
    title: page.data.title,
    meta_description: page.data.meta_description,
    meta_title: page.data.meta_title || page.data.title,
    meta_image: page.data.meta_image.url
  };
}
async function entries() {
  return [{}];
}
export {
  entries,
  load
};
