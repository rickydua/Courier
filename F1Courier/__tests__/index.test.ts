import { F1Courier } from '..';
import { OVERWEIGHT_FEE, WEIGHTLIMIT } from '../constants';
import { ParcelCostAmount, ParcelType } from '../enums';
import { ParcelAttributes } from '../types';

test('All parcels should be categorized and priced by dimensions', () => {
  const courier = new F1Courier();

  // assigning weight 0 to test only calculateCost by dimension
  const input: ParcelAttributes[] = [
    { x: 9, y: 4, z: 8, weight: 0 }, // small
    { x: 12, y: 9, z: 7, weight: 0 }, //medium
    { x: 60, y: 40, z: 6, weight: 0 }, // large
    { x: 102, y: 54, z: 33, weight: 0 }, // xlarge
    { x: 22, y: 34, z: 43, weight: 0 }, //medium
  ];

  const result = courier.calculateCost({ parcels: input });

  // same order as input
  expect(result).toStrictEqual({
    allParcelsPricedAndLabeled: [
      { type: ParcelType.SMALL, cost: ParcelCostAmount.SMALL },
      { type: ParcelType.MEDIUM, cost: ParcelCostAmount.MEDIUM },
      { type: ParcelType.LARGE, cost: ParcelCostAmount.LARGE },
      { type: ParcelType.XLARGE, cost: ParcelCostAmount.XLARGE },
      { type: ParcelType.MEDIUM, cost: ParcelCostAmount.MEDIUM },
    ],
    totalAmount:
      ParcelCostAmount.SMALL +
      ParcelCostAmount.MEDIUM +
      ParcelCostAmount.LARGE +
      ParcelCostAmount.XLARGE +
      ParcelCostAmount.MEDIUM,
  });
});

test('output should be 0 if passing in empty array', () => {
  const courier = new F1Courier();
  const input: ParcelAttributes[] = [];

  const result = courier.calculateCost({ parcels: input });

  expect(result).toStrictEqual({
    allParcelsPricedAndLabeled: [],
    totalAmount: 0,
  });
});

test('should handle unknown (this case technically is impossible with proper types)', () => {
  const courier = new F1Courier();

  // assigning weight 0 to test only calculateCost by dimension
  const input: ParcelAttributes[] = [
    { x: 9, y: 4, z: 8, weight: 0 }, // small
    // @ts-ignore
    { x: undefined, y: 4, z: -1 }, // unknown
  ];

  const result = courier.calculateCost({ parcels: input });

  // same order as input
  expect(result).toStrictEqual({
    allParcelsPricedAndLabeled: [
      { type: ParcelType.SMALL, cost: ParcelCostAmount.SMALL },
      { type: ParcelType.UNKNOWN, cost: ParcelCostAmount.UNKNOWN },
    ],
    totalAmount: ParcelCostAmount.SMALL,
  });
});

test('Should handle speedyShipping costs', () => {
  const courier = new F1Courier();

  // assigning weight 0 to test only calculateCost by dimension
  const input: ParcelAttributes[] = [
    { x: 9, y: 4, z: 8, weight: 0 }, // small
    { x: 12, y: 9, z: 7, weight: 0 }, //medium
  ];

  const result = courier.calculateCost({ parcels: input, speedyShipping: true });
  const shouldBeTotalAmount = (ParcelCostAmount.SMALL + ParcelCostAmount.MEDIUM) * 2;

  // same order as input
  expect(result).toStrictEqual({
    allParcelsPricedAndLabeled: [
      { type: ParcelType.SMALL, cost: ParcelCostAmount.SMALL },
      { type: ParcelType.MEDIUM, cost: ParcelCostAmount.MEDIUM },
    ],
    totalAmount: shouldBeTotalAmount,
    speedyShippingCost: shouldBeTotalAmount / 2,
  });
});

test('should handle weight fee for overweight parcels', () => {
  const courier = new F1Courier();

  const parcel1 = { x: 9, y: 4, z: 8, weight: 2.4 }; // small
  const parcel2 = { x: 12, y: 9, z: 7, weight: 5.3 }; //medium

  const input: ParcelAttributes[] = [parcel1, parcel2];

  const result = courier.calculateCost({ parcels: input });

  const extraWeightOfParcel1 =
    Math.round(parcel1.weight) - WEIGHTLIMIT[ParcelType.SMALL];
  const parcel1ShouldBeCost =
    ParcelCostAmount.SMALL + extraWeightOfParcel1 * OVERWEIGHT_FEE;

  const extraWeightOfParcel2 =
    Math.round(parcel2.weight) - WEIGHTLIMIT[ParcelType.MEDIUM];
  const parcel2ShouldBeCost =
    ParcelCostAmount.MEDIUM + extraWeightOfParcel2 * OVERWEIGHT_FEE;

  // same order as input
  expect(result).toStrictEqual({
    allParcelsPricedAndLabeled: [
      { type: ParcelType.SMALL, cost: parcel1ShouldBeCost },
      { type: ParcelType.MEDIUM, cost: parcel2ShouldBeCost },
    ],
    totalAmount: parcel1ShouldBeCost + parcel2ShouldBeCost,
  });
});

test('should apply no weight fee for underweight or equals wight parcels', () => {
  const courier = new F1Courier();

  const parcel1 = { x: 9, y: 4, z: 8, weight: 1 }; // small - equal weight
  const parcel2 = { x: 12, y: 9, z: 7, weight: 2.3 }; //medium

  const input: ParcelAttributes[] = [parcel1, parcel2];

  const result = courier.calculateCost({ parcels: input });

  const parcel1ShouldBeCost = ParcelCostAmount.SMALL;

  const parcel2ShouldBeCost = ParcelCostAmount.MEDIUM;

  // same order as input
  expect(result).toStrictEqual({
    allParcelsPricedAndLabeled: [
      { type: ParcelType.SMALL, cost: parcel1ShouldBeCost },
      { type: ParcelType.MEDIUM, cost: parcel2ShouldBeCost },
    ],
    totalAmount: parcel1ShouldBeCost + parcel2ShouldBeCost,
  });
});

test('should ignore weight calculation if unknown type parcel', () => {
  const courier = new F1Courier();

  const parcel1 = { x: 9, y: 4, z: 8, weight: 2 }; // small - equal weight

  // @ts-ignore
  const parcel2 = { x: undefined, y: 9, z: 7, weight: 6 }; //medium

  // @ts-ignore
  const input: ParcelAttributes[] = [parcel1, parcel2];

  const result = courier.calculateCost({ parcels: input });

  const extraWeightOfParcel1 =
    Math.round(parcel1.weight) - WEIGHTLIMIT[ParcelType.SMALL];

  const parcel1ShouldBeCost =
    ParcelCostAmount.SMALL + extraWeightOfParcel1 * OVERWEIGHT_FEE;

  const parcel2ShouldBeCost = 0;

  // same order as input
  expect(result).toStrictEqual({
    allParcelsPricedAndLabeled: [
      { type: ParcelType.SMALL, cost: parcel1ShouldBeCost },
      { type: ParcelType.UNKNOWN, cost: parcel2ShouldBeCost },
    ],
    totalAmount: parcel1ShouldBeCost + parcel2ShouldBeCost,
  });
});
