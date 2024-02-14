import type { MenuProps} from '$lib';

export default (data: MenuProps) => {
	return `
<script lang="ts">
    import { Menu, type MenuData } from '@surveyplanet/svelte_components';
    const onMenuClick = (id:string) => {
        console.log('Clicked menu item:', id);
    }
    const onMenuBlur = (event:FocusEvent) => {
            console.log('Menu blurred:', event.detail);
    }
    const onMenuUpdate = (id:string)=> {
            console.log('Menu updated:', id);
    }

    let data: MenuData[] = ${JSON.stringify(data.data, null, 4)};
</script>

<Menu
    {data}
    size='${data.size}'
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
