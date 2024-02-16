import type { UploadProps } from "$lib";

export default (data: UploadProps) => {
	return `
<script lang="ts">
	import { Upload, type UploadProps, type UploadData } from '@surveyplanet/svelte-components';
	const onUploadUpload = (event: ComponentEvent<UploadData>) => {
		console.log(event.value);
	};

	let formats: UploadProps['formats'] = ${JSON.stringify(data.formats, null, 2)};
</script>
	
<Upload
	label='${data.label}'
	{formats}
	maxSize={${data.maxSize}}
	{onUploadUpload}
/>`;
};
