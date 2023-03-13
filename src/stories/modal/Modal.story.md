### Properties

| Property             | type    | description                                                                                                            |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- | --- |
| `title`              | String  | The title of the modal                                                                                                 |
| `[subtitle]`         | String  | The subtitle of the modal                                                                                              |
| `[fullscreen=false]` | Boolean | Whether the modal should be full screen or not.                                                                        |
| `[overlay=true]`     | Boolean | Whether should should be a transparent background element which prevents interaction with other elements on the stage. |     |
| `[size='medium']`    | String  | The size of the modal. Can be `small`, `medium` or `large`.                                                            |

### Slots

| Name     | description                                               |
| -------- | --------------------------------------------------------- |
| `header` | Additional content to append to the header                |
| `body`   | Main modal body                                           |
| `footer` | Add footer content like disclaimer text or navigation bar |

### Events

| Name          | description                                                    |
| ------------- | -------------------------------------------------------------- |
| `modalOpened` | Modal has been instantiated.                                   |
| `modalIn`     | Modal is full rendered on stage and int animation is complete. |
| `modalClosed` | Modal has been closed.                                         |
| `modalOut`    | Modal has been fully removed and out animation is complete.    |

### Examples

```html
<Modal
	title="My new modal"
	subtitle="...">
	<p slot="header">Some header content</p>
	<p slot="body">Mauris laoreet eleifend massa vel pretium....</p>
	<nav slot="footer">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/docs">Docs</a></li>
		</ul>
	</nav>
</Modal>
```
