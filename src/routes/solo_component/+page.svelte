<script lang="ts">
	let url = window.location.href.split('?');
	let queryParams = url[1];
	let params = queryParams.split('*');
	let componentName = params[0];
	let props = JSON.parse(atob(params[1]));
	console.log(props);

	let component: ConstructorOfATypedSvelteComponent | null | undefined;
	import(`../../lib/${componentName}.svelte`).then((module) => {
		component = module.default;
	});
</script>

<svelte:component
	this={component}
	{...props} />
