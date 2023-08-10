import type { FooterData } from '$lib';

export default (footerData: FooterData[]) => {
	return `<script>
	import { FooterData } from './Footer';
	let footerData: FooterData[] = ${JSON.stringify(footerData)};

	
</script>

<Footer {footerData} />
`;
};
