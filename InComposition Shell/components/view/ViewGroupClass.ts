import {register} from "gnim/gobject";
import {ViewStyleable} from "../../resource/styleable/View-Styleable.ts";
import Gtk from "gi://Gtk?version=4.0";

import Orientation = Gtk.Orientation;
import {ViewClass} from "./ViewClass.ts";

@register({GTypeName: "ViewGroupClass"})
export class ViewGroupClass extends ViewClass {
	public static LayoutParams: { readonly FULL: -1; readonly WRAP: -2, } = { FULL: -1, WRAP: -2, } as const;

	constructor(styleable: ViewStyleable) {
		super(styleable);
	}
}