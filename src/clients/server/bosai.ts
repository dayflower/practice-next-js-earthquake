import dayjs from 'dayjs';
import fetch from 'isomorphic-unfetch';
import { ExternalApiAreas } from '../models/area';
import { ExternalApiCoordinates } from '../models/coordinate';
import { ExternalApiQuakeEvent } from '../models/event';

// https://www.jma.go.jp/bosai/quake/data/list.json?__time__=202108071151
export async function getQuakeList(): Promise<ExternalApiQuakeEvent[]> {
  const timestamp = dayjs().format('YYYYMMDDHHmm');

  const res = await fetch(
    `https://www.jma.go.jp/bosai/quake/data/list.json?__time__=${timestamp}`
  );
  if (!res.ok) {
    console.error('fetch /bosai/quake/data/list.json failed.', res.body);
    throw Error('fetch /bosai/quake/data/list.json failed.');
  }

  return (await res.json()) as ExternalApiQuakeEvent[];
}

// https://www.jma.go.jp/bosai/common/const/area.json?__time__=202108071151
export async function getAreas(): Promise<ExternalApiAreas> {
  const timestamp = dayjs().format('YYYYMMDDHHmm');

  const res = await fetch(
    `https://www.jma.go.jp/bosai/common/const/area.json?__time__=${timestamp}`
  );
  if (!res.ok) {
    console.error('fetch /bosai/common/const/areas.json failed.', res.body);
    throw Error('fetch /bosai/common/const/areas.json failed.');
  }

  return (await res.json()) as ExternalApiAreas;
}

// https://www.jma.go.jp/bosai/common/const/xy.json?__time__=202108071151
export async function getCoordinates(): Promise<ExternalApiCoordinates> {
  const timestamp = dayjs().format('YYYYMMDDHHmm');

  const res = await fetch(
    `https://www.jma.go.jp/bosai/common/const/xy.json?__time__=${timestamp}`
  );
  if (!res.ok) {
    console.error('fetch /bosai/common/const/xy.json failed.', res.body);
    throw Error('fetch /bosai/common/const/xy.json failed.');
  }

  return (await res.json()) as ExternalApiCoordinates;
}
