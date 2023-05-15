import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        /**
             * Main modal title.
             */ title?: string | undefined;
        /**
             * Modal subtitle.
             */ subtitle?: string | undefined;
        /**
             * Whether the modal should be fullscreen.
             */ fullscreen?: boolean | undefined;
        /**
             * Whether should should be a transparent
             * background element which prevents interaction
             * with other elements on the stage.
             */ overlay?: boolean | undefined;
        visible?: boolean | undefined;
        animationMilliseconds?: number | undefined;
        size?: "small" | "medium" | "large" | undefined;
    };
    events: {
        open: CustomEvent<any>;
        in: CustomEvent<any>;
        out: CustomEvent<any>;
        close: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        header: {};
        body: {
            class: string;
        };
        footer: {};
    };
};
export type ModalProps = typeof __propDef.props;
export type ModalEvents = typeof __propDef.events;
export type ModalSlots = typeof __propDef.slots;
export default class Modal extends SvelteComponentTyped<ModalProps, ModalEvents, ModalSlots> {
}
export {};
