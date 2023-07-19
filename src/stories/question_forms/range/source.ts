export default (
	id: string,
	min: RangeProperties['min'],
	max: RangeProperties['max'],
	response: RangeValue[]
) => {
	return `<Range
	id={${id}}
	min={${min}}
	max={${max}}
	response={${JSON.stringify(response)}}
/>`;
};
