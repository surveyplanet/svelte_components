# DateTime component

<DESCRIPTION HERE>
 
### Interfaces

| Name | Type | Description |
| ---- | ---- | ----------- |

### Props

| Name        | Type                       | Description |
| ----------- | -------------------------- | ----------- |
| definitions | DateTimeDefinitions        |             |
| date        | DateTimeProperties['date'] |             |
| time        | DateTimeProperties['time'] |             |
| questionId  | string                     |             |

### Events

| Event | Description |
| ----- | ----------- |

### Example

```svelte
<script>
	import DateTime from '@surveyplanet/svelte-components';
	const definitions;
	const date = false;
	const time = false;
	const questionId;
</script>

<DateTime
	{definitions}
	{date}
	{time}
	{questionId} />
```
