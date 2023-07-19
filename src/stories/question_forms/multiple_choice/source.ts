export default (
	id: string,
	labels: MultipleChoiceProperties['labels'],
	multi: MultipleChoiceProperties['multi'],
	layout: MultipleChoiceProperties['layout'],
	random: MultipleChoiceProperties['random'],
	min: MultipleChoiceProperties['min'],
	max: MultipleChoiceProperties['max'],
	response: MultipleChoiceValue[]
) => {
	return `<MultipleChoice
	id={${id}}
	labels={${JSON.stringify(labels)}}
	multi={${multi}}
	layout={${layout}}
	random={${random}}
	min={${min || ''}}
	max={${max || ''}}
	response={${JSON.stringify(response)}}
/>`;
};
