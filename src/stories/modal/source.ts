export default `<script>
	import Modal from '@surveyplanet/svelte_components';
</script>

<Modal title="My new modal" subtitle="..." >
    <p slot="header">Some header content</p>
    <p slot="body">Text....</p>
    <nav slot="footer">
        <ul>
            <li> <a href="/">Home</a> </li>
            <li> <a href="/docs">Docs</a> </li>
        </ul>
    </nav>
</Modal>
`;
