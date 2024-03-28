import fs from 'fs';
import path from 'path';
import type { MenuData } from '$lib';

const directoryPath = './src/lib'; // specify the path to the directory here
export const ssr = false;

export const load = () => {
	console.log('Loading components...');
	return getComponentsList(directoryPath);
};

// add ignore files
const ignoreFiles = [
	'component_error_event.ts',
	'component_event.ts',
	'_definitions.ts',
	'index.ts',
	'_icon_data.ts',
	'events',
];

const getComponentsList = (dirPath: string, parentId = '') => {
	const componentsList: MenuData[] = [];

	const items = fs.readdirSync(dirPath);

	items.forEach((item) => {
		if (ignoreFiles.includes(item)) {
			return;
		}
		const itemPath = path.join(dirPath, item);
		const stats = fs.statSync(itemPath);

		if (stats.isDirectory()) {
			const submenu = getComponentsList(itemPath, item).componentsList;
			componentsList.push({
				id: parentId
					? `${parentId}/${item}`.toLocaleLowerCase()
					: item.toLocaleLowerCase(),
				label: formatLabel(item),
				submenu,
			});
		} else if (
			(stats.isFile() && path.extname(item) === '.svelte') ||
			path.extname(item) === '.ts'
		) {
			if (ignoreFiles.includes(item)) {
				return;
			}
			let fileName;
			if (path.extname(item) === '.svelte') {
				fileName = path.basename(item, '.svelte');
			} else if (path.extname(item) === '.ts') {
				fileName = path.basename(item, '.ts');
			}
			if (!fileName) {
				return;
			}
			componentsList.push({
				id: parentId
					? `${parentId}/${fileName}`.toLocaleLowerCase()
					: fileName.toLocaleLowerCase(),
				label: formatLabel(fileName),
			});
		}
	});

	// Sort the submenu items alphabetically
	componentsList.sort((a, b) => a.label!.localeCompare(b.label!));
	// Sort the componentsList array so that items with a submenu are at the top
	componentsList.sort((a, b) => {
		if (a.submenu && !b.submenu) {
			return -1;
		} else if (!a.submenu && b.submenu) {
			return 1;
		} else {
			return 0;
		}
	});

	return { componentsList };
};

const formatLabel = (str: string) => {
	// Replace underscores with spaces
	let label = str.replace(/_/g, ' ');

	// Add spaces before capital letters to split camelCase
	label = label.replace(/([a-z])([A-Z])/g, '$1 $2');

	// Capitalize the first letter
	label = label.charAt(0).toUpperCase() + label.slice(1);

	return label;
};
