import { Dimension } from "./Dimension.ts";
import { exit } from "system";

export type PixelType = `${number}px`

export class Pixel extends Dimension {
	constructor(dimension: PixelType) {
		super(getPixel(dimension));
	}
}

export function getPixel(px: PixelType): number {
	const [text, symbol]: [number, string] = [Number(px.substring(0, px.length - 2)), px.substring(px.length - 2)]

	if (symbol != 'px') {
		print(`Invalid value for pixel type "${px}"`);
		exit(1);
	}

	return text;
}