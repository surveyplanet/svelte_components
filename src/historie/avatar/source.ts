export default `<
<script>
	import {Avatar, SIZES} from '@surveyplanet/svelte-components';
</script>
<Avatar
    on:click={() => console.log('clicked')}
    id="johnny@gmail.com"
    size=SIZES.SMALL 
    imgSrc='https://example.com/profile_img.png' />
`;
