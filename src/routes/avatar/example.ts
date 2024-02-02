export default (
	profileImage: string,
	id: string,
	size: 'small' | 'medium' | 'large' | undefined,
	disabled: boolean
) => {
	return `<
<script>
	import {Avatar, SIZES} from '@surveyplanet/svelte-components';
    
    clickHandler = (e) => {
        console.log('click', e.detail);
    }


</script>

<Avatar
    id = '${id}'
    size = '${size}'
    disabled = ${disabled}
    profileImage = '${profileImage}'
    onclick={clickHandler}
</Avatar>
`;
};
