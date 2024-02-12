// import { writable } from 'svelte/store';
import type { DropdownOption } from '$lib';
let componentsStore = $state<DropdownOption[]>();
export const createComponentsStore = {
	get componentsStore() {
		if (componentsStore === undefined) {
			return [];
		}
		return componentsStore;
	},
	set componentsStore(componentsData: DropdownOption[]) {
		componentsStore = componentsData;
	},
};
