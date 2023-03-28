<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	export let step = 1;
	export let min = 0;
	export let max = 100;
	export let value = 0;

	const dispatch: (name: string, detail: number) => boolean =
		createEventDispatcher();

	const increment = () => {
		if (value + step <= max) {
			value += step;
			dispatch('change', value);
		}
	};

	const decrement = () => {
		if (value - step >= min) {
			value -= step;
			dispatch('change', value);
		} else {
			value = min;
			dispatch('change', value);
			console.log('value is too small');
		}
	};

	const inputChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const val = parseInt(input.value);

		if (val >= min && val <= max) {
			value = val;
			dispatch('change', value);
		} else {
			value = max;
			dispatch('change', value);
			console.log('value is too big');
		}
	};

	const inputHandler = (event: Event) => {
		inputChange(event);
	};

	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			increment();
		} else if (e.key === 'ArrowDown') {
			decrement();
		}
	};
</script>

<div
	class="number-spinner"
	on:keydown={keydownHandler}>
	<input
		type="number"
		bind:value
		on:input={inputHandler} />
	<button on:click={increment}>
		<Icon name="chevronUp" />
	</button>
	<button on:click={decrement}>
		<Icon name="chevronDown" />
	</button>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.number-spinner {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid;
		border-radius: 4px;
		width: 100px;
		height: 32px;
		font-size: 16px;
		line-height: 24px;

		button {
			width: 32px;
			height: 32px;
			border: none;
			border-radius: 4px;

			cursor: pointer;
			outline: none;

			&:hover {
				background-color: $color--light-purple-light;
			}

			&:active {
				background-color: $color--light-purple-light;
			}
		}

		input {
			width: 100%;
			height: 100%;
			border: none;
			border-radius: 4px;

			text-align: center;
			outline: none;
		}

		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
</style>
