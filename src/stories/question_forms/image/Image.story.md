# Image component

<DESCRIPTION HERE>
 
### Interfaces

| Name | Type | Description |
| ---- | ---- | ----------- |

### Props

| Name         | Type                            | Description |
| ------------ | ------------------------------- | ----------- |
| id           | string                          |             |
| labels       | ImageProperties['labels']       |             |
| multi        | ImageProperties['multi']        |             |
| size         | ImageProperties['size']         |             |
| hideCaptions | ImageProperties['hideCaptions'] |             |
| contain      | ImageProperties['contain']      |             |
| min          | ImageProperties['min']          |             |
| max          | ImageProperties['max']          |             |

### Events

| Event | Description |
| ----- | ----------- |

### Example

```svelte
<script>
	import Image from '@surveyplanet/svelte-components';
	const id;
	const labels;
	const multi;
	const size = 'medium';
	const hideCaptions;
	const contain = false;
	const min;
	const max;
</script>

<Image
	{id}
	{labels}
	{multi}
	{size}
	{hideCaptions}
	{contain}
	{min}
	{max} />
```
