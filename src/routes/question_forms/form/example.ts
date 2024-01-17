import type { FormProperties, FormValue } from '@surveyplanet/types';

export default (
	id: string,
	labels: FormProperties['labels'],
	requireAll: FormProperties['requireAll'],
	random: FormProperties['random'],
	validations: FormProperties['validations'],
	response: FormValue[]
) => {
	return `<Form
	id={${id}}
	labels={${JSON.stringify(labels)}}
	requireAll={${requireAll}}
	random={${random}}
	validations={${JSON.stringify(validations)}}
	response={${JSON.stringify(response)}}
/>`;
};
