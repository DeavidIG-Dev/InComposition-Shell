import { exit } from "system";
import { WindowClass } from "./WindowClass.ts";

export abstract class Application {
	private content_app: WindowClass | null = null;

	public constructor(private get_name: string) { }

	public abstract onStart(): void;

	public setContent(content: WindowClass): void {
		this.content_app = content;
	}

	public getNameInstance(): string {
		return this.get_name;
	}

	public getContent(): WindowClass {
		if (this.content_app) { return this.content_app; }

		console.log("Cannot content in the application");
		exit(1)
	}
}