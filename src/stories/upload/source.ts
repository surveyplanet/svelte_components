export default () => {
	return `
	const imageUploadHandler = (event) => {
		console.log(event.detail);
	};
	
	<Upload
		on:change={imageUploadHandler}
	/>`;
};
