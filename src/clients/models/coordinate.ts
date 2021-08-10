export type ExternalApiCoordinate = [number, number];

export type ExternalApiCoordinates = {
  centers: Record<string, ExternalApiCoordinate>;
  offices: Record<string, ExternalApiCoordinate>;
  class20s: Record<string, ExternalApiCoordinate>;
};
