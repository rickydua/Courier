import { calculateParcelByDimensionFunction } from './functions';

export class F1Courier {
    const allParcelsPricedAndLabeled = parcels.map((parcel) =>
      calculateParcelByDimensionFunction(parcel)
    );

    const allParcelsCosts = allParcelsPricedAndLabeled.map((parcel) => parcel.cost);
    const sumOfParcelsCost = sum(allParcelsCosts);


      allParcelsPricedAndLabeled,
  }
}
