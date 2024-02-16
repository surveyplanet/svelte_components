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
		ComponentEvent,
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

	let { example, md, events, main, controls } = $props<LayoutProps>();

	let isDarkMode = $state();
	let mkd = $state(marked(md));
	let reload = $state(0); //used to force reload the component
	let componentsData = $state(createComponentsStore.componentsStore);
	let componentEvents: HTMLElement | null = $state(null);
	// let eventsLogs: unknown[] = $state([]);
	let eventsLogs: unknown[] = $derived(
		events?.length ? events.map((event) => JSON.stringify(event)) : []
	);

	let tabSelected = $state();
	// let dropdownValue = $state();

	$effect(() => {
		document.body.classList[isDarkMode ? 'add' : 'remove']('dark'); // add dark mode

		if (eventsLogs) {
			componentEvents?.scrollTo({
				top: componentEvents.scrollHeight,
				behavior: 'smooth',
			});
		}
	});

	const tabHandler = (event: ComponentEvent<string>) => {
		const id = event.value;
		tabSelected = id;
	};

	const navBarClickHandler = (event: ComponentEvent<string>) => {
		console.log('navBarClickHandler' + event.value);

		if (event.value === 'refresh') {
			reload++;
			events = [];
		}
	};

	const menuClickHandler = (event: ComponentEvent<string>) => {
		// dropdownValue = id;

		window.location.href = `/${event.value}`;
	};

	const darkModeHandler = (event: ComponentEvent<boolean | undefined>) => {
		isDarkMode = event.value;
	};

	const searchComponents = (event: ComponentEvent<string>) => {
		const searchValue = (event.target as HTMLInputElement).value;
		componentsData = createComponentsStore.componentsStore.filter((item) =>
			item.label.toLowerCase().includes(searchValue.toLowerCase())
		);
		reload++;
	};
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
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
					onTextInputInput={searchComponents} />
			</div>
		</header>
		{#key reload}
			<Menu
				data={componentsData}
				size="small"
				onMenuClick={menuClickHandler} />
		{/key}
	</aside>

	<main id="main-content">
		<section id="component-preview">
			<header id="component-preview--header">
				<NavBar
					data={[
						{
							icon: 'refresh2',
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
					onNavClick={navBarClickHandler} />

				<div class="dark-mode-toggle">
					<Toggle
						id="dark-mode-toggle"
						name="dark-mode-toggle"
						onToggleChange={darkModeHandler} />
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
					block={true}
					data={[
						{
							id: 'controls',
							label: 'Controls',
							selected: true,
						},
						{
							id: 'example',
							label: 'Example',
						},
						{
							id: 'docs',
							label: 'Docs',
						},
					]}
					onTabClick={tabHandler} />
			</header>

			<div class="component-details--content">
				{#if tabSelected === 'controls'}
					<div id="component-details--controls">
						{@render controls()}
					</div>
				{:else if tabSelected === 'example'}
					<div id="component-details--example">
						<pre>
							<code> {example} </code>
						</pre>
					</div>
				{:else if tabSelected === 'docs'}
					<div class="docs">
						<div id="component-details--docs">
							{@html mkd}
						</div>
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
			<ol>
				{#each eventsLogs as event (event)}
					<li class="component-event">
						<code>{event}</code>
					</li>
				{/each}
			</ol>
		</div>
	</footer>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
