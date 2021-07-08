import { calculateParcelByDimensionFunction, sum } from './functions';

export class F1Courier {
  calculateCost({ parcels, speedyShipping }: CalculateCostInput) {
    const allParcelsPricedAndLabeled = parcels.map((parcel) =>
      calculateParcelByDimensionFunction(parcel)
    );

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
