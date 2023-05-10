import { SvelteComponentTyped } from "svelte";
export interface FooterData {
    link?: string;
    label: string;
}
declare const __propDef: {
    props: {
        footerData?: FooterData[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type FooterProps = typeof __propDef.props;
export type FooterEvents = typeof __propDef.events;
export type FooterSlots = typeof __propDef.slots;
export default class Footer extends SvelteComponentTyped<FooterProps, FooterEvents, FooterSlots> {
}
export {};
