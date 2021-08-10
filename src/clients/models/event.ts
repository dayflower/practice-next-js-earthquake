export type ExternalApiQuakeEvent = {
  // ID
  ctt: string;

  // 各地域震度
  // not empty if "震源・震度情報"
  int: {
    // 全国地方公共団体コード・都道府県コード (zerofill integer; 2桁; e.g. 03)
    code: string;

    // 最大震度 (integer)
    maxi: string;

    // 各地震度
    city: {
      // 全国地方公共団体コード・市区町村コード (zerofill integer; 7桁; e.g. 0320900)
      code: string;

      // 最大震度 (integer)
      maxi: string;
    }[];
  }[];

  // 情報タイプ ("発表" 固定?)
  ift: string;

  // 版? (integer)
  ser: number;

  // 震源地名 (e.g. 宮城県沖)
  // not empty if "震源・震度情報"
  anm: string;

  // 震源コード (詳細不明)
  // not empty if "震源・震度情報"
  acd: string;

  // 発生時刻 (ISO-8601 offset +09:00)
  at: string;

  // タイトル (e.g. "震源・震度情報")
  ttl: string;

  // 受信時刻 (ISO-8601 offset +09:00)
  rdt: string;

  // マグニチュード (float)
  mag: string;

  // 最大震度 (integer)
  // not empty if "震源・震度情報"
  maxi: string;

  // 震源座標 (e.g. `+lat+lng-unknown/`; unknown は zoom?)
  // not empty if "震源・震度情報"
  cod: string;
};
