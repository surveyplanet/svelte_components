/**
 * Utility for validating form inputs and displaying error messages.
 *
 * @function validate
 * @param {HTMLInputElement} input The input element to validate
 * @param {String} fields.id input id
 * @constructor
 * @example
 * <script>
 * const inputEl = getElementById('email');
 * function submit () {
 *   const errors = validate( inputEl );
 *   if (!errors) { fetch(...) }
 * }
 * </script>
 *
 * <label for="email">Email</label>
 * <input type="email"
 *   id="email"
 *   name="email"
 *   data-validate-rules='require,email'
 *   data-validate-message="My custom validation message (or just use the default)"
 *   data-validate-hide-errors />
 */

interface ValidatorRule {
	name: string;
	message: string;
	description: string;
	example?: string;
	parameterRequired: boolean;
	hook: (input: HTMLInputElement, param: string) => boolean;
}

interface ValidatorError {
	id: string;
	name: string;
	class: string;
	error: string;
	rule: string;
	parameter?: string;
}

/**
 * A collection of regular expressions used for validation.
 *
 * @property REGEXP
 * @static
 * @type Object
 */
const REGEXP = {
	decimal: /^-?[0-9]*\.?[0-9]+$/,
	url: /\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/i,
	email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	numeric: /^[0-9]+$/,
	integer: /^-?[0-9]+$/,
	hasNumber: /[0-9]/,
	hasUpper: /[A-Z]/,
	hasLower: /[a-z]/,
	creditCard: /^[\d\-\s]+$/,
	phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
	base64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i,
	ip: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
	alphaDash: /^[a-z0-9_-]+$/i,
	alphaNumeric: /^[a-z0-9]+$/i,
	alpha: /^[a-z]+$/i,
};

/**
 * All the rule data for validator.
 *
 * @property RULES
 * @static
 * @type ValidatorRule[]
 */
