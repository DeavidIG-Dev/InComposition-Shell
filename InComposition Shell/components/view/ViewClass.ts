import Gtk from "gi://Gtk?version=4.0"

import {register} from "gnim/gobject"
import {ViewStyleable} from "../../resource/styleable/View-Styleable.ts"
import {getPixel, Pixel, PixelType} from "../../resource/dimension/Pixel.ts"
import {Drawable} from "../../resource/Drawable.ts"
import {Color} from "../../resource/Color.ts"
import Orientation = Gtk.Orientation
import Snapshot = Gtk.Snapshot
import Align = Gtk.Align
import {Degrees, DegreesType, getDegrees} from "../../resource/dimension/Degrees.ts";

type Layout = SpecificationLayout | (-1)
type SpecificationLayout = Pixels | (-2)
type Pixels = (PixelType) | Pixel

type Degreess = DegreesType | Degrees;

@register({GTypeName: "ViewClass"})
export class ViewClass extends Gtk.Widget {
	public static LayoutParams: { readonly FULL: -1, readonly WRAP: -2, } = { FULL: -1, WRAP: -2, } as const
	private get_width_spec: number  = -2
	private get_height_spec: number = -2

	private get_x_spec: number = 0
	private get_y_spec: number = 0

	private get_rotation_spec: number = 0

	private get_visibility_spec: "visible" | "invisible" | "gone" = "visible"

	constructor(styleable: ViewStyleable) {
		super()

		this.set_name("ViewClass")
		this.set_visible(this.get_visibility_spec !== "gone")
		this.applyConfiguration(styleable.width, styleable.height)
		this.applySpecifications(styleable.x, styleable.y, styleable.rotation)

		this.invalidateLayout()
		this.invalidate()
	}

	protected onMeasure(width: number, height: number): [number, number] { return [width, height] }
	protected onLayout(left: number, top: number, right: number, bottom: number): void { }

	private conversions = {
		"rotation-x-y": (value: Pixels | Degreess): number => {
			let result: number

			if (value instanceof Pixel) result = value.getDimension()
			else if (value instanceof Degrees) result = value.getDimension()
			else if (value.endsWith('deg')) result = getDegrees(value as DegreesType)
			else if (value.endsWith('px')) result = getPixel(value as PixelType)
			else result = 0

			return result
		},
		"width-height": (value: SpecificationLayout): number => {
			let result: number

			if (value instanceof Pixel) result = value.getDimension()
			else if (value == -2) result = 0
			else result = getPixel(value)


			return result
		}
	}

	private applyConfiguration(width: Layout, height: Layout): void {
		const fw: boolean = width == ViewClass.LayoutParams.FULL
		const fh: boolean = height == ViewClass.LayoutParams.FULL

		this.set_hexpand(true)
		this.set_vexpand(true)
		this.set_halign(fw ? Align.FILL : Align.START)
		this.set_valign(fh ? Align.FILL : Align.START)

		if (!fw) this.get_width_spec = this.conversions["width-height"](width as SpecificationLayout)
		else this.get_width_spec = -1
		if (!fh) this.get_height_spec = this.conversions["width-height"](height as SpecificationLayout)
		else this.get_height_spec = -1
	}

	private applySpecifications(x: Pixels, y: Pixels, rotation: Degreess) {
		this.get_x_spec = this.conversions["rotation-x-y"](x)
		this.get_y_spec = this.conversions["rotation-x-y"](y)
		this.get_rotation_spec = this.conversions["rotation-x-y"](rotation)
	}

	public onDraw(drawable: Drawable): void {
		drawable.drawLine(this.get_x_spec, this.get_y_spec, this.get_width_spec, this.get_height_spec, this.get_rotation_spec, new Color(255, 255, 255, this.get_visibility_spec === "gone" ? 0 : 255))
	}

	public invalidateLayout(): void {
		this.queue_resize()
	}

	public invalidate(): void {
		this.queue_draw()
	}

	public setRotation(deg: DegreesType | Degrees): void {
		this.get_rotation_spec = this.conversions["rotation-x-y"](deg)
		this.invalidate()
	}

	private isQuarterTurn(): boolean {
		const a = ((this.get_rotation_spec % 360) + 360) % 360
		return a === 90 || a === 270
	}

	override vfunc_measure(orientation: Orientation, _: number): [number, number, number, number] {
		const [mw, mh] = this.onMeasure(
			Math.max(this.get_width_spec, 0),
			Math.max(this.get_height_spec, 0)
		)

		// con 90/270 la caja ocupada es height × width
		const [bw, bh] = this.isQuarterTurn() ? [mh, mw] : [mw, mh]

		const size = orientation === Orientation.HORIZONTAL
			? bw + this.get_x_spec
			: bh + this.get_y_spec

		return [size, size, -1, -1]
	}

	override vfunc_snapshot(snapshot: Snapshot) {
		this.onDraw(new Drawable(snapshot))
		super.vfunc_snapshot(snapshot)
	}

	override vfunc_size_allocate(width: number, height: number, baseline: number) {
		super.vfunc_size_allocate(width, height, baseline)
		this.onLayout(
			this.get_x_spec,
			this.get_y_spec,
			width,
			height
		)
	}
}