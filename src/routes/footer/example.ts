import type { FooterData } from '$lib';

export default (footerData: FooterData[]) => {
	return `
<script lang="ts">
	import { Footer, type FooterData } from '@surveyplanet/svelte_components';

	let footerData: FooterData[] = ${JSON.stringify(footerData, null, 4)};
</script>

<Footer {footerData} />
`;
};
