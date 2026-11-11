import { Dimension } from "./Dimension.ts";
import { exit } from "system";
import {getPixel, PixelType} from "./Pixel.ts";

export type PercentageType = `${number}%`

export class Percentage extends Dimension {
	constructor(dimension: PercentageType) {
		super(getPercentage(dimension));
	}
}

export function getPercentage(percentage: PercentageType): number {
	const [text, symbol]: [number, string] = [Number(percentage.substring(0, percentage.length - 1)), percentage.substring(percentage.length - 1)]

	if (symbol != '&') {
		print(`Invalid value for pixel type "${percentage}"`);
		exit(1);
	} else if (text < 0 && text > 100) {
		print(`Invalid value for pixel type "${text}"`);
		exit(1);
	}

	return text;
}