import { ExternalApiCoordinates } from '../clients/models/coordinate';
import { AreaCode } from '../models/area';
import { Coordinate } from '../models/coordinate';

export async function getCoordinates(
  uri: string
): Promise<Record<AreaCode, Coordinate>> {
  const res = await fetch(uri);
  if (!res.ok) {
    console.error(`fetch ${uri} failed.`, res.body);
    throw Error(`fetch ${uri} failed.`);
  }

  const coordinates = (await res.json()) as ExternalApiCoordinates;

  return Object.fromEntries([
    ...(
      Object.entries(coordinates.offices) as [string, [number, number]][]
    ).map((it) => [
      it[0] + '0',
      {
        lat: it[1][0],
        lng: it[1][1],
      },
    ]),

    ...(
      Object.entries(coordinates.class20s) as [string, [number, number]][]
    ).map((it) => [
      it[0],
      {
        lat: it[1][0],
        lng: it[1][1],
      },
    ]),
  ]);
}
