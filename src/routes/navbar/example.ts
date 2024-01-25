import type { MenuData, NavBarData } from '$lib';

export default (
	data: NavBarData[],
	navMenuData: MenuData[],
	vertical: boolean
) => {
	return `<script>
	import { NavBar } from 'components/NavBar';
	let vertical = ${vertical};
	let data = $state(${JSON.stringify(data, null, 2)});
	let navMenuData = ${JSON.stringify(navMenuData, null, 2)};

</script>
<NavBar {data} {navMenuData} {vertical} />
`;
};
