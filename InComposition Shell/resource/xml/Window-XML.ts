import { WindowClass } from "../../app/WindowClass.ts"
import type { WindowConstructor } from "../styleable/Window-Styleable.ts"

export function Window(styleable: WindowConstructor): WindowClass {
	return new WindowClass(styleable);
}