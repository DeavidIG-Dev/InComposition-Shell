import Gtk from "gi://Gtk?version=4.0";
import {Color} from "./Color.ts";
import Gdk from "gi://Gdk?version=4.0";
import Graphene from "gi://Graphene?version=1.0";

export class Drawable {
	private snapshot: Gtk.Snapshot | null = null;

	public constructor(snapshot: Gtk.Snapshot) {
		this.snapshot = snapshot;
	}

	public drawLine(
		x: number,
		y: number,
		width: number,
		height: number,
		rotation: number = 0,
		color: Color
	): void {
		if (!this.snapshot) return;

		const angle = ((rotation % 360) + 360) % 360;
		const cx = x + width / 2;
		const cy = y + height / 2;

		this.snapshot.save();
		this.snapshot.translate(new Graphene.Point({ x: cx, y: cy }));
		this.snapshot.rotate(angle);

		this.snapshot.append_color(
			new Gdk.RGBA(color.getColors()),
			new Graphene.Rect().init(-width / 2, -height / 2, width, height)
		);

		this.snapshot.restore();
	}
}