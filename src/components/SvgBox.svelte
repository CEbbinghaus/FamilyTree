<script lang="ts">
	import { ActiveCard } from '$lib/Store';
	import {scale} from 'svelte/transition'
	export let data: {x: number, y: number, width: number, height: number};
	
	const Id = Math.random().toString().slice(2, 8);

	function getPath({width, height}: {width: number, height: number}, isOpen?: boolean): string {
		let originalHeight = height;
		let originalWidth = width;
		
		if(isOpen)
			height *= 2;
		
		let halfWidth = width / 2;
		let halfHeight = originalHeight / 2;
		
		return `M${-halfWidth},${-halfHeight} v${height} h${width} v${-height} Z`;
	}
	
	$: isOpen = $ActiveCard == Id;
	$: path = getPath(data, isOpen)

	$: style = `fill: ${isOpen ? "#0ff" : "#f0f"};d: path( "${path}" )`;

	function test() {
		if($ActiveCard == Id)
			$ActiveCard = "";
		else	
			$ActiveCard = Id;
	}
</script>

<style>
path {
	transition: ease 250ms;
}
</style>

<g transform={`translate(${data.x},${data.y})`}>
	<path on:click={test} on:keypress={test} style="{style}"/>
</g>