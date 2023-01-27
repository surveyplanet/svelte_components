/*
 * TODO:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks. e.g. if (currentUser() != null)
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
/**
 * Utility class for validating forms and displaying error messages.
 *
 * @class Validator
 * @param {[Object]} fields collection of field values
 * @param {String} fields.id input id
 * @param {String} fields.name input name (required if value is not provided)
 * @param {String} fields.label the input label used to parse error message (if not provided filed name is used)
 * @param {Array} fields.rules a list of rules to use for validation default: 'required'
 * @param {Array} fields.value input value (required if input name is not provided)
 * @param {String} fields.message custom message for the input use %s to parse input label and param respectively
 *
 *
 * @constructor
 * @example
 * validator = new Validator([
 *     {
 *     name: "req"
 *     label: "required"
 *     rules: "required"
 *     message: "A custom error message."
 *     },
 *     {
 *     name: "alphanumeric"
 *     rules: "alphaNumeric"
 *     },
 *     {
 *     name: "password"
 *     rules: "required"
 *     },
 *     {
 *     name: "password_confirm"
 *     label: "password confirmation"
 *     rules: ["required","matches[password]"] # for multiple rules pass array or strings
 *     },
 *     {
 *     name: "email"
 *     rules: ["required", "email"]
 *     },
 *     {
 *     name: "minlength"
 *     label: "Minimum Length"
 *     rules: "minLength[8]"
 *     message: "Hey! %s has to be at least %s characters."
 * ]);
 * validator.showValidationErrors = true
 * const errors = validator.validate()
 *
 */

class Validator {
	public errors: Array<T> = [];
	public fields: any;
	public RULES: any;
	public showValidationErrors: Boolean = false;
	public _hooks: Array<(data: string) => void>;
	public value: any;

