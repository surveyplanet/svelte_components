import { SvelteComponentTyped } from "svelte";
import { type IconName } from './index';
export interface TabBarData {
    id: string;
    label?: string;
    html?: string;
    icon?: IconName;
    selected?: boolean;
    disabled?: boolean;
}
declare const __propDef: {
    props: {
        /**
             * Tab bar id
             */ id?: string | undefined;
        /**
             * Force tab to consume all available space
             */ grow?: boolean | undefined;
        /**
             * Objects to pass to the tab buttons
             */ data?: TabBarData[] | undefined;
    };
    events: {
        tabButton: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TabBarProps = typeof __propDef.props;
export type TabBarEvents = typeof __propDef.events;
export type TabBarSlots = typeof __propDef.slots;
export default class TabBar extends SvelteComponentTyped<TabBarProps, TabBarEvents, TabBarSlots> {
}
export {};
