![Image](https://user-images.githubusercontent.com/747587/209881571-b27372dd-7ae9-4702-ab34-a4ebb8fd2314.png)

### Properties

| Property            | Type                        | Description                                             |
| ------------------- | --------------------------- | ------------------------------------------------------- |
| id                  | String (null)               | The unique id of the tab bar.                           |
| grow                | Boolean                     | Whether the tab bar should consume all available space. |
| data                | Array of tabBarData objects | The objects containing data to pass to the tab buttons. |
| tabBarData.id       | String                      | The unique id of the tab button (required).             |
| tabBarData.label    | String                      | The label text of the tab button.                       |
| tabBarData.html     | String                      | The HTML to render inside the tab button.               |
| tabBarData.icon     | IconName (from './index')   | The name of the icon to render inside the tab button.   |
| tabBarData.selected | Boolean                     | Whether the tab button is selected or not.              |
| tabBarData.disabled | Boolean                     | Whether the tab button should be disabled or not.       |

### Events

| Name      | Properties | Description                                                                                        |
| --------- | ---------- | -------------------------------------------------------------------------------------------------- |
| tabButton | id         | Dispatched when a tab button is clicked. Passes the id of the clicked button as the event payload. |

tabButton id Dispatched when a tab button is clicked. Passes the id of the clicked button as the event payload.
The sp-tab-bar component creates a tab bar with tab buttons, each of which can be clicked to select the corresponding tab. The selected tab button will be highlighted. The component is implemented using Svelte, and requires the Icon component from the ./index file.

The following CSS classes can be used to customize the component:

### CSS Classes

| Class                              | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| sp-tab-bar                         | The main class of the tab bar.                               |
| sp-tab-bar--grow                   | Adds flex-grow: 1 to the tab bar.                            |
| sp-tab-bar--item                   | The class of each tab button item.                           |
| sp-tab-bar--item--active           | The class applied to the selected tab button item.           |
| sp-tab-bar--button                 | The class of the button inside each tab button item.         |
| sp-tab-bar--button--disabled       | The class applied to disabled tab buttons.                   |
| sp-tab-bar--label                  | The class of the label text inside each tab button item.     |
| sp-tab-bar--html                   | The class of the HTML inside each tab button item.           |
| sp-tab-bar--button--disabled:hover | The class applied to the disabled tab button on hover state. |

The following variables can be customized by importing them from the @surveyplanet/styles

| Variable Name              |
| -------------------------- |
| $font-family--default      |
| $color--light-purple-light |
| $color--slate-lighter      |
