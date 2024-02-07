// import { writable } from 'svelte/store';
import type { DropdownOptions } from '$lib';
let componentsStore = $state<DropdownOptions[]>();
export const createComponentsStore = {
	get componentsStore() {
		if (componentsStore === undefined) {
			return [];
		}
		return componentsStore;
	},
	set componentsStore(componentsData: DropdownOptions[]) {
		componentsStore = componentsData;
	},
};
