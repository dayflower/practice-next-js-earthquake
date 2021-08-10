import {
  ExternalApiAreaLv1,
  ExternalApiAreaLv2,
  ExternalApiAreaLv3,
  ExternalApiAreaLv4,
  ExternalApiAreas,
} from '../clients/models/area';
import { Area, AreaCode } from '../models/area';

export async function getAreas(uri: string): Promise<Record<AreaCode, Area>> {
  const res = await fetch(uri);
  if (!res.ok) {
    console.error(`fetch ${uri} failed.`, res.body);
    throw Error(`fetch ${uri} failed.`);
  }

  const areas = (await res.json()) as ExternalApiAreas;

  return Object.fromEntries([
    ...(Object.entries(areas.offices) as [string, ExternalApiAreaLv1][]).map(
      (it) => [
        it[0] + '0',
        {
          name: it[1].name,
          enName: it[1].enName,
        },
      ]
    ),

    ...(Object.entries(areas.class10s) as [string, ExternalApiAreaLv2][]).map(
      (it) => [
        it[0] + '0',
        {
          name: it[1].name,
          enName: it[1].enName,
        },
      ]
    ),

    ...(Object.entries(areas.class15s) as [string, ExternalApiAreaLv3][]).map(
      (it) => [
        it[0] + '0',
        {
          name: it[1].name,
          enName: it[1].enName,
        },
      ]
    ),

    ...(Object.entries(areas.class20s) as [string, ExternalApiAreaLv4][]).map(
      (it) => [
        it[0],
        {
          name: it[1].name,
          enName: it[1].enName,
          kana: it[1].kana,
        },
      ]
    ),
  ]);
}
