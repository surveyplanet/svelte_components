# ProgressBar Component

The `ProgressBar` component displays how much of a task has been completed.

## Props

The following props can be passed to the `ProgressBar` component:

| Prop name | Type     | Default value | Description                        |
| --------- | -------- | ------------- | ---------------------------------- |
| `max`     | `number` | 0             | The max value of the progress.     |
| `value`   | `number` | 0             | The current value of the progress. |

## Example

```html
<script>
	import { ProgressBar } from 'components/ProgressBar';
	   let questions = [
	       {
	           id: '1',
	           question: 'What is your name?',
	           type: 'text',
	           answer: '',
	           required: true,
	       },
	       {
	           id: '2',
	           question: 'What is your age?',
	           type: 'number',
	           answer: '',
	           required: true,
	       },
	       {
	           id: '3',
	           question: 'What is your favorite color?',
	           type: 'text',
	           answer: 'hello',
	           required: true,
	       },
	   ];

	   $ index = 0;
</script>
<ProgressBar
	{questions}
	{index} />
```
