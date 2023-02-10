# SurveyPlanet Svelte components

A collection of Svelte components created by SurveyPlanet.

![build](https://github.com/surveyplanet/svelte_components/actions/workflows/publish.yaml/badge.svg?branch=main)
![NPM license](https://img.shields.io/npm/l/:@surveyplanet%2svelte-components)
![NPM version](https://badge.fury.io/js/@surveyplanet%2Fsvelte-components.svg)

## Stories

These components are created with [Storybook](https://storybook.js.org/). Run the command bellow to get Storybook up and running.

```bash
npm install
npm run storybook
```

Once the storybook server is running open http://localhost:6006 in your browser.

## Development

Once your Storybook is server up and running you're ready to start development. All the components are located in the `src/libs` directory

## Testing

Tests are run automatically in Storybook but you can run the test suite with:

```bash
npm test
```

[Read more about writing tests with Storybook](https://storybook.js.org/docs/7.0/svelte/writing-tests/introduction).

### Accessibility tests with `a11y`

## Building

To create a production version of the storybook:

```bash
npm run storybook:build
```

You can preview the production build with `npm run preview`.
