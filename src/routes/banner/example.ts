export default (
	content: string,
	title: string,
	type: 'info' | 'warning' | 'error' | 'success',
	visible: boolean,
	hideDelay: number
) => {
	return `<Alert title="${title}" type="${type}" visible={${visible}} hideDelay={${hideDelay}}>
	${content}
</Alert>
`;
};
