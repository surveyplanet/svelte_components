import type { MenuData, NavBarData } from '$lib';

export default (
	data: NavBarData[],
	navMenuData: MenuData[],
	vertical: boolean
) => {
	return `<script>
	import { NavBar } from 'components/NavBar';
	let data = ${JSON.stringify(data)};
	let navMenuData = ${JSON.stringify(navMenuData)};
	let vertical = ${vertical};

</script>
<NavBar {data}{navMenuData} {vertical} />
`;
};
