#!/usr/bin/env node

import parseArgs from '@jwerre/minimist';
import { resolve } from 'path';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import { snake, title, template } from 'radash';

const ROOT_DIR = resolve('src');
const LIB_DIR = resolve(ROOT_DIR, 'lib');
const STORY_DIR = resolve(ROOT_DIR, 'stories');
const PROPS_REGEX = /export let (\w+)\s*:\s*([^;=\n]+)(?:\s*=\s*([^;\n]+))?/;
const argv = parseArgs(process.argv.slice(2));

if (argv.h || argv.help) {
	console.log(`
Generate a story for a given component
Usage: 
create-story [options] <COMPONENT_NAME>

Example:
create-story Button
create-story ProgressBar


Options:
-h, --help	Show help.
-d, --dir	The directory of your component (default: ${LIB_DIR}).
-s, --story-dir	The directory to place story files (default: ${STORY_DIR}).
-D, --dry	Dry run.
-v, --verbose	Verbose output.
`);

	process.exit();
}

let componentName = argv._[0];
const componentDir = argv.dir || argv.d || LIB_DIR;
const storiesDir = argv['story-dir'] || argv.s || STORY_DIR;
const verbose = argv.verbose || argv.v;
const dry = argv.dry || argv.D;

let storyDir;
let storyName;
let props;

function inferValueType(value) {
	if (typeof value === 'boolean' || value === 'true' || value === 'false') {
		return 'Boolean';
	}
	if (!isNaN(value)) {
		return 'Number';
	}
	if (typeof value === 'string') {
		return 'String';
	}
	if (Array.isArray(value)) {
		return 'Array';
	}
	if (typeof value === 'object' && value !== null) {
		return 'Object';
	}
	return 'Unknown';
}

function getControl(type) {
	if (type === 'boolean') {
		return 'Checkbox';
	}
	if (type === 'string') {
		return 'Text';
	}
	if (type === 'number') {
		return 'Number';
	}
	if (/^(['"]\w+['"] \|)/.test(type)) {
		// enum
		return 'Select';
	}
	return 'Json';
}

async function getComponentProps() {
	const fileName = resolve(componentDir, `${componentName}.svelte`);
	await fs.access(fileName, fs.constants.F_OK);

	const res = [];
	const file = await fs.open(fileName);

	for await (let line of file.readLines()) {
		line = line.trim();
		// console.log(line);

		const match = line.match(PROPS_REGEX);

		if (match && match.length) {
			const prop = {};
			prop.line = match[0];

			if (match[1] && match[1].length) {
				prop.name = match[1];
			}
			if (match[2] && match[2].length) {
				prop.type = match[2];
			} else {
				prop.type = inferValueType(match[3]);
			}
			if (match[3] && match[3].length) {
				prop.value = match[3];
			}
			res.push(prop);
		}
	}

	return res;
}

function createSource() {
	const args = props.map((prop) => {
		return `\t${prop.name}${prop.type ? `: ${prop.type}` : ''},`;
	});
	const componentProps = props.map((prop) => {
		return `\t${prop.name}={\${${prop.name}}}`;
	});

	let content = ['export default ('];
	content = content.concat(args);
	content = content.concat([') => {', `\treturn \`<${componentName}`]);
	content = content.concat(componentProps);
	content = content.concat(['/>`', '}']);

	if (verbose) {
		console.log(content.join('\n'));
	}

	if (dry) {
		return Promise.resolve();
	}

	return fs.writeFile(resolve(storyDir, 'source.ts'), content.join('\n'));
}

function createMarkdown() {
	const mdProps = props.map((prop) => {
		return `| ${prop.name} | ${prop.type} |  |`;
	});

	let content = [
		`# ${componentName} component`,
		'',
		'<DESCRIPTION HERE>',
		' ',
		'### Types',
		'',
		'| Name                      | Type        | Description                               |',
		'| ------------------------- | ----------- | ----------------------------------------- |',
		'',
		'### Props',
		'',
		'| Name            | Type                            | Description                                                 |',
		'| --------------- | ------------------------------- | ----------------------------------------------------------- |',
	];

	content = content.concat(mdProps);
	content = content.concat([
		'',
		'### Events',
		'',
		'| Event  | Description                                                                                                                 |',
		'| ------ | --------------------------------------------------------------------------------------------------------------------------- |',
	]);

	if (verbose) {
		console.log(content.join('\n'));
	}

	if (dry) {
		return Promise.resolve();
	}

	return fs.writeFile(
		storyName.replace('.svelte', '.md'),
		content.join('\n')
	);
}

function createStory() {
	const vars = props.map((prop) => {
		return `\tlet ${prop.name}${'type' in prop ? `: ${prop.type}` : ''}${
			'value' in prop ? ` = ${prop.value}` : ''
		};`;
	});
	const controls = props.map((prop) => {
		return `\t\t<Hst.${getControl(prop.type)} bind:value={${
			prop.name
		}} title="${title(prop.name)}" />`;
	});
	const componentProps = props.map((prop) => {
		return `\t\t\t\t${prop.name}={${prop.name}}`;
	});
	const sourceArgs = props.map((prop) => `${prop.name}`).join(', ');

	let content = [
		`<script lang="ts">`,
		`	import type { Hst as Histoire } from '@histoire/plugin-svelte';`,
		`	import {${componentName}} from '$lib';`,
		`	import { logEvent } from 'histoire/client';`,
		`	import { default as source } from './source';`,
		`	export let Hst: Histoire;`,
		``,
		`	// Component props`,
	];
	content = content.concat(vars);
	content = content.concat([
		`	const ${componentName.toLowerCase()}<INPUT>Handler = (event: CustomEvent) => {`,
		`		logEvent('change', event.detail);`,
		`	};`,
		`</script>`,
		``,
		`<Hst.Story title="${title(componentName)}">`,
		`	<svelte:fragment slot="controls">`,
	]);
	content = content.concat(controls);
	content = content.concat([
		`	</svelte:fragment>`,
		``,
		`	<Hst.Variant title="Primary" source={source(${sourceArgs})}>`,
		`		<div class="wrapper">`,
		`			<${componentName}`,
		`				on:INPUT={${componentName.toLowerCase()}<INPUT>Handler}`,
	]);
	content = content.concat(componentProps);
	content = content.concat([
		`			/>`,
		`		</div>`,
		`	</Hst.Variant>`,
		`</Hst.Story>`,
		``,
		`<style lang="scss"></style>`,
	]);
	if (verbose) {
		console.log(content.join('\n'));
	}

	if (dry) {
		return Promise.resolve();
	}

	return fs.writeFile(storyName, content.join('\n'));
}

function setupStory() {
	storyDir = resolve(storiesDir, snake(componentName));
	storyName = resolve(storyDir, `${componentName}.story.svelte`);

	if (verbose) {
		console.log(`Creating stories at: ${storyName}`);
	}

	if (existsSync(storyName)) {
		throw new Error(`Story already exists at: ${storyName}`);
	}

	if (dry) {
		return Promise.resolve();
	}

	return fs.mkdir(storyDir, { recursive: true });
}

(async () => {
	if (!componentName || !componentName.length) {
		throw new Error('Component name is required');
	}

	if (componentName.endsWith('.svelte')) {
		componentName = componentName.replace('.svelte', '');
	}

	props = await getComponentProps(componentName);

	await setupStory();
	await createStory();
	await createMarkdown();
	await createSource();

	return;
})()
	.then((result) => {
		console.log('Success 🥳');
		process.exit(0);
	})
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});
