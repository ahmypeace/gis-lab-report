// Temple University Japan web map
// Paste ArcGIS API key between the quotation marks below.
const API_KEY = "AAPTao6CBftfHHKmki2rklKRV6Q..jL2VhcNXYo84cSrenRNMv996oG87FauSEuImDDiVqieGIQEIHE-NOTijx6wTzqaC8zfZvhtuiCPG9rrR6LayVBQhRebzri42XzAHc9N_QwTyec_ODJg0nUUtGyBwywTWzhz_rZQecy7KpUzlcr96qr333cNkK4_UYCH6BNTu6yoAv9ekoDAjqr-8N-p_b8zvMYMXKll65fN9A_0e7CMG5trwB_HGQ9qvDrsn0X0QUUXCO2m2gKOrgT-3bg..AT1_i2BzHJi1";

const frame = document.getElementById("webmap-frame");

// Wait until the ArcGIS library has loaded (up to 10 seconds)
for (let i = 0; i < 100 && typeof $arcgis === "undefined"; i++) {
  await new Promise((r) => setTimeout(r, 100));
}

// Without a key or the library, show a picture of the map so the section is never blank
if (API_KEY === "PASTE_YOUR_API_KEY_HERE" || typeof $arcgis === "undefined") {
  frame.innerHTML = '<img src="assets/img/temple-japan-map.png" alt="Temple University Japan web map">';
} else {
  const [esriConfig, Map, MapView, Graphic, GraphicsLayer, Point, Polygon,
         SimpleMarkerSymbol, SimpleFillSymbol] = await $arcgis.import([
    "@arcgis/core/config.js",
    "@arcgis/core/Map.js",
    "@arcgis/core/views/MapView.js",
    "@arcgis/core/Graphic.js",
    "@arcgis/core/layers/GraphicsLayer.js",
    "@arcgis/core/geometry/Point.js",
    "@arcgis/core/geometry/Polygon.js",
    "@arcgis/core/symbols/SimpleMarkerSymbol.js",
    "@arcgis/core/symbols/SimpleFillSymbol.js"
  ]);

  esriConfig.apiKey = API_KEY;

  const map = new Map({ basemap: "arcgis/topographic" });

  const view = new MapView({
    map: map,
    center: [139.6694, 35.6447], // Longitude, latitude
    zoom: 9,
    container: "webmap-frame"
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  // Temple University Japan point in Temple Cherry
  graphicsLayer.add(new Graphic({
    geometry: new Point({ longitude: 139.6694, latitude: 35.6447 }),
    symbol: new SimpleMarkerSymbol({
      color: [157, 34, 53],
      outline: { color: [255, 255, 255], width: 2 }
    }),
    attributes: {
      Name: "Temple University Japan",
      Description: "Sangenjaya campus, Setagaya-ku, Tokyo"
    },
    popupTemplate: { title: "{Name}", content: "{Description}" }
  }));

  // Tokyo polygon (lon, lat)
  graphicsLayer.add(new Graphic({
    geometry: new Polygon({
      rings: [[
        [139.461006, 35.783296], // north
        [139.837626, 35.622583], // east
        [139.779839, 35.549393], // southeast (Haneda)
        [139.474549, 35.510557], // south
        [138.944649, 35.854564], // west
        [139.461006, 35.783296]  // close ring
      ]]
    }),
    symbol: new SimpleFillSymbol({
      color: [220, 220, 220, 0.3],
      outline: { color: [0, 0, 0], width: 2 }
    }),
    attributes: { Name: "Tokyo", Description: "Tokyo" },
    popupTemplate: { title: "{Name}", content: "{Description}" }
  }));
}
