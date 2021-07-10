import { ParcelType } from './enums';

export type ParcelAttributes = { x: number; y: number; z: number; weight: number };
export type CalculateCostInput = {
  parcels: ParcelAttributes[];
  speedyShipping?: boolean;
};
export type CalculateWeightCostInput = {
  type: ParcelType;
  weight: number;
  cost: number;
};
