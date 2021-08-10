import { AreaCode } from './area';

export type Coordinate = {
  lat: number;
  lng: number;
};

export type Coordinates = Record<AreaCode, Coordinate>;
