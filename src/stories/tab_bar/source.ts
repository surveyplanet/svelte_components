import type { TabBarData } from '$lib';

export default (data: TabBarData[], grow: boolean, id: string) => {
	return `<script>
	let data: TabBarData[] = ${JSON.stringify(data)};

    let grow = ${grow};

	let id = '${id}';

    </script>

    <TabBar {data} {grow} {id}/>
`;
};
