import { type AvatarProps } from "$lib";

export default (
	data: AvatarProps 
) => {
	return `
<script lang="ts">
	import {Avatar} from '@surveyplanet/svelte-components';
    
    const onAvatarClick = (e) => {
        console.log(e);
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
