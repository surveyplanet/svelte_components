export class ComponentEvent<T, U> {
	value: T;
	target: U;
	raw?: Event;

	constructor(value: T, target: U, raw?: Event) {
		this.value = value;
		this.target = target;
		this.raw = raw;
	}
}
