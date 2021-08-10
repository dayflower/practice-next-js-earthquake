export type Area = {
  name: string;
  enName: string;
  kana?: string;
};

export type AreaCode = string;

export type Areas = Record<AreaCode, Area>;
