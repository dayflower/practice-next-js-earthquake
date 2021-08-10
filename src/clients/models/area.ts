// 地方 (e.g. "北海道地方")
export type ExternalApiAreaLv0 = {
  name: string;
  enName: string;
  officeName: string;
  children: string[];
};

// 都道府県 (e.g. "群馬県")
export type ExternalApiAreaLv1 = {
  name: string;
  enName: string;
  officeName: string;
  parent: string;
  children: string[];
};

// 都道府県内区域 (e.g. "南部")
export type ExternalApiAreaLv2 = {
  name: string;
  enName: string;
  parent: string;
  children: string[];
};

// 都道府県内地域 (e.g. "前橋・桐生地域")
export type ExternalApiAreaLv3 = {
  name: string;
  enName: string;
  parent: string;
  children: string[];
};

// 市区町村 (e.g. "前橋市")
export type ExternalApiAreaLv4 = {
  name: string;
  enName: string;
  kana: string;
  parent: string;
};

export type ExternalApiAreas = {
  centers: Record<string, ExternalApiAreaLv0>;
  offices: Record<string, ExternalApiAreaLv1>;
  class10s: Record<string, ExternalApiAreaLv2>;
  class15s: Record<string, ExternalApiAreaLv3>;
  class20s: Record<string, ExternalApiAreaLv4>;
};
