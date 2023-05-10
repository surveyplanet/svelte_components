import { SvelteComponentTyped } from "svelte";
import ICON_DATA from './_icon_data';
export type IconName = keyof typeof ICON_DATA;
export type IconSize = 8 | 12 | 16 | 20 | 24 | 32 | 48 | 64 | 128 | 256 | 512;
declare const __propDef: {
    props: {
        /**
             * The icon color. default: '#262b35'
             */ color?: string | undefined;
        /**
             * The icon width and height in pixes. default: 48
             */ size?: IconSize | undefined;
        /**
             * The icons stoke width, default 2
             */ strokeWidth?: number | undefined;
        /**
             * The name of the icon used to display the vector path
             */ name: IconName;
        /**
             * Display a red background behind the icon for debugging
             */ debug?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IconProps = typeof __propDef.props;
export type IconEvents = typeof __propDef.events;
export type IconSlots = typeof __propDef.slots;
export default class Icon extends SvelteComponentTyped<IconProps, IconEvents, IconSlots> {
}
export {};
