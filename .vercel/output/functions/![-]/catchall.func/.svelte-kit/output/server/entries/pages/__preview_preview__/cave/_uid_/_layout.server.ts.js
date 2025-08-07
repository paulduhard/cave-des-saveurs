import { c as createClient } from "../../../../../chunks/prismicio.js";
import { isFilled, asText } from "@prismicio/client";
const prerender = "auto";
async function load({ fetch, cookies, params }) {
  const client = createClient({ fetch, cookies });
  const settings = await client.getSingle("settings");
  try {
    const [regions, colors, wines] = await Promise.all([
      client.getAllByType("region"),
      client.getAllByType("couleur"),
      client.getAllByType("vin", { fetchLinks: ["domaine.domaine"] })
    ]);
    const allWines = wines.map((w) => {
      let regionUID = null;
      let region = void 0;
      if (isFilled.contentRelationship(w.data.region)) {
        regionUID = w.data.region.uid ?? null;
        region = regions.find((r) => r.uid === regionUID);
      }
      let domaineName = "Domaine non spécifié";
      if (isFilled.contentRelationship(w.data.domaine) && w.data.domaine.data?.domaine) {
        domaineName = w.data.domaine.data.domaine;
      }
      let couleur = null;
      if (isFilled.contentRelationship(w.data.couleur)) {
        couleur = {
          uid: w.data.couleur.uid,
          data: w.data.couleur.data
        };
      }
      let appellation = null;
      if (isFilled.contentRelationship(w.data.appellation)) {
        appellation = {
          uid: w.data.appellation.uid,
          data: w.data.appellation.data
        };
      }
      return {
        ...w.data,
        regionUID,
        domaineName,
        couleur,
        appellation,
        uid: w.uid
      };
    });
    const uniqueRegions = allWines.reduce((acc, wine) => {
      const regionUID = wine.regionUID;
      if (!regionUID) return acc;
      const region = regions.find((r) => r.uid === regionUID);
      if (region && !acc.some((r) => r.id === region.id)) {
        acc.push(region);
      }
      return acc;
    }, []);
    const uid = params.uid;
    const currentRegion = regions.find((r) => r.uid === uid);
    let title = "Cave des Saveurs";
    let meta_title = "Cave des Saveurs";
    let meta_description = "Découvrez notre sélection de vins";
    let meta_image = null;
    if (currentRegion) {
      const regionName = currentRegion.data.region || "Région";
      const description = asText(currentRegion.data.description) || `Découvrez nos vins de ${regionName}`;
      title = `${regionName} - Cave des Saveurs`;
      meta_title = `Vins de ${regionName} - Cave des Saveurs`;
      meta_description = description;
      meta_image = settings.data.og_image || null;
    }
    return {
      settings,
      regions: sortByOrderMenu(regions),
      colors: sortByOrderMenu(colors),
      allWines,
      uniqueRegions,
      title,
      meta_title,
      meta_description,
      meta_image
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    let fallbackSettings;
    try {
      fallbackSettings = await client.getSingle("settings");
    } catch (settingsError) {
      console.error("Error fetching settings:", settingsError);
      fallbackSettings = null;
    }
    return {
      settings: fallbackSettings,
      regions: [],
      colors: [],
      allWines: [],
      uniqueRegions: [],
      title: "Cave des Saveurs",
      meta_title: "Cave des Saveurs",
      meta_description: "Découvrez notre sélection de vins",
      meta_image: null
    };
  }
}
function sortByOrderMenu(items) {
  return items.sort((a, b) => {
    const ordreA = a.data.ordre_menu ?? 0;
    const ordreB = b.data.ordre_menu ?? 0;
    return ordreA - ordreB;
  });
}
export {
  load,
  prerender
};
