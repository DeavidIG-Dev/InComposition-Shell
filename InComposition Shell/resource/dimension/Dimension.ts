import {PixelType} from "./Pixel.ts";
import {PercentageType} from "./Percentaje.ts";

export type DimensionType = PixelType | PercentageType;

export class Dimension {
	public constructor(private dimension: number) { }

	public getDimension(): number { return this.dimension; }
}