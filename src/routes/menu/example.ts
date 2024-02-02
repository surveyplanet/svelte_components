import type { MenuData } from '$lib';

export default (data: MenuData[], size: 'small' | 'medium' | 'large') => {
	return `

    <script lang="ts">
        import { Menu, type MenuData } from '@surveyplanet/svelte_components';

        const menuClickHandler = (event:CustomEvent) {
            console.log('Clicked menu item:', event.detail);
        }
    </script>
    



    {#if visible}
				<Menu
					data = ${data}
					size = ${size}
					onupdate={menuUpdateHandler}
					onclick={menuClickHandler}
					onblur={menuBlurHandler} >

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
