export default (
	id: string,
	profileImage: string,
	size: 'small' | 'medium' | 'large' | undefined,
	disabled: boolean
) => {
	return `
<script lang="ts">
	import {Avatar, SIZES} from '@surveyplanet/svelte-components';
    
    clickHandler = (e) => {
        console.log(e);
    }
</script>

<Avatar
    id='${id}'
    size='${size}'
    disabled={${disabled}}
    profileImage='${profileImage}'
    onClick={clickHandler}
</Avatar>
`;
};
