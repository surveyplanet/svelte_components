import { writable } from 'svelte/store';
import type { DropdownOptions } from '$lib';
export const componentsStore = writable<DropdownOptions[]>();
