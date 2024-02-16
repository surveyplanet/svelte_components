import type { MenuProps} from '$lib';

export default (data: MenuProps) => {
	return `
<script lang="ts">
    import { Menu, type MenuData, ComponentEvent } from '@surveyplanet/svelte_components';
    const onMenuClick = (event: ComponentEvent<string>) => {
        console.log(event.value);
    }
    const onMenuBlur = (event: FocusEvent) => {
            console.log(event.target);
    }
    const onMenuUpdate = (event: ComponentEvent<string>)=> {
            console.log(event.value);
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
