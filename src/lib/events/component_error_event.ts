export class ComponentErrorEvent {
	error: Error;
	message: string;
	stack: string | undefined;

	constructor(error: Error) {
		this.error = error;
		this.message = error.message;
		this.stack = error.stack;
	}
}
