import { Dimension } from "./Dimension.ts"
import { exit } from "system"
import {Enumerate} from "../../utils/Enumerate.ts"

export type DegreesType = `${Enumerate<361>}deg`

export class Degrees extends Dimension {
	constructor(dimension: DegreesType) {
		super(getDegrees(dimension))
	}
}

export function getDegrees(deg: DegreesType): number {
	const [text, symbol]: [number, string] = [Number(deg.substring(0, deg.length - 3)), deg.substring(deg.length - 3, deg.length)]

	if (symbol != 'deg') {
		print(`Invalid value for degrees type "${deg}" (${symbol}) in type`)
		exit(1)
	} else if (text < 0 && text > 359) {
		print(`Invalid value for degrees type "${deg}" (${text}) in size`)
		exit(1)
	}

	return text
}