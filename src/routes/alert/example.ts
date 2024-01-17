export default (
	title: string,
	subtitle: string,
	type: 'info' | 'warning' | 'error' | 'success',
	hideDelay: number,
	confirm: boolean,
	confirmButtonLabel: string,
	cancelButtonLabel: string,
	challenge: string
) => {
	return `<Alert 
  title={${title}}
  subtitle={${subtitle}}
  type={${type}}
  hideDelay={${hideDelay}}
  confirm={${confirm}}
  confirmButtonLabel={${confirmButtonLabel}}
  cancelButtonLabel={${cancelButtonLabel}}
  challenge={${challenge}}>
  	Alert body
</Alert>
`;
};
