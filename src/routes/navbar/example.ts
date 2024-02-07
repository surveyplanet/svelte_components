import type { MenuData, NavBarData } from '$lib';

export default (
	data: NavBarData[],
	navMenuData: MenuData[],
	vertical: boolean
) => {
	return `
<script>

	import { NavBar, NavBarData } from 'components/NavBar';

	const linkHandler = (event) => {
		console.log(event.detail);
	}
	
	const clickHandler = (event) => {
		console.log(event.detail);
	}

	const updateHandler = (event) => {
		console.log(event.detail);
	}

</script>

<NavBar 
	data = {${JSON.stringify(data, null, 2)}}
	navMenuData = {${JSON.stringify(navMenuData, null, 2)}}
	vertical= {${vertical}}
	onnavlink = {linkHandler}
	onClick = {clickHandler}
	onUpdate = {updateHandler}
	
	/>
`;
};
