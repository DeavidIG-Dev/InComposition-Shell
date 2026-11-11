import {ViewStyleable} from "../styleable/View-Styleable.ts";
import {ViewClass} from "../../components/view/ViewClass.ts";

export function View(styleable: ViewStyleable): ViewClass {
	return new ViewClass(styleable);
}