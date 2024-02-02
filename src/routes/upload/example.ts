export default (label: string, formats: string[], maxSize: number) => {
	return `
<script lang = 'ts'>

	const imageUploadHandler = (event) => {
		console.log(event.detail);
	};
</script>
	
	<Upload
		label='${label}'
		formats=${formats}
		maxSize=${maxSize}
		onchange={imageUploadHandler}
	/>`;
};
