import { SvelteComponentTyped } from "svelte";
export interface DropdownOptions {
    label: string;
    id: string;
    meta?: string;
    selected?: boolean;
}
declare const __propDef: {
    props: {
        options: DropdownOptions[];
        value?: string | null | undefined;
        label?: string | null | undefined;
        searchThreshold?: number | undefined;
        disabled?: boolean | undefined;
        required?: boolean | undefined;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DropdownProps = typeof __propDef.props;
export type DropdownEvents = typeof __propDef.events;
export type DropdownSlots = typeof __propDef.slots;
export default class Dropdown extends SvelteComponentTyped<DropdownProps, DropdownEvents, DropdownSlots> {
}
export {};
