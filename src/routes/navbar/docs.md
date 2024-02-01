# NavBar component

### Interfaces

#### `NavBarData`

| Property | Type       | Description                                |
| -------- | ---------- | ------------------------------------------ |
| `icon`   | `IconName` | Name of the icon to be displayed.          |
| `link`   | `string`   | URL link for the navigation item.          |
| `title`  | `string`   | Title of the navigation item.              |
| `id`     | `string`   | Unique identifier for the navigation item. |

#### `NavBarProps`

| Property      | Type                        | Description                                          |
| ------------- | --------------------------- | ---------------------------------------------------- |
| `data`        | `NavBarData[]`              | Array of data for individual navigation items.       |
| `navMenuData` | `MenuData[]`                | Array of data for the navigation menu (optional).    |
| `vertical`    | `boolean`                   | Indicates if the NavBar is in vertical orientation.  |
| `onnavlink`   | `(navLink: string) => void` | Event handler for navigation link click.             |
| `onclick`     | `(id: string) => void`      | Event handler for individual navigation item click.  |
| `onupdate`    | `(id: string) => void`      | Event handler for individual navigation item update. |

### Usage

```html
<script lang="ts">
	import { NavBarProps } from './path-to-navbar-component';

	// Example usage
	let navBarProps: NavBarProps = {
		data: [
			{ icon: 'home', link: '/', title: 'Home', id: 'home' },
			{ icon: 'user', link: '/profile', title: 'Profile', id: 'profile' },
			// ... additional navigation items
		],
		navMenuData: [
			{ id: 'settings', label: 'Settings', icon: 'gear' },
			{ id: 'logout', label: 'Logout', icon: 'power' },
			// ... additional menu items
		],
		vertical: false,
		onnavlink: (navLink) => {
			/* Handle navigation link click */
		},
		onclick: (id) => {
			/* Handle navigation item click */
		},
		onupdate: (id) => {
			/* Handle navigation item update */
		},
	};
</script>

<NavBar {...navBarProps} />
```
