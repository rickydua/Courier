import { calculateParcelByDimensionFunction } from './functions';

export class F1Courier {
  calculateCost(parcels: Dimension[]) {
    const allParcelsPriced = parcels.map((parcel) =>
      calculateParcelByDimensionFunction(parcel)
    );

    const totalAmount = allParcelsPriced.reduce(
      (accumulator, parcel) => parcel.cost + accumulator,
      0
    );

    return { allParcelsPriced, totalAmount };
  }
}
