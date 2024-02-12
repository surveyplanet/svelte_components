export default (
	id: string,
	profileImage: string,
	size: 'small' | 'medium' | 'large' | undefined,
	disabled: boolean
) => {
	return `
<script lang="ts">
	import {Avatar} from '@surveyplanet/svelte-components';
    
    const onAvatarClick = (e) => {
        console.log(e);
    }
</script>

<Avatar
    id='${id}'
    size='${size}'
    disabled={${disabled}}
    profileImage='${profileImage}'
    {onAvatarClick}
</Avatar>
`;
};
