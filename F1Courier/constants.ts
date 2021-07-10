import { ParcelType } from './enums';

export const WEIGHTLIMIT: Record<keyof typeof ParcelType, number> = {
  SMALL: 1,
  MEDIUM: 3,
  LARGE: 6,
  XLARGE: 10,
  UNKNOWN: 0,
};

export const OVERWEIGHT_FEE = 2;
