export type ColorType = Color

export class Color {
	private _red: number = 0
	private _green: number = 0
	private _blue: number = 0
	private _alpha: number = 255

	public constructor(_colors: [number, number, number])
	public constructor(_colors: [number, number, number, number])
	public constructor(_red: number, _green: number, _blue: number)
	public constructor(_red: number, _green: number, _blue: number, _alpha: number)
	public constructor(_colors: number | [number, number, number] | [number, number, number, number], _green?: number, _blue?: number, _alpha?: number) {
		if (Array.isArray(_colors)) {
			this._red = _colors[0]
			this._green = _colors[1]
			this._blue = _colors[2]
			if (_colors.length == 4) this._alpha = _colors[3]
		} else if (_green !== undefined && _blue !== undefined) {
			this._red = _colors
			this._green = _green
			this._blue = _blue
			if (_alpha !== undefined) this._alpha = _alpha
		} else {
			this._red = _colors
			this._green = _colors
			this._blue = _colors
		}
	}

	public getRed(): number { return this._red }

	public getGreen(): number { return this._green }

	public getBlue(): number { return this._blue }

	public getAlpha(): number { return this._alpha }

	public getColors(): { red: number, green :number, blue: number, alpha: number } { return { red: this._red / 255, green: this._green / 255, blue: this._blue / 255, alpha: this._alpha / 255 } }
}