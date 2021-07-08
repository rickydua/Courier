import { CostAmount, ParcelDimension, ParcelType } from './enums';

export const calculateParcelByDimensionFunction = (parcel: Dimension) => {
  if (
    parcel.x < ParcelDimension.SMALL_PARCEL &&
    parcel.y < ParcelDimension.SMALL_PARCEL &&
    parcel.z < ParcelDimension.SMALL_PARCEL
  ) {
    return { type: ParcelType.SMALL, cost: CostAmount.SMALL };
  }

  if (
    parcel.x < ParcelDimension.MEDIUM_PARCEL &&
    parcel.y < ParcelDimension.MEDIUM_PARCEL &&
    parcel.z < ParcelDimension.MEDIUM_PARCEL
  ) {
    return { type: ParcelType.MEDIUM, cost: CostAmount.MEDIUM };
  }

  if (
    parcel.x < ParcelDimension.LARGE_PARCEL &&
    parcel.y < ParcelDimension.LARGE_PARCEL &&
    parcel.z < ParcelDimension.LARGE_PARCEL
  ) {
    return { type: ParcelType.LARGE, cost: CostAmount.LARGE };
  }

  if (
    parcel.x >= ParcelDimension.LARGE_PARCEL ||
    parcel.y >= ParcelDimension.LARGE_PARCEL ||
    parcel.z >= ParcelDimension.LARGE_PARCEL
  ) {
    return { type: ParcelType.XLARGE, cost: CostAmount.XLARGE };
  }

  return { type: ParcelType.UNKNOWN, cost: CostAmount.UNKNOWN };
};

export const sum = (inputs: number[]): number => {
  return inputs.reduce((accumulator, inputNumber) => inputNumber + accumulator, 0);
};
