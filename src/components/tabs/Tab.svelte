<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
    import {Button} from 'svelte-materialify'
	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);
	registerTab(tab);
</script>

<style>

</style>

<Button text tile active="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</Button>