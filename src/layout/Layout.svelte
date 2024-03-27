<script lang="ts">
	import '../styles/main.scss';
	import { marked } from 'marked';
	import {
		COLORS,
		Logo,
		Icon,
		Button,
		Menu,
		TabBar,
		Toggle,
		NavBar,
		TextInput,
		ComponentEvent,
		type MenuData,
		ComponentErrorEvent,
	} from '$lib';
	import { createComponentsStore } from './stores/components.store.svelte';
	import { type Snippet } from 'svelte';
	import CodeMirror from './code_mirror/CodeMirror.svelte';
	import { html } from '@codemirror/lang-html';
	import { solarizedDark } from 'cm6-theme-solarized-dark';
	import { solarizedLight } from 'cm6-theme-solarized-light';
	type LayoutEventType = {
		value: string;
		target: EventTarget | null;
		event:
			| (typeof ComponentEvent)['prototype']['raw']
			| (typeof ComponentErrorEvent)['prototype']['error'];
	};
	interface LayoutProps {
		example: string;
		md: string;
		events?:
			| ComponentEvent<unknown, unknown>[]
			| Event[]
			| ComponentErrorEvent[];
		component: string;
		value?: string;
		btoaProps?: string;
		main: Snippet;
		controls: Snippet;
	}
	let { example, md, events, btoaProps, main, controls }: LayoutProps =
		$props();

	let eventsParsed: object[] = [];
	let isDarkMode = $state();
	let mkd = $state(marked(md));
	let reload = $state(0); //used to force reload the component
	let componentsData = $state(createComponentsStore.componentsStore);
	let componentEvents: HTMLElement | null = $state(null);
	let eventsLogs: LayoutEventType[] = $state([]);
	let copied = $state(false);
	let tabSelected = $state('controls');

	let isResizing = false;
	let startWidth = 0;
	let startX = 0;
	let resizableElement = $state<ParentNode | null>(null);

	$effect.pre(() => {
		const pathParts = window.location.pathname.split('/');
		const lastPart = pathParts[pathParts.length - 1].toLowerCase();
		componentsData.forEach((component) => {
			// Check if the component id matches the last part of the pathname
			if (component.id.toLowerCase() === lastPart) {
				component.selected = true;
			}
			// If the component has a submenu, check the submenu items
			if (component.submenu) {
				const item = component.submenu.find(
					(item: MenuData) =>
						item.id.toLowerCase() === 'question_forms/' + lastPart
				);
				// If the item exists, set its selected property to true
				if (item) {
					item.selected = true;
				}
			}
		});
	});

	$effect(() => {
		if (!events?.length) {
			return;
		}
		let lastEvent = events[events.length - 1];

		if (
			lastEvent instanceof Event ||
			lastEvent instanceof ComponentErrorEvent
		) {
			eventsParsed.push(lastEvent);
		} else if ('value' in lastEvent) {
			let eventValue = lastEvent.value;
			let eventTarget = `${(lastEvent.target as HTMLElement).nodeName.toLowerCase()}, ${(lastEvent.target as HTMLElement).classList}`;
			let eventEvent = lastEvent.raw;

			eventsParsed.push({
				value: eventValue,
				target: eventTarget,
				event: eventEvent?.constructor.name,
			});
		}
		eventsLogs = [...eventsParsed] as LayoutEventType[];
	});

	$effect(() => {
		document.body.classList[isDarkMode ? 'add' : 'remove']('dark'); // add dark mode

		if (eventsLogs.length) {
			componentEvents?.scrollTo({
				top: componentEvents.scrollHeight,
				behavior: 'smooth',
			});
		}
	});

	const copyExample = () => {
		navigator.clipboard.writeText(example);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	};

	const tabHandler = (event: ComponentEvent<string, HTMLElement>) => {
		tabSelected = event.value;
	};

	const navBarClickHandler = async (
		event: ComponentEvent<string, HTMLElement>
	) => {
		if (event.value === 'refresh') {
			reload++;
			events = [];
		}
		if (event.value === 'share') {
			openNewWindow();
		}
	};

	const openNewWindow = () => {
		let props = btoaProps;

		let currentComponent = componentsData.find((item) => item.selected);

		let component = currentComponent?.label;
		// eslint-disable-next-line svelte/valid-compile
		window.open(`../solo_component?${component}*${props}`, '_blank');
	};

	const menuClickHandler = (event: ComponentEvent<string, HTMLElement>) => {
		window.location.href = `/${event.value}`;
	};

	const darkModeHandler = (
		event: ComponentEvent<boolean | undefined, HTMLElement>
	) => {
		isDarkMode = !event.value;
	};

	const searchComponents = (event: ComponentEvent<string, HTMLElement>) => {
		const searchValue = (event.target as HTMLInputElement).value;
		componentsData = createComponentsStore.componentsStore.filter((item) =>
			(item.label ?? '').toLowerCase().includes(searchValue.toLowerCase())
		);
		reload++;
	};
	const navCopyHandler = () => {
		copyExample();
	};
	// resize the component details section
	function resizeMouseDownHandler(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		isResizing = true;
		resizableElement = (event.currentTarget as HTMLElement).parentNode;
		startWidth = (resizableElement as HTMLElement)?.offsetWidth;
		startX = event.clientX;
		window.addEventListener('mousemove', mouseMoveHandler);
		window.addEventListener('mouseup', mouseUpHandler);
	}

	function mouseMoveHandler(event: MouseEvent) {
		if (!isResizing) return;
		const newWidth = startWidth - (event.clientX - startX);
		(resizableElement as HTMLElement).style.width = `${newWidth}px`;
	}

	function mouseUpHandler() {
		isResizing = false;
		window.removeEventListener('mousemove', mouseMoveHandler);
		window.removeEventListener('mouseup', mouseUpHandler);
	}
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
		<Menu
			bind:data={componentsData}
			size="small"
			visible={true}
			onMenuClick={menuClickHandler} />
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
							id: 'share',
							title: 'Share',
						},
					]}
					onNavClick={navBarClickHandler} />

				<div class="dark-mode-toggle">
					<Toggle
						id="dark-mode-toggle"
						onToggleChange={darkModeHandler} />
				</div>
			</header>
			<div id="component-preview--window">
				{#key reload}
					{@render main()}
				{/key}
			</div>
		</section>

		<section
			id="component-details"
			class="resizable">
			<header>
				<TabBar
					block={true}
					data={[
						{
							id: 'controls',
							label: 'Controls',
						},
						{
							id: 'example',
							label: 'Example',
							selected: true,
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
						<header>
							<Button
								onButtonClick={navCopyHandler}
								action={true}
								mode="outline">
								{#if copied}
									<Icon
										name="check"
										strokeWidth={3}
										color={COLORS.greenDarker}
										size={16} />
								{:else}
									<Icon
										name="copy"
										size={12} />
								{/if}
							</Button>
						</header>
						{#key isDarkMode}
							<CodeMirror
								bind:value={example}
								theme={isDarkMode
									? solarizedDark
									: solarizedLight}
								editable={false}
								lang={html()} />
						{/key}
					</div>
				{:else if tabSelected === 'docs'}
					<div class="docs">
						<div id="component-details--docs">
							{@html mkd}
						</div>
					</div>
				{/if}
			</div>
			<div
				class="resize-handle"
				role="button"
				tabindex="0"
				on:mousedown={resizeMouseDownHandler}>
				<Icon
					name="menu"
					size={12}
					color={COLORS.beigeDarkerMid} />
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
			<table id="component-events--list">
				<tbody>
					<tr>
						<th class="component-event--value--order">Order</th>
						<th class="component-event--value--label">Value:</th>
						<th class="component-event--target--label">Target:</th>
						<th class="component-event--raw--label">Event:</th>
					</tr>
					{#each eventsLogs as event, i (event)}
						<!-- Add index i here -->
						<tr class="component-event--row">
							<td class="component-event--value--order"
								>{i + 1}</td>
							<!-- Use index i as order number -->

							<td class="component-event--value--value">
								{#if event.value}
									<!-- {JSON.stringify(event.value, null, 2)} -->
									{#if typeof event.value === 'object'}
										{JSON.stringify(event.value, null, 2)}
									{:else}
										{event.value}
									{/if}
								{:else}
									not defined
								{/if}
							</td>

							<td class="component-event--target--value"
								>{event.target && event.target.toString()}</td>

							<td class="component-event--raw--value"
								>{event.event && event.event.toString()}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</footer>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
