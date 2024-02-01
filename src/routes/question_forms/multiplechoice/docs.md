# MultipleChoice Component

The `MultipleChoice` component allows users to select one or more options from a list of choices.

### Properties

#### `MultipleChoiceProps`

| Property                   | Type                                        | Description                                                                                                     |
| -------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `id`                       | `string`                                    | The unique identifier for the component.                                                                        |
| `labels`                   | `MultipleChoiceProperties['labels']`        | An array of labels representing the choices.                                                                    |
| `multi`                    | `MultipleChoiceProperties['multi']`         | If set to `true`, allows selecting multiple choices; otherwise, only one.                                       |
| `layout`                   | `MultipleChoiceProperties['layout']`        | The layout style for rendering choices (`'1'` for vertical, `'2'` for horizontal, `'dropdown'` for a dropdown). |
| `random`                   | `MultipleChoiceProperties['random']`        | If set to `true`, the order of choices will be randomized.                                                      |
| `other`                    | `MultipleChoiceProperties['other']`         | Text representing an 'Other' option. If present, users can input custom text.                                   |
| `response`                 | `MultipleChoiceValue[]`                     | Array of multiple choice values containing label-value pairs.                                                   |
| `onMultipleChoiceResponse` | `(response: MultipleChoiceValue[]) => void` | Callback triggered when the multiple choice response is changed.                                                |

### Usage

```html
<script lang="ts">
	import { MultipleChoiceProps } from './path-to-multiple-choice-component';

	// Example usage
	let multipleChoiceProps: MultipleChoiceProps = {
		id: 'multiple-choice-question-1',
		labels: ['Option 1', 'Option 2', 'Option 3'],
		multi: true,
		layout: '1',
		random: false,
		other: 'Other',
		response: [],
		onMultipleChoiceResponse: (response) =>
			console.log('Multiple Choice Response:', response),
	};
</script>

<MultipleChoice {...multipleChoiceProps} />
```
