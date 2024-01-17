# Essay component

<DESCRIPTION HERE>
 
### Interfaces

| Name | Type | Description |
| ---- | ---- | ----------- |

### Props

| Name       | Type                   | Description |
| ---------- | ---------------------- | ----------- |
| questionId | string                 |             |
| min        | EssayProperties['min'] |             |
| max        | EssayProperties['max'] |             |
| response   | EssayValue[]           |             |

### Events

| Event | Description |
| ----- | ----------- |

### Example

```svelte
<script>
	import Essay from '@surveyplanet/svelte-components';
	let questionId;
	let min;
	let max;
	let response;
</script>

<Essay
	{questionId}
	{min}
	{max}
	{response} />
```
