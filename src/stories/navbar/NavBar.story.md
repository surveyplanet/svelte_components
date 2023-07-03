# NavBar Component

The `NavBar` component displays a navigation bar with links and an optional menu.

## Props

The following props can be passed to the `NavBar` component:

| Prop name     | Type           | Default value | Description                                                                                           |
| ------------- | -------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| `data`        | `NavBarData[]` | `[]`          | An array of objects that represent links displayed in the navigation bar.                             |
| `navMenuData` | `MenuData[]`   | `[]`          | An array of objects that represent the items displayed in the navigation menu. This prop is optional. |
| `vertical`    | `boolean`      | `false`       | If `true`, the navigation bar is displayed vertically.                                                |

## Interface

The `NavBarData` interface is used to describe the objects in the `data` array.

| Property name | Type       | Description                                                |
| ------------- | ---------- | ---------------------------------------------------------- |
| `icon`        | `IconName` | The name of the icon displayed next to the link.           |
| `link`        | `string`   | The URL to navigate to when the link is clicked.           |
| `title`       | `string`   | The text to display as the link's label. This is optional. |
| `id`          | `string`   | The ID of the link.                                        |

## Example

```html
<script>
	import { NavBar } from 'components/NavBar';
	let data = [
		{ icon: 'home', link: '/', title: 'Home', id: 'nav-home' },
		{ icon: 'info', link: '/about', title: 'About', id: 'nav-about' },
		{
			icon: 'contact',
			link: '/contact',
			title: 'Contact',
			id: 'nav-contact',
		},
	];
</script>
<NavBar {data} />
```

This example creates a `NavBar` component with one link that displays the "home" icon, navigates to the home page when clicked, and has the label "Home".
