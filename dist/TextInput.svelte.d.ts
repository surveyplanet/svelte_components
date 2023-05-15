import { SvelteComponentTyped } from "svelte";
export type TextInputType = 'password' | 'search' | 'text';
import type { CleaveOptions } from 'cleave.js/options';
declare const __propDef: {
    props: {
        /**
             * The unique id of the input
             */ id: string;
        /**
             * The name of the input
             */ name: string;
        /**
             * The input type, default: 'text'
             */ type?: TextInputType | undefined;
        /**
             * The value of the input
             */ value?: string | null | undefined;
        /**
             * The input label
             */ label?: string | null | undefined;
        /**
             * The input placeholder
             */ placeholder?: string | null | undefined;
        /**
             * Whether the input should be a single or multi-line
             */ multiline?: boolean | undefined;
        /**
             * Whether the input should be read only. If you want the user to identify the input as in non-modified mode, use disabled instead.
             */ readonly?: boolean | undefined;
        /**
             * Whether the input should be disabled. If you want a non-modified element to appear like the rest of the form elements, use readonly instead.
             */ disabled?: boolean | undefined;
        /**
             * Cleave.js options for masked input. See: https://github.com/nosir/cleave.js
             */ cleaveOptions?: CleaveOptions | undefined;
        /**
             * A list of validation rules for the input. See: https://github.com/surveyplanet/utilities
             */ validationRules?: string[] | undefined;
        /**
             * A custom validation message to be used instead of the default
             */ validationMessage?: string | null | undefined;
        /**
             * Whether to automatically show the validation error message or not.
             */ validationHideMessage?: boolean | null | undefined;
    };
    events: {
        change: CustomEvent<any>;
        focus: CustomEvent<any>;
        blur: CustomEvent<any>;
        keydown: CustomEvent<any>;
        keyup: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextInputProps = typeof __propDef.props;
export type TextInputEvents = typeof __propDef.events;
export type TextInputSlots = typeof __propDef.slots;
export default class TextInput extends SvelteComponentTyped<TextInputProps, TextInputEvents, TextInputSlots> {
}
export {};
