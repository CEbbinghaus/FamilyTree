<script lang="ts">
	import { zoom as d3Zoom, select, zoomIdentity } from 'd3';
	import SvgBox from './SvgBox.svelte';

	import {onMount} from 'svelte';
  
	export const width = 1920;
	export const height = 1080;

	let svgElement: HTMLElement;
	let gElement: HTMLElement;

	onMount(() => {

		const g = select(gElement);

		// create zoom handler
		const zoom = (d3Zoom()
			.scaleExtent([.5, 5])
			.on("zoom", function (evt) {
				g.attr("transform", evt.transform);
			}));

		// make a svg
		const svg = select(svgElement)
			.attr("viewBox", [0, 0, width, height])
			//@ts-ignore
			.call(zoom);
			
		// set zoom identity
		svg.call(
			//@ts-ignore
			zoom.transform,
			zoomIdentity.translate(width / 2, height / 2).scale(1)
		).on("dblclick.zoom", null);

	
	})
</script>
  
<svg bind:this={svgElement}>
	<g bind:this={gElement} transform="translate({width / 2}, {height / 2})">
		<SvgBox data={{x: 0, y: 0, width: 100, height: 100}}/>
		<SvgBox data={{x: -300, y: -300, width: 100, height: 100}}/>
		<SvgBox data={{x: 300, y: -300, width: 100, height: 100}}/>
		<SvgBox data={{x: -300, y: 300, width: 100, height: 100}}/>
		<SvgBox data={{x: 300, y: 300, width: 100, height: 100}}/>
	</g>
</svg>