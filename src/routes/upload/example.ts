export default (label: string, formats: string[], maxSize: number) => {
	return `
	const imageUploadHandler = (event) => {
		console.log(event.detail);
	};
	
	<Upload
		label=${label}
		formats=${formats}
		maxSize=${maxSize}
		on:change={imageUploadHandler}
	/>`;
};
