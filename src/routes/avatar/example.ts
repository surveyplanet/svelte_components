import { type AvatarProps } from '$lib';

export default (data: AvatarProps) => {
	return `
<script lang="ts">
	import {Avatar, ComponentEvent} from '@surveyplanet/svelte-components';
    
    const onAvatarClick = (event: ComponentEvent<undefined>) => {
        console.log(event);
    }
</script>

<Avatar
    userId='${data.userId}'
    size='${data.size}'
    disabled={${data.disabled}}
    profileImage='${data.profileImage}'
    {onAvatarClick}>
</Avatar>
`;
};
