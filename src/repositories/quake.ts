import dayjs from 'dayjs';
import { ExternalApiQuakeEvent } from '../clients/models/event';
import { QuakeCityIntensity, QuakeEvent } from '../models/event';

const AREA_CODE_TOKYO = '13';

function coordinateFromString(source: string): { lat: number; lng: number } {
  // e.g. "+38.9+142.1-50000" /
  const res = source.match(
    /([-+][0-9]+(?:[.][0-9]+)?)([-+][0-9]+(?:[.][0-9]+)?)-/
  );

  if (res === null) {
    return {
      lat: 0.0,
      lng: 0.0,
    };
  }

  return {
    lat: parseFloat(res[1]),
    lng: parseFloat(res[2]),
  };
}

function hasTokyoQuakeIntensity(item: ExternalApiQuakeEvent): boolean {
  return item.int.some(filterTokyoQuakeIntensities);
}

function filterTokyoQuakeIntensities(item: { code: string }): boolean {
  return item.code === AREA_CODE_TOKYO;
}

export async function getQuakeList(uri: string): Promise<QuakeEvent[]> {
  const res = await fetch(uri);
  if (!res.ok) {
    console.error(`fetch ${uri} failed.`, res.body);
    throw Error(`fetch ${uri} failed.`);
  }

  const events = (await res.json()) as ExternalApiQuakeEvent[];

  return events
    .filter((it) => it.ttl === '震源・震度情報')
    .filter(hasTokyoQuakeIntensity)
    .map((it: ExternalApiQuakeEvent): QuakeEvent => {
      return {
        id: it.ctt,
        serial: it.ser,
        areaName: it.anm,
        areaCode: it.acd,
        at: dayjs(it.at),
        receivedAt: dayjs(it.rdt),
        magnitude: parseFloat(it.mag),
        maxIntensity: parseInt(it.maxi),
        coordinate: coordinateFromString(it.cod),
        intensities: it.int
          .filter((itt) => filterTokyoQuakeIntensities(itt))
          .map((itt) => {
            return {
              code: itt.code + '00000',
              maxIntensity: parseInt(itt.maxi),
              cities: itt.city.map((its): QuakeCityIntensity => {
                return {
                  code: its.code,
                  maxIntensity: parseInt(its.maxi),
                };
              }),
            };
          }),
      };
    });
}