export const RULES: ValidatorRule[] = [
	{
		name: 'required',
		message: 'The %s field is required.',
		description: 'Must not be empty.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			const { value } = field;
			if (field.type === 'checkbox' || field.type === 'radio') {
				return field.checked;
			}
			return value.length > 0;
		},
	},
	{
		name: 'matches',
		message: 'The %s field does not match the %s field.',
		description: 'Must match another field value.',
		parameterRequired: true,
		hook: (field: HTMLInputElement, matchName: string) => {
			const inputs = document.getElementsByName(matchName);
			const input = inputs.item(0) as HTMLInputElement;
			return input.value === field.value;
		},
	},
	{
		name: 'url',
		message: 'The %s field must contain a valid url.',
		description: 'Must be a valid url.',
		example: 'http://www.example.com',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.url.test(field.value.trim());
		},
	},
	{
		name: 'email',
		message: 'The %s field must contain a valid email address.',
		description: 'Must be a valid email address.',
		example: 'email@example.com',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.email.test(field.value.trim());
		},
	},
	{
		name: 'emails',
		message: 'The %s field must contain all valid email addresses.',
		description: 'Must be a comma separated list of valid email addresses.',
		example: 'email1@example.com, email2@example.com',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			const result = field.value.split(',');
			return result.every((item) => REGEXP.email.test(item.trim()));
		},
	},
	{
		name: 'minLength',
		message: 'The %s field must be at least %s characters in length.',
		description: 'Must be at least X characters long.',
		parameterRequired: true,
		hook: (field: HTMLInputElement, param: string) => {
			if (!REGEXP.numeric.test(field.value)) {
				return false;
			}
			return field.value.length >= parseInt(param, 10);
		},
	},
	{
		name: 'maxLength',
		message: 'The %s field must not exceed %s characters in length.',
		description: 'Must be no longer than X characters.',
		parameterRequired: true,
		hook: (field: HTMLInputElement, param: string) => {
			if (!REGEXP.numeric.test(field.value)) {
				return false;
			}
			return field.value.length <= parseInt(param, 10);
		},
	},
	{
		name: 'exactLength',
		message: 'The %s field must be exactly %s characters in length.',
		description: 'Must be exactly X characters long.',
		parameterRequired: true,
		hook: (field: HTMLInputElement, param: string) => {
			if (!REGEXP.numeric.test(field.value)) {
				return false;
			}
			return field.value.length === parseInt(param, 10);
		},
	},
	{
		name: 'greaterThan',
		message: 'The %s field must contain a number greater than %s.',
		description: 'Must be greater than X.',
		parameterRequired: true,
		hook: (field: HTMLInputElement, param: string) => {
			if (!REGEXP.decimal.test(field.value)) {
				return false;
			}
			return parseFloat(field.value) > parseFloat(param);
		},
	},
	{
		name: 'equals',
		message: 'The %s field must equal %s.',
		description: 'Must be equal to X.',
		parameterRequired: true,
		hook: (field: HTMLInputElement, param: string) => {
			if (!param) {
				return false;
			}
			return field.value.trim() === String(param).trim();
		},
	},
	{
		name: 'lessThan',
		message: 'The %s field must contain a number less than %s.',
		description: 'Must be less than X.',
		parameterRequired: true,
		hook: (field: HTMLInputElement, param: string) => {
			if (!REGEXP.decimal.test(field.value)) {
				return false;
			}
			return parseFloat(field.value) < parseFloat(param);
		},
	},
	{
		name: 'alpha',
		message: 'The %s field must only contain alphabetical characters.',
		description: 'Can only contain alphabetical characters (A-z).',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.alpha.test(field.value);
		},
	},
	{
		name: 'alphaNumeric',
		message: 'The %s field must only contain alpha-numeric characters.',
		description: 'Can only contain alpha-numeric characters (A-z, 0-9).',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.alphaNumeric.test(field.value);
		},
	},
	{
		name: 'alphaDash',
		message:
			'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
		description:
			'Can only contain alpha-numeric characters, underscores, or dashes.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.alphaDash.test(field.value);
		},
	},
	{
		name: 'numeric',
		message: 'The %s field must only contain a whole number.',
		description: 'Must be a whole (non-negative) number.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.numeric.test(field.value);
		},
	},
	{
		name: 'integer',
		message: '%s must be an number.',
		description: 'Must be an integer; either positive or negative.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.integer.test(field.value);
		},
	},
	{
		name: 'decimal',
		message: 'The %s field must contain a decimal number.',
		description:
			'Must be a valid integer or decimal consist of two parts: an integer and a fraction separated by a decimal point.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.decimal.test(field.value);
		},
	},
	{
		name: 'ip',
		message: 'The %s field must contain a valid IP address.',
		description: 'Must be a valid IP address.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.ip.test(field.value);
		},
	},
	{
		name: 'base64',
		message: 'The %s field must contain a base64 string.',
		description: 'Must be a base64 string.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.base64.test(field.value);
		},
	},

	{
		name: 'phone',
		message: 'The %s field must contain a valid phone number.',
		description: 'Must be a valid phone number.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.phone.test(field.value);
		},
	},

	{
		name: 'cvc',
		message: 'The %s field must contain a valid CVC.',
		description: 'Must be a valid credit card cvc.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return (
				/^\d+$/.test(field.value) &&
				field.value.length >= 3 &&
				field.value.length <= 4
			);
		},
	},
	{
		name: 'creditCard',
		message: 'The %s field must contain a valid credit card number.',
		description: 'Must be a valid credit card number.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			if (REGEXP.creditCard.test(field.value)) {
				return false;
			}

			let nCheck = 0;
			let nDigit = 0;
			let bEven = false;
			const strippedField = field.value.replace(/\D/g, '');
			let n = strippedField.length - 1;

			while (n >= 0) {
				const cDigit = strippedField.charAt(n);
				nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
				n--;
			}
			return nCheck % 10 === 0;
		},
	},
	{
		name: 'fileType',
		message: 'The %s field must contain only %s files.',
		description:
			'Must be a comma separated list of file types e.g.: gif,png,jpg.',
		parameterRequired: false,
		hook: (field: HTMLInputElement, param: string) => {
			const extTypes = param.split(',').map((e) => e.trim());
			const ext = field.value.split('.').pop();
			if (!ext?.length) {
				return false;
			}
			return extTypes.includes(ext.trim());
		},
	},
	{
		name: 'hasNumber',
		message: 'The %s field must contain at least one number.',
		description: 'Must contain a number.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.hasNumber.test(field.value);
		},
	},
	{
		name: 'hasUpper',
		message: 'The %s field must contain at least one upper case letter.',
		description: 'Must contain an upper case letter.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.hasUpper.test(field.value);
		},
	},
	{
		name: 'hasLower',
		message: 'The %s field must contain at least one lower case letter.',
		description: 'Must contain a lower case letter.',
		parameterRequired: false,
		hook: (field: HTMLInputElement) => {
			return REGEXP.hasLower.test(field.value);
		},
	},
	{
		name: 'custom',
		message: 'The %s field is invalid.',
		description: 'Must match a regular expression.',
		parameterRequired: true,
		hook: (field: HTMLInputElement, param: string) => {
			// This has difficulty parsing character classes
			// like: \d, \D, \s, \S, \w, |W
			// const match = param.match(/^\/(.*?)\/([gimy]*)$/);
			const match = /^\/(.*?)\/([gimy]*)$/.exec(param); // <-- try this out... see if it works better.
			if (!match?.length) {
				return false;
			}
			const regexp = new RegExp(match[1], match[2]);
			// console.log regex, field.value, regex.test(field.value)
			return regexp.test(field.value);
		},
	},
];

