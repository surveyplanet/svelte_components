export class ComponentEvent<T> {
	value: T;
	target: EventTarget;
	raw?: Event;

	constructor(value: T, target: EventTarget, raw?: Event) {
		this.value = value;
		this.target = target;
		this.raw = raw;
	}
}
