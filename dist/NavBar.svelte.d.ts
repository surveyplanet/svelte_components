import { SvelteComponentTyped } from "svelte";
import { type IconName } from './index';
export interface NavBarData {
    icon: IconName;
    link?: string;
    title: string;
    id: string;
}
import { type MenuData } from './index';
declare const __propDef: {
    props: {
        data?: NavBarData[] | undefined;
        navMenuData?: MenuData[] | undefined;
        vertical?: boolean | undefined;
    };
    events: {
        'nav-link': CustomEvent<any>;
        click: CustomEvent<any>;
        update: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type NavBarProps = typeof __propDef.props;
export type NavBarEvents = typeof __propDef.events;
export type NavBarSlots = typeof __propDef.slots;
export default class NavBar extends SvelteComponentTyped<NavBarProps, NavBarEvents, NavBarSlots> {
}
export {};
