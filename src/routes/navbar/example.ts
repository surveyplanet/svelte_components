import type { NavBarProps} from '$lib';

export default (
	data: NavBarProps,

) => {
	return `
<script lang="ts">
	import { NavBar, type NavBarData, type MenuData } from 'components/NavBar';

	const onNavClick = (event) => {
		console.log(event.detail);
	}

	let data: NavBarData[] = {${JSON.stringify(data.data, null, 2)})
	let navMenuData: MenuData[] = ${JSON.stringify(data.navMenuData, null, 2)};
</script>

<NavBar 
	{data}
	{navMenuData}
	vertical={${data.vertical}}
	{onNavClick} />
`;
};
