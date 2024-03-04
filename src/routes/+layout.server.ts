import fs from 'fs';
import path from 'path';
import type { DropdownOption } from '$lib/Dropdown.svelte';

const directoryPath = './src/lib'; // specify the path to the directory here
export const ssr = false;

export const load = () => {
	console.log('Loading components...');
	return getComponentsList(directoryPath);
};

const getComponentsList = (dirPath: string, parentId = '') => {
	const componentsList: DropdownOption[] = [];

	const items = fs.readdirSync(dirPath);

	items.forEach((item) => {
		if (item === 'events' || item === 'actions') {
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
		} else if (stats.isFile() && path.extname(item) === '.svelte') {
			const fileName = path.basename(item, '.svelte');
			componentsList.push({
				id: parentId
					? `${parentId}/${fileName}`.toLocaleLowerCase()
					: fileName.toLocaleLowerCase(),
				label: formatLabel(fileName),
			});
		}
	});

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
