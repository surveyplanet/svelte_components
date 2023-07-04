# NavBar Component

The `ProgressBar` component displays how much of a task has been completed.

## Props

The following props can be passed to the `ProgressBar` component:

| Prop name   | Type                      | Default value | Description                                                                                     |
| ----------- | ------------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| `questions` | `SurveyData['questions']` |               | An array of questions from Survey Data from which the component derives the potential progress. |
| `index`     | `number`                  | 0             | The index of the current question.                                                              |

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
	           answer: '',
	           required: true,
	       },
	   ];

	   $ index = 0;
</script>
<ProgressBar
	{questions}
	{index} />
```
