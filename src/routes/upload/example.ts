import type { UploadProps } from "$lib";

export default (data: UploadProps) => {
	return `
<script lang = 'ts'>

	const onUpload = (event) => {
		console.log(event.detail);
	};
</script>
	
	<Upload
		label='${data.label}'
		formats={${data.formats}}
		maxSize={${data.maxSize}}
		{onUpload}
	/>`;
};
