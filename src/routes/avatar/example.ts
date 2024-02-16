import { type AvatarProps } from "$lib";

export default (
	data: AvatarProps 
) => {
	return `
<script lang="ts">
	import {Avatar} from '@surveyplanet/svelte-components';
    
    const onAvatarClick = (event: ComponentEvent<undefined>) => {
        console.log(event);
    }
</script>

<Avatar
    id='${data.id}'
    size='${data.size}'
    disabled={${data.disabled}}
    profileImage='${data.profileImage}'
    {onAvatarClick}>
</Avatar>
`;
};
