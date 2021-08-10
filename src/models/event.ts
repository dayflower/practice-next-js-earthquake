import { Dayjs } from 'dayjs';
import { AreaCode } from './area';
import { Coordinate } from './coordinate';

export type QuakeCityIntensity = {
  // 全国地方公共団体コード・市区町村コード (zerofill integer; 7桁; e.g. 0320900)
  code: AreaCode;

  // 最大震度 (integer)
  maxIntensity: number;
};

export type QuakeEvent = {
  // ID
  id: string;

  // 各地域震度
  intensities: {
    // 全国地方公共団体コード・都道府県コード (zerofill integer; 7桁; e.g. 0300000)
    // NOTE: 気象庁 API の response から 0 fill していることに注意
    code: string;

    // 最大震度 (integer)
    maxIntensity: number;

    // 各地震度
    cities: QuakeCityIntensity[];
  }[];

  // 版? (integer)
  serial: number;

  // 震源地名 (e.g. 宮城県沖)
  areaName: string;

  // 震源コード (詳細不明)
  areaCode: string;

  // 発生時刻 (ISO-8601 offset +09:00)
  at: Dayjs;

  // 受信時刻 (ISO-8601 offset +09:00)
  receivedAt: Dayjs;

  // マグニチュード (float)
  magnitude: number;

  // 最大震度 (integer)
  maxIntensity: number;

  // 震源座標
  coordinate: Coordinate;
};
