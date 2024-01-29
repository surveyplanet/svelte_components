<script lang="ts">
	import '../styles/main.scss';
	import { marked } from 'marked';
	import {
		COLORS,
		Logo,
		Menu,
		TabBar,
		Toggle,
		NavBar,
		TextInput,
	} from '$lib';
	// import { get } from 'svelte/store';
	import { createComponentsStore } from './stores/components.store.svelte';
	import type { Snippet } from 'svelte';

	interface LayoutProps {
		example: string;
		md: string;
		events?: string[] | string[][];
		component: string;
		main: Snippet;
		controls: Snippet;
	}

	let {
		example,
		md,
		events,
		component = 'Select a component',
		main,
		controls,
	} = $props<LayoutProps>();

	let isDarkMode = $state(false);
	let mkd = $state(marked(md));
	let reload = $state(0); //used to force reload the component
	let componentsData = createComponentsStore.componentsStore;
	let eventsLogs = $derived<typeof events>(events || []);

	// TODO: lets make this a template with a nice UL of events
	let logContent: HTMLElement | null = $state(null);
	//should scroll to the bottom of the logContent

	let tabSelected = $state('Example');
	let dropdownValue = $state();

	$effect(() => {
		document.body.classList[isDarkMode ? 'add' : 'remove']('dark'); // add dark mode
	});

	const tabHandler = (id: string) => {
		tabSelected = id;
	};

	const reloadComponent = () => {
		reload++;
		events = [];
	};

	const navBarClickHandler = (id: string) => {
		console.log(id);
	};

	const menuClickHandler = (id: string) => {
		console.log(id);
		dropdownValue = id;

		window.location.href = `/${id}`;
	};

	const darkModeHandler = (selected: boolean) => {
		isDarkMode = selected;
	};
</script>

<div id="main-container">
	<aside id="main-sidebar">
		<header>
			<Logo
				color={isDarkMode ? COLORS.white : COLORS.black}
				fill={isDarkMode ? 'transparent' : 'blue'} />
			<div id="main-sidebar--search">
				<TextInput
					id="search-components"
					name="search-components"
					type="search"
					placeholder="Find components" />
			</div>
		</header>
		<Menu
			data={componentsData}
			size="medium"
			menuClick={menuClickHandler} />
	</aside>

	<main id="main-content">
		<section id="component-preview">
			<header id="component-preview--header">
				<NavBar
					data={[
						{
							icon: 'refresh2',
							link: '#',
							id: 'refresh',
							title: 'Refresh',
						},
						{
							icon: 'zoomIn',
							link: '#',
							id: 'zoom-in',
							title: 'Zoom In',
						},
						{
							icon: 'zoomOut',
							link: '#',
							id: 'zoom-out',
							title: 'Zoom Out',
						},
						{
							icon: 'share2',
							link: '#',
							id: 'share',
							title: 'Share',
						},
					]}
					onclick={navBarClickHandler} />

				<div class="dark-mode-toggle">
					<Toggle
						id="dark-mode-toggle"
						name="dark-mode-toggle"
						onchange={darkModeHandler} />
				</div>
			</header>
			<div class="container">
				{#key reload}
					{@render main()}
				{/key}
			</div>
		</section>
		<section id="component-details">
			<header>
				<TabBar
					id="tab-bar"
					data={[
						{
							id: 'example',
							label: 'Example',
						},
						{
							id: 'docs',
							label: 'Docs',
						},
						{
							id: 'controls',
							label: 'Controls',
							selected: true,
						},
					]}
					tabButton={tabHandler} />
			</header>

			<div class="component-details--content">
				{#if tabSelected === 'controls'}
					<div id="component-controls">
						{@render controls()}
					</div>
				{:else if tabSelected === 'docs'}
					<div class="docs">
						<h2>Docs</h2>
						<div id="help-content--docs">
							{@html mkd}
						</div>
					</div>
				{:else if tabSelected === 'example'}
					<div class="help-content">
						<h2>Examples</h2>
						<pre>
						<code> {example} </code>
					</pre>
					</div>
				{/if}
			</div>
		</section>
	</main>

	<footer id="main-footer">
		<div id="component-console">
			<pre bind:this={logContent}>
				<code> {JSON.stringify(eventsLogs, null, 2)} </code>
			</pre>
		</div>
	</footer>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
