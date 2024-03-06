### Properties

| Property         | Type                             | Description                                                           |
| ---------------- | -------------------------------- | --------------------------------------------------------------------- |
| `data`           | CheckboxData                     | Data for the checkbox.                                                |
| `group=[]`       | string[]                         | Group name for the checkbox.                                          |
| `[prependLabel]` | Boolean                          | Positions the label before the checkbox if `true`.                    |
| `[size='small']` | String                           | Size of the checkbox: `'small'`, `'medium'`, `'large'`.               |
| `[block]`        | Boolean                          | If `true`, the checkbox will take up the full width of its container. |
| `[...attr] `     | HTMLAttributes<HTMLInputElement> | Additional attributes to be expanded on to primary the node.          |

### Callbacks

| Name               | Description                            | Arguments                        |
| ------------------ | -------------------------------------- | -------------------------------- |
| `onCheckboxChange` | Change event handler for the checkbox. | `event: ComponentEvent<boolean>` |

### Interfaces

#### `CheckboxData`

The data for the checkbox includes:

| Property | Type                | Description                             |
| -------- | ------------------- | --------------------------------------- |
| `html`   | string              | HTML to be rendered for the checkbox.   |
| `label`  | string              | Label for the checkbox.                 |
| `...`    | HTMLInputAttributes | Additional attributes for the checkbox. |

### Binding

```svelte
let group: CheckboxProps['group'] = $state(['apple']); // apple will be checked
<Checkbox
	bind:group
	{data} />
```

_Note: bound value must NOT be undefined. For example, this will cause a `ERR_SVELTE_BINDING_FALLBACK` error:_

```svelte
let group: CheckboxProps['group'] = $state();
<Checkbox
	bind:group
	{data} />
```

However, it's fine to have no bound value:

```svelte
<Checkbox {data} />
```
