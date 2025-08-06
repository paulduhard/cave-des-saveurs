import { c as createClient } from "../../chunks/prismicio.js";
const prerender = "auto";
const load = async ({ fetch, cookies }) => {
  const client = createClient({ fetch, cookies });
  const settings = await client.getSingle("settings");
  try {
    const [regions, colors] = await Promise.all([
      client.getAllByType("region"),
      client.getAllByType("couleur")
    ]);
    return {
      settings,
      regions: sortByOrderMenu(regions),
      colors: sortByOrderMenu(colors),
      title: "Cave des Saveurs"
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      settings,
      regions: [],
      colors: [],
      title: "Cave des Saveurs"
    };
  }
};
function sortByOrderMenu(items) {
  return items.sort((a, b) => a.data.ordre_menu - b.data.ordre_menu);
}
export {
  load,
  prerender
};
