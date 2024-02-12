import type { MenuData } from '$lib';

export default (data: MenuData[], size: 'small' | 'medium' | 'large') => {
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
</script>
{#if visible}
    <Menu
	    data = {${data}}
	    size = {${size}}
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
{/if};
    `;
};
