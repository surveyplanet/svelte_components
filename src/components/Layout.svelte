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
	import { createComponentsStore } from './stores/components.store.svelte';
	import type { Snippet } from 'svelte';

	interface LayoutProps {
		example: string;
		md: string;
		events?: unknown[];
		component: string;
		value?: string;
		main: Snippet;
		controls: Snippet;
	}

	let {
		example,
		md,
		value,
		events,
		component = 'Select a component',
		main,
		controls,
	} = $props<LayoutProps>();

	let isDarkMode = $state(false);
	let mkd = $state(marked(md));
	let reload = $state(0); //used to force reload the component
	let componentsData = $state(createComponentsStore.componentsStore);
	let componentEvents: HTMLElement | null = $state(null);
	// let eventsLogs: unknown[] = $state([]);
	let eventsLogs: unknown[] = $derived(
		events?.length ? events.map((event) => JSON.stringify(event)) : []
	);

	let tabSelected = $state('Example');
	let dropdownValue = $state();

	$effect(() => {
		document.body.classList[isDarkMode ? 'add' : 'remove']('dark'); // add dark mode

		if (eventsLogs) {
			console.log('eventsLogs');
			console.log(componentEvents);
			componentEvents?.scrollTo({
				top: componentEvents.scrollHeight,
				behavior: 'smooth',
			});
		}
	});

	const tabHandler = (id: string) => {
		tabSelected = id;
	};

	const navBarClickHandler = (id: string) => {
		if (id === 'refresh') {
			reload++;
			events = [];
		}
	};

	const menuClickHandler = (id: string) => {
		console.log(id);
		dropdownValue = id;

		window.location.href = `/${id}`;
	};

	const darkModeHandler = (selected: boolean) => {
		isDarkMode = selected;
	};

	const searchComponents = (event: Event) => {
		const searchValue = (event.target as HTMLInputElement).value;
		componentsData = createComponentsStore.componentsStore.filter((item) =>
			item.label.toLowerCase().includes(searchValue.toLowerCase())
		);
		reload++;
	};
</script>

<div id="main-container">
	<aside id="main-sidebar">
		<header>
			<a href="./">
				<Logo
					color={isDarkMode ? COLORS.white : COLORS.black}
					fill={isDarkMode ? 'transparent' : 'blue'} /></a>

			<div id="main-sidebar--search">
				<TextInput
					id="search-components"
					name="search-components"
					type="search"
					placeholder="Find components"
					oninput={searchComponents} />
			</div>
		</header>
		{#key reload}
			<Menu
				data={componentsData}
				size="small"
				menuClick={menuClickHandler} />
		{/key}
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
							icon: 'share2',
							link: '#',
							id: 'share',
							title: 'Share',
						},
					]}
					onnavlink={navBarClickHandler} />

				<div class="dark-mode-toggle">
					<Toggle
						id="dark-mode-toggle"
						name="dark-mode-toggle"
						onchange={darkModeHandler} />
				</div>
			</header>
			<div id="component-preview--window">
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

	<footer
		id="main-footer"
		bind:this={componentEvents}>
		<header>
			<h3>Events</h3>
		</header>
		<div id="component-events">
			<ul>
				{#each eventsLogs as event (event)}
					<li class="component-event">
						<code>{event}</code>
					</li>
				{/each}
			</ul>
		</div>
	</footer>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
