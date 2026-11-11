import { register } from "gnim/gobject";
import { WindowConstructor } from "../resource/styleable/Window-Styleable"
import GObject from "gi://GObject?version=2.0";

@register({ GTypeName: "WindowClass" })
export class WindowClass extends GObject.Object {
	public constructor(styleable: WindowConstructor) {
		super();
	}
}