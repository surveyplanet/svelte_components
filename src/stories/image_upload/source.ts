export default () => {
	return `
	const imageUploadHandler = (event) => {
		console.log(event.detail);
	};
	
	<ImageUpload
		on:change={imageUploadHandler}
	/>`;
};
