import type { UploadProps } from "$lib";

export default (data: UploadProps) => {
	return `
<script lang="ts">

	const onUploadUpload = (event) => {
		console.log(event.detail);
	};
</script>
	
<Upload
	label='${data.label}'
	formats={${data.formats}}
	maxSize={${data.maxSize}}
	{onUploadUpload}
/>`;
};
