import app from "ags/gtk4/app"
import style from "./style.scss"
import { Application } from "./InComposition Shell/app/Application.ts";
import { Window } from "./InComposition Shell/resource/xml/Window-XML.ts";
import {View} from "./InComposition Shell/resource/xml/View-XML.ts";
import Gtk from "gi://Gtk?version=4.0";
import Astal from "gi://Astal?version=4.0";
import {ViewClass} from "./InComposition Shell/components/view/ViewClass.ts";
import {timeout} from "../../../../usr/share/ags/js/lib/time.ts";

class MainApplication extends Application {
	public onStart(): void {
		this.setContent(
			<Window visible={true} />
		)
	}
}

function f(): ViewClass {
	return (
		<View
			height={'40px'}
			width={'40px'}
			x={'0px'}
			y={'0px'}
			rotation={'45deg'}
			visibility={"visible"} />
	) as ViewClass
}

app.start({
	css: style,
	main(): void {
		let v: ViewClass;
		// new MainApplication("Frist-Instance").onStart();
		<window layer={Astal.Layer.OVERLAY}
		        namespace={"InComposition (Beta)"}
		        exclusivity={Astal.Exclusivity.EXCLUSIVE}
		        anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT }
		        css={"background: wheat"}
		        visible>
		        {v = f()}
		</window>
		timeout(1_500, () => {
			v.setRotation('0deg')
		})
	},
})