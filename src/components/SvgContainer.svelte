<script lang="ts">
	import { zoom as d3Zoom, select, zoomIdentity } from 'd3';
	import SvgBox from './SvgBox.svelte';

	import {onMount} from 'svelte';


	export let minZoom = 0.1;
	export let maxZoom = 10;
	export let width: number;
	export let height: number;

	let innerWidth: number;
	let innerHeight: number;

	$: calculatedWidth = width || innerWidth || 0;
	$: calculatedHeight = height || innerHeight || 0;

	const gridSize = 100;

	let svgElement: HTMLElement;
	let gElement: HTMLElement;
	let gridElement: HTMLElement;

	onMount(() => {
		// svelte:window does not set its properties before onMount so we have to set them manually
		innerWidth = window.innerWidth;
		innerHeight = window.innerHeight;

		// we have to manually process it in the onMount since the reactive state doesn't recompute until after te function has exited
		calculatedWidth = width || innerWidth;
		calculatedHeight = height || innerHeight;

		// Call this function to modify the pattern when zooming/panning.
		function updateGrid(zoomEvent: any) {
			let opacity = Math.min(Math.max(zoomEvent.transform.k, 0.4), 1);
			select(gridElement)
				.attr('x', zoomEvent.transform.x)
				.attr('y', zoomEvent.transform.y)
				.attr('width', gridSize * zoomEvent.transform.k)
				.attr('height', gridSize * zoomEvent.transform.k)
				.selectAll('path')
					.attr('x', gridSize * zoomEvent.transform.k / 2)
					.attr('y', gridSize * zoomEvent.transform.k / 2)
					.attr('opacity', opacity); // Lower opacity as the pattern gets more dense.
		}

		const g = select(gElement);

		// create zoom handler
		const zoom = (d3Zoom()
			.scaleExtent([minZoom, maxZoom])
			.on("zoom", function (evt) {
				g.attr("transform", evt.transform);
				updateGrid(evt);
			}));

		// make a svg
		const svg = select(svgElement)
			// .attr("viewBox", [0, 0, calculatedWidth, calculatedHeight])
			//@ts-ignore
			.call(zoom);
			
		// set zoom identity
		svg.call(
			//@ts-ignore
			zoom.transform,
			zoomIdentity.translate(calculatedWidth / 2, calculatedHeight / 2).scale(1)
		).on("dblclick.zoom", null);
	
	})
</script>

<svelte:window  bind:innerWidth bind:innerHeight></svelte:window>

<svg width={calculatedWidth} height={calculatedHeight} bind:this={svgElement} viewBox="0, 0, {calculatedWidth}, {calculatedHeight}">
	<defs>
		<pattern bind:this={gridElement} id="grid" x=0 y=0 width="{gridSize}" height="{gridSize}" patternUnits="userSpaceOnUse">
		  <path d="M {gridSize * 10} 0 L 0 0 0 {gridSize * 10}" fill="none" stroke="gray" stroke-width="1"/>
		</pattern> 
	</defs>
		  
	<rect width="100%" height="100%" fill="url(#grid)" />
	<g bind:this={gElement} transform="translate({calculatedWidth / 2}, {calculatedHeight / 2})">
		<SvgBox data={{x: 0, y: 0, width: 100, height: 100}}/>
		<SvgBox data={{x: -300, y: -300, width: 100, height: 100}}/>
		<SvgBox data={{x: 300, y: -300, width: 100, height: 100}}/>
		<SvgBox data={{x: -300, y: 300, width: 100, height: 100}}/>
		<SvgBox data={{x: 300, y: 300, width: 100, height: 100}}/>
	</g>
</svg>