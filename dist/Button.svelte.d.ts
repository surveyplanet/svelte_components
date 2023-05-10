import { SvelteComponentTyped } from "svelte";
export declare const BUTTON_MODES: Record<string, string>;
declare const __propDef: {
    props: {
        [x: string]: any;
        mode?: string | undefined;
        disabled?: boolean | undefined;
        loader?: boolean | undefined;
        round?: boolean | undefined;
        block?: boolean | undefined;
        action?: boolean | undefined;
        type?: "button" | "submit" | "reset" | undefined;
        form?: string | null | undefined;
        size?: "small" | "medium" | "large" | undefined;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
