# Footer Component

This component renders a footer navigation bar. It accepts an array of `FooterData` objects, which represent links or labels to be displayed in the footer.

## Interfaces

| Name               | Type                | Description                                                                    |
| ------------------ | ------------------- | ------------------------------------------------------------------------------ |
| `FooterData`       | `object`            | An object containing data for a single footer item.                            |
| `FooterData.link`  | `string` (optional) | The URL of the link. If not provided, the item will be rendered as plain text. |
| `FooterData.label` | `string`            | The text to be displayed in the footer item.                                   |

## Exported Variables

| Name         | Type           | Description                                                                              |
| ------------ | -------------- | ---------------------------------------------------------------------------------------- |
| `footerData` | `FooterData[]` | An array of `FooterData` objects that represent the items to be displayed in the footer. |

## Example Usage

```html
<script>
	import { FooterData } from './Footer';

	const data: FooterData[] = [
		{
			link: '/about',
			label: 'About Us',
		},
		{
			link: '/contact',
			label: 'Contact Us',
		},
		{
			label: 'Privacy Policy',
		},
		{
			label: 'Terms of Service',
		},
	];
</script>

<footer {footerData} />
```
