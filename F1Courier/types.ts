type Dimension = { x: number; y: number; z: number };
type CalculateCostInput = {
    parcels: Dimension[];
    speedyShipping?: boolean;
};
