import { OVERWEIGHT_FEE, WEIGHTLIMIT } from './constants';
import { ParcelCostAmount, ParcelDimension, ParcelType } from './enums';
import { CalculateWeightCostInput, ParcelAttributes } from './types';

export const calculateParcelByDimensionFunction = (parcel: ParcelAttributes) => {
  if (
    parcel.x < ParcelDimension.SMALL_PARCEL &&
    parcel.y < ParcelDimension.SMALL_PARCEL &&
    parcel.z < ParcelDimension.SMALL_PARCEL
  ) {
    return {
      type: ParcelType.SMALL,
      cost: ParcelCostAmount.SMALL,
      weight: parcel.weight,
    };
  }

  if (
    parcel.x < ParcelDimension.MEDIUM_PARCEL &&
    parcel.y < ParcelDimension.MEDIUM_PARCEL &&
    parcel.z < ParcelDimension.MEDIUM_PARCEL
  ) {
    return {
      type: ParcelType.MEDIUM,
      cost: ParcelCostAmount.MEDIUM,
      weight: parcel.weight,
    };
  }

  if (
    parcel.x < ParcelDimension.LARGE_PARCEL &&
    parcel.y < ParcelDimension.LARGE_PARCEL &&
    parcel.z < ParcelDimension.LARGE_PARCEL
  ) {
    return {
      type: ParcelType.LARGE,
      cost: ParcelCostAmount.LARGE,
      weight: parcel.weight,
    };
  }

  if (
    parcel.x >= ParcelDimension.LARGE_PARCEL ||
    parcel.y >= ParcelDimension.LARGE_PARCEL ||
    parcel.z >= ParcelDimension.LARGE_PARCEL
  ) {
    return {
      type: ParcelType.XLARGE,
      cost: ParcelCostAmount.XLARGE,
      weight: parcel.weight,
    };
  }

  return {
    type: ParcelType.UNKNOWN,
    cost: ParcelCostAmount.UNKNOWN,
    weight: parcel.weight,
  };
};

export const calculateParcelByWeightFunction = ({
  type,
  weight,
  cost,
}: CalculateWeightCostInput) => {
  if (type === ParcelType.UNKNOWN) {
    return { type, cost };
  }

  const extraWeight = Math.round(weight) - WEIGHTLIMIT[type];
  const result = extraWeight * OVERWEIGHT_FEE;
  const extraWeightFee = result < 0 ? 0 : result;

  return { type, cost: cost + extraWeightFee };
};

export const sum = (inputs: number[]): number => {
  return inputs.reduce((accumulator, inputNumber) => inputNumber + accumulator, 0);
};
