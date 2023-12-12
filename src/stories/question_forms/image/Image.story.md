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
	let id;
	let labels;
	let multi;
	let size = 'medium';
	let hideCaptions;
	let contain = false;
	let min;
	let max;
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
