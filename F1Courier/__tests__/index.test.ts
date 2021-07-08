import { F1Courier } from '..';
import { CostAmount, ParcelType } from '../enums';

test('All parcels should be categorized and priced', () => {
    const courier = new F1Courier();
    const input: Dimension[] = [
        { x: 9, y: 4, z: 8 }, // small
        { x: 12, y: 9, z: 7 }, //medium
        { x: 60, y: 40, z: 6 }, // large
        { x: 102, y: 54, z: 33 }, // xlarge
        { x: 22, y: 34, z: 43 }, //medium
    ];

    const result = courier.calculateCost(input);

    // same order as input
    expect(result.allParcelsPriced).toEqual([
        { type: ParcelType.SMALL, cost: CostAmount.SMALL },
        { type: ParcelType.MEDIUM, cost: CostAmount.MEDIUM },
        { type: ParcelType.LARGE, cost: CostAmount.LARGE },
        { type: ParcelType.XLARGE, cost: CostAmount.XLARGE },
        { type: ParcelType.MEDIUM, cost: CostAmount.MEDIUM },
    ]);

    expect(result.totalAmount).toEqual(
        CostAmount.SMALL +
        CostAmount.MEDIUM +
        CostAmount.LARGE +
        CostAmount.XLARGE +
        CostAmount.MEDIUM
    );
});

test('should handle unknown (this case technically is impossible with proper types)', () => {
    const courier = new F1Courier();
    const input: Dimension[] = [
        { x: 9, y: 4, z: 8 }, // small
        // @ts-ignore
        { x: undefined, y: 4, z: -1 }, // unknown
    ];

    const result = courier.calculateCost(input);

    // same order as input
    expect(result.allParcelsPriced).toEqual([
        { type: ParcelType.SMALL, cost: CostAmount.SMALL },
        { type: ParcelType.UNKNOWN, cost: CostAmount.UNKNOWN },
    ]);

    expect(result.totalAmount).toEqual(CostAmount.SMALL);
});
