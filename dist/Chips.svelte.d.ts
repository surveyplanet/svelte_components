import { SvelteComponentTyped } from "svelte";
export interface ChipData {
    id: string;
    label?: string;
    selected?: boolean;
    title: string;
}
declare const __propDef: {
    props: {
        data?: ChipData[] | undefined;
        multiple?: boolean | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ChipsProps = typeof __propDef.props;
export type ChipsEvents = typeof __propDef.events;
export type ChipsSlots = typeof __propDef.slots;
export default class Chips extends SvelteComponentTyped<ChipsProps, ChipsEvents, ChipsSlots> {
}
export {};