	constructor(fields = []) {
		if (!Array.isArray(fields)) {
			fields = [fields];
		}

		this.errors = [];
		this.fields = fields.map((field) => {
			if (
				(field.name == null || !field.name.length) &&
				field.value == null
			) {
				//or not field.value.length
				throw new Error(
					'Validation requires a field name or a value for each item'
				);
			}

			if (field.label == null) {
				field.label = field.name || null;
			}

			if (field.rules == null) {
				field.rules = 'required';
			}

			return field;
		});

		/**
				All the rule data for validator.
	
				@property RULES
				@type [Object]
				*/
		this.RULES = [
			{
				name: 'required',
				message: 'The %s field is required.',
				description: 'must not be empty',
				expression: null,
			},
			{
				name: 'matches',
				message: 'The %s field does not match the %s field.',
				description: 'must match another field value',
				parameterRequired: true,
				expression: null,
			},
			{
				name: 'url',
				message: 'The %s field must contain a valid url.',
				description: 'must be a valid url',
				placeholder: 'http://www.example.com',
				expression:
					/\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/i,
			},
			{
				name: 'email',
				message: 'The %s field must contain a valid email address.',
				description: 'must be a valid email address',
				placeholder: 'email@example.com',
				// expression: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				expression:
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			},
			{
				name: 'emails',
				message: 'The %s field must contain all valid email addresses.',
				description:
					'must be a comma separated list of valid email addresses',
				placeholder: 'email1@example.com, email2@example.com',
				expression: null,
			},
			{
				name: 'minLength',
				message:
					'The %s field must be at least %s characters in length.',
				description: 'must be at least X characters long',
				parameterRequired: true,
				expression: null,
			},
			{
				name: 'maxLength',
				message:
					'The %s field must not exceed %s characters in length.',
				description: 'must be no longer than X characters',
				parameterRequired: true,
				expression: null,
			},
			{
				name: 'exactLength',
				message:
					'The %s field must be exactly %s characters in length.',
				description: 'must be exactly X characters long',
				parameterRequired: true,
				expression: null,
			},
			{
				name: 'greaterThan',
				message: 'The %s field must contain a number greater than %s.',
				description: 'must be greater than X',
				parameterRequired: true,
				expression: null,
			},
			{
				name: 'equals',
				message: 'The %s field must equal %s.',
				description: 'must be equal to X',
				parameterRequired: true,
				expression: null,
			},
			{
				name: 'lessThan',
				message: 'The %s field must contain a number less than %s.',
				description: 'must be less than X',
				parameterRequired: true,
				expression: null,
			},
			{
				name: 'alpha',
				message:
					'The %s field must only contain alphabetical characters.',
				description: 'must only contain alphabetical characters (A-z)',
				expression: /^[a-z]+$/i,
			},
			{
				name: 'alphaNumeric',
				message:
					'The %s field must only contain alpha-numeric characters.',
				description:
					'must only contain alpha-numeric characters (A-z, 0-9)',
				expression: /^[a-z0-9]+$/i,
			},
			{
				name: 'alphaDash',
				message:
					'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
				description:
					'must only contain alpha-numeric characters, underscores, or dashes',
				expression: /^[a-z0-9_-]+$/i,
			},
			{
				name: 'numeric',
				message: 'The %s field must only contain numbers.',
				description: 'must be a whole number',
				expression: /^[0-9]+$/,
			},
			{
				name: 'integer',
				message: '%s must be a whole number.',
				description: 'must be an integer',
				expression: /^-?[0-9]+$/,
			},
			{
				name: 'decimal',
				message: 'The %s field must contain a decimal number.',
				description: 'must be a valid decimal',
				expression: /^-?[0-9]*\.?[0-9]+$/,
			},
			{
				name: 'ip',
				message: 'The %s field must contain a valid IP address.',
				description: 'must be a valid IP address',
				expression:
					/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
			},
			{
				name: 'base64',
				message: 'The %s field must contain a base64 string.',
				description: 'must be a base64 string',
				expression:
					/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i,
			},
			{
				name: 'cvc',
				message: 'The %s field must contain a valid CVC.',
				description: 'must be a valid credit card cvc',
				expression: /^\d+$/,
			},
			{
				name: 'creditCard',
				message:
					'The %s field must contain a valid credit card number.',
				description: 'must be a valid credit card number',
				expression: /^[\d\-\s]+$/,
			},
			{
				name: 'phone',
				message: 'The %s field must contain a valid phone number.',
				description: 'must be a valid phone number',
				expression:
					/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
			},
			{
				name: 'fileType',
				message: 'The %s field must contain only %s files.',
				description:
					'must be a comma separated list of file types ex: [gif,png,jpg]',
				expression: null,
			},
			{
				name: 'hasNumber',
				message: 'The %s field must contain at least one number.',
				description: 'must contain a number',
				expression: /[0-9]/,
			},
			{
				name: 'hasUpper',
				message:
					'The %s field must contain at least one upper case letter.',
				description: 'must contain an upper case letter',
				expression: /[A-Z]/,
			},
			{
				name: 'hasLower',
				message:
					'The %s field must contain at least one lower case letter.',
				description: 'must contain a lower case letter',
				expression: /[a-z]/,
			},
			{
				name: 'custom',
				message: 'The %s field is invalid.',
				description: 'must match a Regular Expression',
				parameterRequired: true,
			},
		];

		/**
				A collection of errors.
	
				@property errors
				@type [Object]
				@default []
				*/
		this.errors = [];

		/**
				A collection of fields to validate.
	
				@property fields
				@type [Object]
				@default []
			
				*/
		this.fields = [];

		/**
				Whether or not the errors should be rendered into the dom.
	
				@property showErrors
				@type Boolean
				@default false
				*/
		this.showValidationErrors = false;
	}

	/**
			Validates the form.

			@method validate
			@async
			@param {Function} callback
			@return {Object}
			*/
	validate(callback) {
		if (this.showValidationErrors) {
			this.removeAllValidationErrorMessages();
		}
		this.errors = [];

		this.fields.forEach((field) => {
			const element = document.getElementsByName(field.name);
			if (element != null && element.length) {
				field.id = this._getAttributeValue(element, 'id');
				field.class = this._getAttributeValue(element, 'className');
				field.value = this._getAttributeValue(element, 'value');
				// get type for check/radios
				field.type = this._getAttributeValue(element, 'type');
				field.checked = this._getAttributeValue(element, 'checked');
			}

			return this._validateField(field);
		});

		if (this.showValidationErrors) {
			this.createValidationErrorMessages();
		}
		if (callback) {
			return callback(this.errors);
		}
		return this.errors;
	}

