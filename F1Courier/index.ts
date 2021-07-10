import {
  calculateParcelByDimensionFunction,
  calculateParcelByWeightFunction,
  sum,
} from './functions';
import { CalculateCostInput } from './types';

export class F1Courier {
  calculateCost({ parcels, speedyShipping }: CalculateCostInput) {
    const allParcelsPricedAndLabeled = parcels
      .map((parcel) => calculateParcelByDimensionFunction(parcel))
      .map((parcel) => calculateParcelByWeightFunction(parcel));

    const allParcelsCosts = allParcelsPricedAndLabeled.map((parcel) => parcel.cost);
    const sumOfParcelsCost = sum(allParcelsCosts);

    const speedyShippingCost = speedyShipping ? sumOfParcelsCost : 0;

    return {
      allParcelsPricedAndLabeled,
      totalAmount: sum([sumOfParcelsCost, speedyShippingCost]),
      ...(speedyShippingCost && { speedyShippingCost }),
    };
  }
}
