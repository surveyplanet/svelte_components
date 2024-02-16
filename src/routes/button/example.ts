import type { ButtonProps } from '$lib';

export default (data: ButtonProps & { content: string }) => {
	return `
<script lang="ts">
	import { Button, ComponentEvent } from '@surveyplanet/svelte-components';
	const onButtonClick = (event: ComponentEvent<undefined>): void => {
		console.log(event);
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
