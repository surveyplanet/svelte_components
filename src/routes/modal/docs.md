# Modal component

### Interface

#### `ModalProps`

| Property                | Type                     | Description                                                    |
| ----------------------- | ------------------------ | -------------------------------------------------------------- |
| `title`                 | String                   | Title text for the modal.                                      |
| `subtitle`              | String                   | Subtitle text for the modal.                                   |
| `fullscreen`            | Boolean                  | Indicates if the modal should be displayed in fullscreen.      |
| `overlay`               | Boolean                  | Indicates whether to display an overlay behind the modal.      |
| `visible`               | Boolean                  | Indicates whether the modal is currently visible.              |
| `animationMilliseconds` | Number                   | Duration of the intro/outro animation in milliseconds.         |
| `size='medium'`         | String                   | Size of the modal, one of `'small'`, `'medium'`, or `'large'`. |
| `onintrostart`          | (e: CustomEvent) => void | Event handler for the start of the intro animation.            |
| `onintroend`            | (e: CustomEvent) => void | Event handler for the end of the intro animation.              |
| `onoutrostart`          | (e: CustomEvent) => void | Event handler for the start of the outro animation.            |
| `onoutroend`            | (e: CustomEvent) => void | Event handler for the end of the outro animation.              |
| `footer`                | Snippet                  | Custom content for the modal footer.                           |
| `body`                  | Snippet                  | Custom content for the modal body.                             |
| `header`                | Snippet                  | Custom content for the modal header.                           |

### Usage

```html
<script lang="ts">
	import { ModalProps } from './path-to-modal-component';

	// Example usage
	let modalProps: ModalProps = {
		title: 'Example Modal',
		subtitle: 'Subtitle text',
		fullscreen: false,
		overlay: true,
		visible: false,
		animationMilliseconds: 350,
		size: 'medium',
		onintrostart: (e) => {
			/* Intro start event handler */
		},
		onintroend: (e) => {
			/* Intro end event handler */
		},
		onoutrostart: (e) => {
			/* Outro start event handler */
		},
		onoutroend: (e) => {
			/* Outro end event handler */
		},
		footer: () => {
			/* Custom footer content */
		},
		body: () => {
			/* Custom body content */
		},
		header: () => {
			/* Custom header content */
		},
	};
</script>

<Modal {...modalProps} />
```
