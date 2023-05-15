import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The label of the input
             */ label?: string | undefined;
        /**
             * The unique id of the input
             */ id?: string | undefined;
        /**
             * The step of the input
             */ step?: number | undefined;
        /**
             * The minimum value of the input
             */ min?: number | undefined;
        /**
             * The maximum value of the input
             */ max?: number | undefined;
        /**
             * The value of the input
             */ value?: number | undefined;
        /**
             * Whether the input is disabled
             */ disabled?: boolean | undefined;
        /**
             * Whether the input is required
             */ required?: boolean | undefined;
        /**
             * Whether the value will change to the min or max value when the user tries to increment or decrement the value over the min or max value
             */ overflow?: boolean | undefined;
        /**
             * The placeholder of the input
             */ placeholder?: string | undefined;
        /**
             * The speed for the drag in pixels
             */ dragSpeed?: number | undefined;
    };
    events: {
        update: CustomEvent<any>;
        input: CustomEvent<any>;
        change: CustomEvent<any>;
        blur: CustomEvent<any>;
        focus: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SpinnerProps = typeof __propDef.props;
export type SpinnerEvents = typeof __propDef.events;
export type SpinnerSlots = typeof __propDef.slots;
export default class Spinner extends SvelteComponentTyped<SpinnerProps, SpinnerEvents, SpinnerSlots> {
}
export {};
