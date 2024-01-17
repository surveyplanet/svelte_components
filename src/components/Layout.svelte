<script lang="ts">
	import '../styles/main.scss';
	import { marked } from 'marked';
	import Dropdown from '$lib/Dropdown.svelte';
	import TabBar from '$lib/TabBar.svelte';
	import Toggle from '$lib/Toggle.svelte';
	import Button from '$lib/Button.svelte';
	import { get } from 'svelte/store';
	import { componentsStore } from './components.store';
	import { onMount } from 'svelte';
	onMount(() => {
		console.log('the component has been refreshed');
	});

	interface LayoutProps {
		example: string;
		md: string;
		events?: string[];
		component: string;
	}

	let {
		example,
		md,
		events,
		component = 'Select a component',
	} = $props<LayoutProps>();

	let mkd = $state(marked(md));
	let reload = $state(0); //used to force reload the component
	let componentsData = get(componentsStore);
	let eventsLogs = $derived<String[]>(events || []);

	let logContent: HTMLElement;
	//should scroll to the bottom of the logContent

	let tabSelected = $state('Example');
	let dropdownValue = $state();

	const darkModeHandler = (e: CustomEvent) => {
		const body = document.querySelector('body');
		if (e.detail && body) {
			body.classList.add('dark');
		} else if (body) {
			body.classList.remove('dark');
		}
	};
	const tabHandler = (e: CustomEvent) => {
		tabSelected = e.detail;
		console.log('tabSelected', tabSelected);
	};

	const reloadComponent = () => {
		reload++;
		// eventsLogs = [];
	};

	const dropdownHandler = (e: CustomEvent) => {
		dropdownValue = e.detail;

		window.location.href = `http://localhost:6006/${e.detail}`;
	};
	const homeHandler = () => {
		window.location.href = `http://localhost:6006`;
	};
</script>

<!-- <svelte:head>
	<style type="text/css">
		
	</style>
</svelte:head> -->

<header id="main-header">
	<h2 on:click={homeHandler}>SurveyPlanet UI Component Library</h2>

	<div class="dark-mode-toggle">
		<Toggle
			id="dark-mode-toggle"
			name="dark-mode-toggle"
			label="Dark mode"
			on:change={darkModeHandler} />
	</div>
</header>

<main id="main-content">
	<section id="component-list">
		<Dropdown
			options={componentsData}
			searchThreshold={5}
			size="medium"
			value={JSON.stringify(dropdownValue)}
			placeholder={component}
			on:change={dropdownHandler} />
	</section>

	<section id="component-preview">
		<header class="component-preview--header">
			<Button
				id="reload-button"
				icon="reload"
				color="primary"
				block={true}
				on:click={reloadComponent}>Reload</Button>
		</header>
		<div class="container">
			{#key reload}
				<slot name="main" />
			{/key}
		</div>
	</section>

	<section id="component-info">
		<header class="component-info--header">
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
				on:tabButton={tabHandler} />
		</header>

		<div class="container">
			{#if tabSelected === 'controls'}
				<div id="component-conrols">
					<slot name="controls" />
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

	<section id="event-logs">
		<h2>Event Logs</h2>
		<pre
			class="log-content"
			bind:this={logContent}>
			<code>
				{JSON.stringify(eventsLogs, null, 1)}
			</code>
		</pre>
	</section>
</main>

<footer id="main-footer">
	<nav>
		<ul>
			<li>&copy; SurveyPlanet</li>
		</ul>
	</nav>
</footer>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	body {
		font: $font--large;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto 1fr auto;
		height: 100%;
	}
	#main-header {
		// border: 3px solid pink;
		margin: $size-gutter--half;
		background-color: $color--green;
		font: $font--large;
		border-radius: $size-radius--large;
		grid-column: 1 / 6;
		grid-row: 1 / 1;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		&.dark {
			background-color: $color--green-darker;
		}
		h2 {
			padding-left: $size-gutter--half;
			grid-column: 1 / 3;
			cursor: pointer;
		}
		.dark-mode-toggle {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-right: $size-gutter--half;
			grid-column: 6 / 7;
		}
	}
	#main-content {
		grid-column: 1 / 6;
		grid-row: 2 / 2;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto 1fr auto;
		background-color: $color--green;
		padding: $size-gutter--half;
		margin: $size-gutter--half;
		#component-list {
			position: absolute;
			grid-column: 1 / 2;
			grid-row: 1 / 1;
			display: flex;
			justify-content: baseline;
			align-items: baseline;
		}

		#component-preview {
			grid-column: 2 / 5;
			grid-row: 1 / 1;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: start;
			align-items: center;
			gap: $size-gutter--quarter;

			// .component-preview--header {
			// }
			.component {
				display: flex;
				justify-content: center;
				align-items: baseline;
			}
		}

		#component-info {
			grid-column: 5 / 8;
			grid-row: 1 / 1;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: start;
			align-items: center;
			gap: $size-gutter--quarter;

			.component-preview--header {
				// display: flex;
				// justify-content: center;
				// align-items: center;
			}
			.container {
				border: 3px solid yellow;
				background-color: #fff;
				border-radius: 4px;
				box-shadow:
					0 0 0 1px rgba(0, 0, 0, 0.1),
					0 2px 4px rgba(0, 0, 0, 0.1);
				padding: 1rem;
				margin-bottom: 1rem;
				margin-right: 1rem;
				position: relative;
				z-index: 1;
				height: fit-content;
				width: 40rem;
				min-height: 20rem;
				max-height: 570px;
				overflow-y: scroll;
				&.dark {
					background-color: $color--pink-darker;
				}
			}
		}
	}

	#event-logs {
		grid-column: 1 / 8;
		grid-row: 2 / 2;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		padding-left: $size-gutter--half;
		gap: $size-gutter--half;
		width: 100%;
		.log-content {
			margin: $size-gutter--quarter;
			padding: $size-gutter--half;
			background-color: $color--beige;
			box-shadow: $shadow--default;
			height: 200px;
			width: 100%;
			display: flex;
			justify-content: start;
			align-items: baseline;
			overflow-y: scroll;
		}
	}

	// You could move these style into src/main.scss and remove 'global'
	.docs {
		:global(table) {
			width: 100%;
			border-collapse: collapse;
			border-radius: 5px;
		}
		:global(th),
		:global(td) {
			border: 1px solid black;
			padding: 0.5rem;
		}

		:global(tr:nth-child(even)) {
			background-color: #cff2fd;
		}

		:global(th) {
			background-color: #7de3a2;
			color: white;
		}
		:global(li) {
			list-style-type: none;
		}
		:global(pre) {
			background-color: #f7f5ee;
			border: 1px solid #ddd;
			font-family: monospace;
			font-size: 15px;
			margin-bottom: 1.6em;
			max-width: 100%;
			overflow: auto;
			padding: 1em 1.5em;
			display: block;
			word-wrap: break-word;
		}
	}
</style>
