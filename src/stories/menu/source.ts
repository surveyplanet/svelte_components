import type { MenuData } from '$lib';

export default (
	visible: boolean,
	data: MenuData[],
	size: 'small' | 'medium' | 'large'
) => {
	return `

    <script lang="ts">
        import { Menu, type MenuData } from '@surveyplanet/svelte_components';

        const data = ${JSON.stringify(data)};
        const visible = ${visible};
        const size = ${size};

        const menuClickHandler = (event:CustomEvent) {
            console.log('Clicked menu item:', event.detail);
        }
    </script>
    
    {#if visible}
				<Menu
					bind:data
					{size}
					on:update={menuUpdateHandler}
					on:click={menuClickHandler}
					on:blur={menuBlurHandler} />
	{/if};
    `;
};
