import { SvelteComponentTyped } from "svelte";
import { type IconName } from './index';
export interface MenuData {
    id: string;
    label?: string;
    html?: string;
    icon?: IconName;
    meta?: string;
    divide?: boolean;
    inline?: boolean;
    selected?: boolean;
    submenu?: MenuData[];
}
declare const __propDef: {
    props: {
        /**
             * Menu data
             */ data?: MenuData[] | undefined;
    };
    events: {
        update: CustomEvent<any>;
        click: CustomEvent<any>;
        blur: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MenuProps = typeof __propDef.props;
export type MenuEvents = typeof __propDef.events;
export type MenuSlots = typeof __propDef.slots;
export default class Menu extends SvelteComponentTyped<MenuProps, MenuEvents, MenuSlots> {
}
export {};
