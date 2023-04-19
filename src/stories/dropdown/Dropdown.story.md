## Dropdown Component

This component is a custom dropdown component that provides an input element that opens a menu on focus. The menu displays a list of selectable options. The dropdown can also be searchable if the number of options exceeds a certain threshold that is set when the component is initialized.

Options will be passed down to the Menu component as a prop. The Menu component will then render the options as MenuItems.

### Interfaces

| Name                      | Type        | Description                               |
| ------------------------- | ----------- | ----------------------------------------- |
| **DropdownOptions**       | `interface` | An interface for dropdown option.         |
| DropdownOptions.label     | `string`    | The label to display for the option.      |
| DropdownOptions.id        | `string`    | The unique identifier for the option.     |
| DropdownOptions.meta?     | `string`    | Optional metadata for the option.         |
| DropdownOptions.selected? | `boolean`   | Whether the option is currently selected. |

### Exported Variables

| Name            | Type                            | Description                                                 |
| --------------- | ------------------------------- | ----------------------------------------------------------- |
| options         | `DropdownOptions[]`             | An array of dropdown options to display in the dropdown.    |
| value           | `DropdownOptions['id'] \| null` | The currently selected option's id.                         |
| label           | `string` \| `null`              | The label to display above the dropdown.                    |
| searchThreshold | `number`                        | The minimum number of options required to enable searching. |
| disabled        | `boolean`                       | Whether the dropdown is disabled.                           |
| required        | `boolean`                       | Whether the dropdown is required.                           |

### Methods

| Name                                       | Description                                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `reset()`                                  | Resets the dropdown to its initial state.                                                                                               |
| `setValue(id: string, silent?: boolean)`   | Sets the value of the dropdown to the option with the specified id. The `silent` parameter determines whether to emit a `change` event. |
| `search(query: string)`                    | Filters the dropdown options by the specified search query.                                                                             |
| `blurOnBodyClick(event: MouseEvent)`       | Hides the dropdown menu when a click event is detected outside of the dropdown.                                                         |
| `clear()`                                  | Clears the selected value and resets the dropdown to its initial state.                                                                 |
| `menuClickHandler(event: CustomEvent)`     | Sets the selected value and hides the dropdown menu when an option is clicked.                                                          |
| `searchFocusHandler()`                     | Shows the dropdown menu when the search input is focused.                                                                               |
| `searchBlurHandler(event: FocusEvent)`     | Hides the dropdown menu when the search input is blurred.                                                                               |
| `searchKeyupHandler(event: KeyboardEvent)` | Filters the dropdown options by the current search query when a keyup event is detected on the search input.                            |
| `closeButtonHandler()`                     | Clears the selected value and resets the dropdown to its initial state when the close button is clicked.                                |

### Events

| Event  | Description                                                                                                                 |
| ------ | --------------------------------------------------------------------------------------------------------------------------- |
| change | Triggered when the selected value of the dropdown changes. The event detail contains the `id` of the newly selected option. |
| click  | Triggered when the dropdown button is clicked.                                                                              |

### Usage

To use this component, import it and add it to your Svelte template like so:

```html
<script>
	import Dropdown from './Dropdown.svelte';

	const options = [
		{ label: 'Option 1', id: '1' },
		{ label: 'Option 2', id: '2' },
		{ label: 'Option 3', id: '3' },
	];
</script>

<Dropdown
	options="{options}"
	value="{null}"
	label="Select an option"
	searchThreshold="{2}"
	disabled="{false}"
	required="{false}" />
```