	/**
			finds a rule by name.

			@method getRule
			@param {String} rule name of rule to find
			@return {Validator}
			*/
	getRule(name) {
		return this._find(Validator.RULES, 'name', name);
	}

	/**
			Parse validation message with label and param.

			@method parseValidationMessage
			@param {String} message the message to parse
			@param {String} label to field label
			@param {String} param to field parameter
			@return {String}
			*/
	parseValidationMessage(message, label, param) {
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

	/**
			Add a validation error messages to the dom.

			@method createValidationErrorMessages
			@param {Object} error a single error object from the errors array
			@return {Object}
			*/
	createValidationErrorMessages() {
		return (() => {
			const result = [];
			for (let error of this.errors) {
				let element = document.getElementsByName(error.name);
				if (element.length > 0) {
					element = element[0];
				}
				element.className = 'validation-error';

				error.label = document.createElement('label');
				error.label.className = 'validation-error error';
				error.label.setAttribute('for', error.name);
				error.label.innerHTML = error.message;

				const icon = document.createElement('div');
				icon.className = 'icon icon-error';

				error.label.insertBefore(icon, error.label.firstChild);

				element.parentNode.appendChild(
					error.label,
					element.nextSibling
				);
				result.push(undefined);
			}
			return result;
		})();
	}

	/**
			Removes all the validation error messages from the dom.

			@method removeErrorAllValidationErrorMessages
			@return {Object}
			*/
	removeAllValidationErrorMessages() {
		const elements = Array.prototype.slice.call(
			document.getElementsByClassName('validation-error')
		);
		return (() => {
			const result = [];
			for (let index = 0; index < elements.length; index++) {
				const element = elements[index];
				if (element != null && typeof element !== 'undefined') {
					if (
						element.nodeName === 'INPUT' ||
						element.nodeName === 'TEXTAREA'
					) {
						result.push(
							(element.className = element.className.replace(
								/\bvalidation-error\b/,
								''
							))
						);
					} else {
						result.push(element.parentNode.removeChild(element));
					}
				} else {
					result.push(undefined);
				}
			}
			return result;
		})();
	}

	_getAttributeValue(element, attr) {
		if (element.length) {
			return element[0][attr];
		} else {
			return element[attr];
		}
	}

	_getRuleParameters(rule) {
		return /^(.+?)\[(.+)\]$/.exec(rule);
	}

	_find(source, key, val) {
		let result = null;
		if (typeof source.some === 'function' && source.length) {
			source.some(function (item) {
				if (key in item && item[key] === val) {
					result = item;
					return true;
				} else {
					return false;
				}
			});
		}

		return result;
	}

	// Looks at the fields value and evaluates it against the given rules
	_validateField(field) {
		const rules =
			typeof field.rules === 'string'
				? field.rules.split('|')
				: field.rules;

		// If the value is null and not required, we don't need to run through validation
		if (
			field.rules.indexOf('required') === -1 &&
			(!field.value || field.value === '' || field.value === undefined)
		) {
			return;
		}

		// Run through the rules and execute the validation methods as needed
		let i = 0;
		return (() => {
			const result = [];
			while (i < rules.length) {
				let method = rules[i];
				let param = null;
				let failed = false;
				const parts = this._getRuleParameters(method);

				// If the rule has a parameter (i.e. matches[param]) split it out
				if (parts) {
					method = parts[1];
					param = parts[2];
				}

				// If the hook is defined, run it to find any validation errors
				if (typeof this._hooks[method] === 'function') {
					if (!this._hooks[method].apply(this, [field, param])) {
						failed = true;
					}
				}

				// If the hook failed, add a message to the errors array
				if (failed) {
					const message = this.parseValidationMessage(
						field.message || this.getRule(method).message,
						field.label,
						param
					);

					const err = {
						id: field.id,
						name: field.name,
						class: field.class,
						message,
						rule: method,
					};

					this.errors.push(err);
					// Break out so as to not spam with validation errors (i.e. required and email)
					break;
				}

				result.push(i++);
			}
			return result;
		})();
	}

	_hooks = {
		required(field) {
			const { value } = field;
			if (field.type === 'checkbox' || field.type === 'radio') {
				return field.checked === true;
			}
			return value !== null && value !== '';
		},

		matches(field, matchName) {
			const el = document.getElementsByName(matchName);
			if (el) {
				const val = el.length > 0 ? el[0].value : el.value;
				return field.value === val;
			}
			return false;
		},

		url(field) {
			return this.getRule('url').expression.test(field.value.trim());
		},

		email(field) {
			return this.getRule('email').expression.test(field.value.trim());
		},

		emails(field) {
			const result = field.value.split(',');
			const regex = this.getRule('email').expression;
			return result.every((item) => regex.test(item.trim()));
		},

		minLength(field, length) {
			if (!this.getRule('numeric').expression.test(length)) {
				return false;
			}
			return field.value.length >= parseInt(length, 10);
		},

		maxLength(field, length) {
			if (!this.getRule('numeric').expression.test(length)) {
				return false;
			}
			return field.value.length <= parseInt(length, 10);
		},

		exactLength(field, length) {
			if (!this.getRule('numeric').expression.test(length)) {
				return false;
			}
			return field.value.length === parseInt(length, 10);
		},

		greaterThan(field, param) {
			if (!this.getRule('decimal').expression.test(field.value)) {
				return false;
			}
			return parseFloat(field.value) > parseFloat(param);
		},

		equals(field, val) {
			return (
				val != null &&
				String(val).length &&
				String(field.value).trim() === String(val).trim()
			);
		},

		lessThan(field, param) {
			if (!this.getRule('decimal').expression.test(field.value)) {
				return false;
			}
			return parseFloat(field.value) < parseFloat(param);
		},

		alpha(field) {
			return this.getRule('alpha').expression.test(field.value);
		},

		alphaNumeric(field) {
			return this.getRule('alphaNumeric').expression.test(field.value);
		},

		alphaDash(field) {
			return this.getRule('alphaDash').expression.test(field.value);
		},

		numeric(field) {
			return this.getRule('numeric').expression.test(field.value);
		},

		integer(field) {
			return this.getRule('integer').expression.test(field.value);
		},

		decimal(field) {
			return this.getRule('decimal').expression.test(field.value);
		},

		ip(field) {
			return this.getRule('ip').expression.test(field.value);
		},

		base64(field) {
			return this.getRule('base64').expression.test(field.value);
		},

		phone(field) {
			return this.getRule('phone').expression.test(field.value);
		},

		cvc(field) {
			return (
				this.getRule('cvc').expression.test(field.value) &&
				field.value.length >= 3 &&
				field.value.length <= 4
			);
		},

		creditCard(field) {
			if (!this.getRule('creditCard').expression.test(field.value)) {
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

		fileType(field, type) {
			// return true  if field.type is not "file"
			const ext = field.value.substr(field.value.lastIndexOf('.') + 1);
			const extTypes = type.split(',').map((e) => e.trim());

			return ext && ext.length && extTypes.indexOf(ext.trim()) > -1;
		},

		hasNumber(field) {
			return this.getRule('hasNumber').expression.test(field.value);
		},

		hasUpper(field) {
			return this.getRule('hasUpper').expression.test(field.value);
		},

		hasLower(field) {
			return this.getRule('hasLower').expression.test(field.value);
		},

		custom(field, param) {
			// This has difficulty parsing character classes
			// like: \d, \D, \s, \S, \w, |W
			const match = param.match(/^\/(.*?)\/([gimy]*)$/);
			const regex = new RegExp(match[1], match[2]);
			// console.log regex, field.value, regex.test(field.value)
			return regex.test(field.value);
		},
	};
}

export default Validator;
