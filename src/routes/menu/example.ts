import type { MenuData } from '$lib';

export default (data: MenuData[], size: 'small' | 'medium' | 'large') => {
	return `
<script lang="ts">
    import { Menu, type MenuData } from '@surveyplanet/svelte_components';
    const menuClickHandler = (event:CustomEvent) {
        console.log('Clicked menu item:', event.detail);
        }
        const menuBlurHandler = (event:CustomEvent) {
            console.log('Menu blurred:', event.detail);
        }
        const menuUpdateHandler = (event:CustomEvent) {
            console.log('Menu updated:', event.detail);
        }
</script>
{#if visible}
    <Menu
	    data = {${data}}
	    size = {${size}}
	    onUpdate={menuUpdateHandler}
	    onClick={menuClickHandler}
	    onBlur={menuBlurHandler} >

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
