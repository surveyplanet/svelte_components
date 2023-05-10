import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        breadcrumbs?: {
            name: string;
            url: string;
        }[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BreadcrumbsProps = typeof __propDef.props;
export type BreadcrumbsEvents = typeof __propDef.events;
export type BreadcrumbsSlots = typeof __propDef.slots;
export default class Breadcrumbs extends SvelteComponentTyped<BreadcrumbsProps, BreadcrumbsEvents, BreadcrumbsSlots> {
}
export {};
