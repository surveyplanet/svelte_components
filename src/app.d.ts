/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

interface SvelteCustomEvent extends CustomEvent {
	details: Event | KeyboardEvent;
}

interface StoryBookPlayArgs {
	canvasElement: HTMLElement;
	args: {
		clickHandler?(e: MouseEvent): void;
		changeHandler?(e: MouseEvent): void;
		keyupHandler?(e: Event): void;
		keydownHandler?(e: Event): void;
		blurHandler?(e: Event): void;
		focusHandler?(e: Event): void;
		challengeHandler?(e: Event): void;
		alertConfirmHandler?(e: SvelteCustomEvent): void;
		alertNotConfirmedHandler?(e: SvelteCustomEvent): void;
		alertOutHandler?(e: SvelteCustomEvent): void;
		alertInHandler?(e: SvelteCustomEvent): void;
	};
}