/**
 * Validate a form input.
 * @function validate
 * @return {ValidatorError[]}
 */
export default function validate(input: HTMLInputElement): ValidatorError[] {
	const errors: ValidatorError[] = [];

	const hideErrors =
		Object.prototype.hasOwnProperty.call(
			input.dataset,
			'validate-hide-errors'
		) && input.dataset['validate-hide-errors'] !== 'false';

	if (!hideErrors) {
		removeAllValidationErrors();
	}

	const ruleData = input.dataset['validate-rules'];
	const label = document.querySelector<HTMLLabelElement>(
		`label[for="${input.id}"]`
	);

	const labelText: string = label
		? label.innerText
		: input.placeholder || input.name || '';

	if (!ruleData?.length) {
		return errors;
	}

	const rules = ruleData.split(',').map((rule) => rule.trim());

	for (const ruleName of rules) {
		const rule = getRule(ruleName);
		const parts = parseRuleParams(ruleName) as string[];

		if (!rule || !parts.length) {
			continue;
		}

		const method = parts[1];
		const param = parts[2];
		const valid = rule.hook.apply({}, [input, param]);

		if (!valid) {
			const msg = input.dataset['validate-message'] ?? rule.message;

			const errMsg = parseValidationMessage(msg, labelText, param);
			const err: ValidatorError = {
				id: input.id,
				name: input.name,
				class: input.className,
				error: errMsg,
				rule: method,
			};

			if (param) {
				err.parameter = param;
			}

			errors.push(err);
		}
	}

	if (!hideErrors && errors.length) {
		renderValidationError(input, errors[0]);
	}

	return errors;
}

/**
 * Add a validation error messages before or after an input.
 * @function renderValidationError
 * @param {HTMLInputElement} input The input that errored.
 * @param {ValidatorError} error The validation error data.
 * @param {'before' | 'after'} position='after' Whether to place the error message before or after the input.
 * @return {void}
 */
export function renderValidationError(
	input: HTMLInputElement,
	error: ValidatorError,
	position: 'before' | 'after' = 'after'
): void {
	input.classList.add('validation-error');

	const label = document.createElement('label');
	label.className = 'validation-error-message';
	label.setAttribute('for', error.name);
	label.innerHTML = error.error;

	const parent = input.parentNode as HTMLElement;

	// parent.appendChild(error.label, element.nextSibling);
	parent.insertAdjacentElement(
		position === 'before' ? 'beforebegin' : 'afterend',
		label
	);
}

/**
 * Removes all the validation error classes and messaging.
 * @function removeAllValidationErrors
 * @return {void}
 */
export function removeAllValidationErrors(): void {
	const inputs = document.getElementsByClassName('validation-error');

	for (const input of inputs) {
		input.classList.remove('validation-error');
	}

	const messages = document.getElementsByClassName(
		'validation-error-message'
	);

	for (const message of messages) {
		message.parentNode?.removeChild(message);
	}
}

/**
 * Separates the parameter from the rule name. e.g.: maxLength[1] => ['maxLength', 8].
 * @function parseRuleParams
 * @param {String} rule name of rule to find
 * @return {ValidatorRule | undefined}
 */
function parseRuleParams(rule: string): RegExpExecArray | null {
	return /^(.+?)\[(.+)\]$/.exec(rule);
}

/**
 * Find a validation rule by name.
 * @function getRule
 * @param {String} rule name of rule to find
 * @return {ValidatorRule | undefined}
 */
function getRule(name: string): ValidatorRule | undefined {
	return RULES.find((rule) => (rule.name = name));
}

/**
 * Parse validation message with label and param.
 * @function parseValidationMessage
 * @param {String} message the message to parse
 * @param {String} label to field label
 * @param {String} param to field parameter
 * @return {String}
 */
function parseValidationMessage(
	message: string,
	label: string,
	param: string
): string {
	if (message) {
		message = message.replace('%s', label);

		if (param) {
			message = message.replace('%s', param);
		}
	} else {
		message = `An error has occurred with the ${label} field.`;
	}

	return message;
}
