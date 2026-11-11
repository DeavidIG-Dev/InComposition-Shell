import {ViewClass} from "../ViewClass.ts";

export interface OnClickListener {
	onClick(self: ViewClass): void
}