export default (
	profileImage: string,
	id: string,
	size: 'small' | 'medium' | 'large',
	disabled: boolean
) => {
	return `<
<script>
	import {Avatar, SIZES} from '@surveyplanet/svelte-components';

    const profileImage = '${profileImage}';
    const id = '${id}';
    const size = '${size}';
    const disabled = ${disabled};

</script>
<Avatar
    on:click={() => console.log('clicked')}
    {id}
    {size}
    {disabled}
    {profileImage} />
`;
};
