import type { MenuProps} from '$lib';

export default (data: MenuProps) => {
	return `
<script lang="ts">
    import { Menu, type MenuData } from '@surveyplanet/svelte_components';
    const onMenuClick = (event:CustomEvent) {
        console.log('Clicked menu item:', event.detail);
    }
    const onMenuBlur = (event:CustomEvent) {
            console.log('Menu blurred:', event.detail);
    }
    const onMenuUpdate = (event:CustomEvent) {
            console.log('Menu updated:', event.detail);
    }

    let data: MenuData[] = ${JSON.stringify(data.data, null, 4)};
</script>

<Menu
    {data}
    size = {${data.size}}
    {onMenuUpdate}
    {onMenuClick}
    {onMenuBlur} >

    {#snippet footer()}
    ...
    {/snippet}

    {#snippet header()}
    ...
    {/snippet}
</Menu>
`;
};
