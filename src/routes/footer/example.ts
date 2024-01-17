import type { FooterData } from '$lib';

export default (footerData: FooterData[]) => {
	return `<script>
	import { Footer, type FooterData } from '@surveyplanet/svelte_components';
	let footerData: FooterData[] = ${JSON.stringify(footerData, null, 2)};

	
</script>

<Footer {footerData} />
`;
};
