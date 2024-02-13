import type { NavBarProps} from '$lib';

export default (
	data: NavBarProps,

) => {
	return `
<script lang="ts">
	import { NavBar, NavBarData } from 'components/NavBar';

	const onNavClick = (event) => {
		console.log(event.detail);
	}
</script>

<NavBar 
	data={${JSON.stringify(data.data, null, 2)}}
	navMenuData={${JSON.stringify(data.navMenuData, null, 2)}}
	vertical={${data.vertical}}
	{onNavClick} />
`;
};
