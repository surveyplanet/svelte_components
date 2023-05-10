import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        /**
             * Main alert title.
             */ title: string | null;
        /**
             * Optional alert subtitle.
             */ subtitle: string | null;
        /**
             * The type of alert.
             */ alertType?: "error" | "info" | "warning" | "success" | undefined;
        /**
             * Automatically hide alert after X milliseconds. A value of 0 means don't hide.
             */ hideDelay?: number | undefined;
        /**
             * Whether the alert needs to be confirmed before it is closed.
             */ confirm?: boolean | undefined;
        /**
             * Text label for the confirm button.
             */ confirmButtonLabel?: string | undefined;
        /**
             * Text label for the cancel confirm button.
             */ cancelButtonLabel?: string | undefined;
        /**
             * If provided alert displays a text input which must be valid before confirm button can be clicked.
             */ challenge?: string | undefined;
        /**
             * The label for the challenge input
             */ challengeLabel?: string | undefined;
        /**
             * The total time in milliseconds for the alert to animate in or out.
             */ animationMilliseconds?: number | undefined;
    };
    events: {
        confirm: CustomEvent<any>;
        open: CustomEvent<any>;
        in: CustomEvent<any>;
        close: CustomEvent<any>;
        out: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type AlertProps = typeof __propDef.props;
export type AlertEvents = typeof __propDef.events;
export type AlertSlots = typeof __propDef.slots;
export default class Alert extends SvelteComponentTyped<AlertProps, AlertEvents, AlertSlots> {
}
export {};
