// Parser WKT extremamente simples para POLYGON ((lng lat, lng lat, ...))
// Retorna array de pares {latitude, longitude}
export function parseWktPolygon(wkt: string): { latitude: number; longitude: number }[] {
  try {
    const match = wkt.match(/POLYGON\s*\(\((.*)\)\)/i);
    if (!match) return [];
    const body = match[1].trim();
    return body.split(/\s*,\s*/).map(pair => {
      const [lngStr, latStr] = pair.trim().split(/\s+/);
      return { latitude: parseFloat(latStr), longitude: parseFloat(lngStr) };
    });
  } catch {
    return [];
  }
}

export function computeBoundingBox(coords: { latitude: number; longitude: number }[]) {
  if (!coords.length) return null;
  let minLat = coords[0].latitude, maxLat = coords[0].latitude;
  let minLon = coords[0].longitude, maxLon = coords[0].longitude;
  for (const c of coords) {
    if (c.latitude < minLat) minLat = c.latitude;
    if (c.latitude > maxLat) maxLat = c.latitude;
    if (c.longitude < minLon) minLon = c.longitude;
    if (c.longitude > maxLon) maxLon = c.longitude;
  }
  return { minLat, maxLat, minLon, maxLon, centerLat: (minLat + maxLat) / 2, centerLon: (minLon + maxLon) / 2 };
}