import { Pixel, PixelType } from "../dimension/Pixel.ts"
import {Degrees, DegreesType} from "../dimension/Degrees.ts"

export interface ViewStyleable {
	height: PixelType | Pixel | /* MATCH_PARFENT */ -1 | /* WRAP_CONTENT */ -2
	width: PixelType | Pixel | /* MATCH_PARFENT */ -1 | /* WRAP_CONTENT */ -2

	x?: PixelType | Pixel
	y?: PixelType | Pixel

	rotation?: DegreesType | Degrees

	visibility?: "visible" | "invisible" | "gone"

	tag?: string | undefined
}