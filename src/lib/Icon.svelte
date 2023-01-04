<script lang="ts">
	const DEFAULT_SIZE = 48;

	const ICONS = [
		{
			name: 'search',
			path: 'M39.75 43.35 26.3 29.95q-1.45 1.15-3.425 1.8-1.975.65-4.275.65-5.75 0-9.75-4t-4-9.65q0-5.65 4-9.65t9.7-4q5.65 0 9.625 4 3.975 4 3.975 9.65 0 2.25-.625 4.175-.625 1.925-1.875 3.625l13.5 13.4ZM18.55 27.7q3.75 0 6.325-2.625t2.575-6.325q0-3.75-2.575-6.35Q22.3 9.8 18.55 9.8t-6.375 2.6Q9.55 15 9.55 18.75q0 3.7 2.625 6.325T18.55 27.7Z',
		},
		{
			name: 'delete',
			path: 'M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z',
		},
		{
			name: 'close',
			path: 'm12.45 38.85-3.3-3.3L20.7 24 9.15 12.45l3.3-3.3L24 20.7 35.55 9.15l3.3 3.3L27.3 24l11.55 11.55-3.3 3.3L24 27.3Z',
		},
		{
			name: 'menu',
			path: 'M5.15 37.4v-4.7h37.7v4.7Zm0-11.05v-4.7h37.7v4.7Zm0-11.05v-4.75h37.7v4.75Z',
		},
		{
			name: 'add',
			path: 'M21.65 38.85v-12.5H9.15v-4.7h12.5V9.15h4.7v12.5h12.5v4.7h-12.5v12.5Z',
		},
	];

	/**
	 * The icon color. default: '#262b35'
	 */
	export let color = '#262b35';

	/**
	 * The icon width and height in pixes. default: 24
	 */
	export let size: 8 | 16 | 20 | 24 | 32 | 48 | 64 | 128 | 256 | 512 =
		DEFAULT_SIZE;

	/**
	 * The name of the icon used to display the vector path
	 */
	export let name = ICONS[0].name;

	/**
	 * Display a red background behind the icon for debugging
	 */
	export let debug = false;

	let path = '';

	$: {
		nameChangeHandler(name);
	}

	function nameChangeHandler<T extends string>(val: T): void {
		const data = ICONS.find((itm) => itm.name === val);
		if (data && data.path && data.path.length) {
			path = data.path;
		}
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class="sp-icon sp-icon--{name}"
	width={size}
	height={size}
	viewBox="0 0 {DEFAULT_SIZE} {DEFAULT_SIZE}"
	style={debug ? 'background-color: red;' : ''}>
	<title>{'icon ' + name}</title>
	<path
		fill={color}
		fill-rule="evenodd"
		d={path} />
</svg>
