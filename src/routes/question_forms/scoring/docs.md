# Scoring Component

The `Scoring` component is designed for questions where respondents assign scores to various labels.

### Properties

#### `ScoringProps`

| Property          | Type                                 | Description                                                        |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------ |
| `id`              | `string`                             | The unique identifier for the component.                           |
| `definitions`     | `ScoringDefinitions`                 | Definitions for text elements within the component.                |
| `values`          | `ScoringProperties['values']`        | Array containing the numerical values corresponding to the labels. |
| `labels`          | `ScoringProperties['labels']`        | Array containing the labels for scoring.                           |
| `maxLabel`        | `ScoringProperties['maxLabel']`      | Label for the maximum score.                                       |
| `minLabel`        | `ScoringProperties['minLabel']`      | Label for the minimum score.                                       |
| `requireAll`      | `ScoringProperties['requireAll']`    | Indicates if all labels must receive a score.                      |
| `requireUnique`   | `ScoringProperties['requireUnique']` | Indicates if each label must have a unique score.                  |
| `response`        | `ScoringValue[]`                     | Array containing the selected scoring values.                      |
| `scoringResponse` | `(response: ScoringValue[]) => void` | Callback triggered when the scoring response is changed.           |

#### `ScoringDefinitions`

| Property             | Type                                            | Description                                   |
| -------------------- | ----------------------------------------------- | --------------------------------------------- |
| `scoringResetButton` | `Language['definitions']['scoringResetButton']` | Text definition for the scoring reset button. |

### Usage

```html
<script lang="ts">
	import { ScoringProps } from './path-to-scoring-component';

	// Example usage
	let scoringProps: ScoringProps = {
		id: 'scoring-question-1',
		definitions: {
			scoringResetButton: 'Reset Scores',
		},
		values: [1, 2, 3, 4, 5],
		labels: ['Label A', 'Label B', 'Label C'],
		maxLabel: 'High',
		minLabel: 'Low',
		requireAll: false,
		requireUnique: false,
		response: [],
		scoringResponse: (response) =>
			console.log('Scoring Response:', response),
	};
</script>

<Scoring {...scoringProps} />
```
