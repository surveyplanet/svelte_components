import type { ButtonProps } from '$lib';

export default (data: ButtonProps & { content: string }) => {
	return `
<script lang="ts">
	import { Button } from '@surveyplanet/svelte-components';
	const onButtonClick = (): void => {
		console.log('button clicked');
	};
</script>

<Button
	mode='${data.mode}'
	disabled={${data.disabled}}
	loader={${data.loader}}
	round={${data.round}}
	block={${data.block}}
	action={${data.action}}
	type='${data.type}'
	size='${data.size}' 
	{onButtonClick}>
	${data.content}
</Button>
`;
};
