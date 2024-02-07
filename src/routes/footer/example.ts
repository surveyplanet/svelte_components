import type { FooterData } from '$lib';

export default (footerData: FooterData[]) => {
	return `
<script>

	import { Footer, type FooterData } from '@surveyplanet/svelte_components';
	
</script>

<Footer 
	footerData = {${footerData}} />
`;
};
