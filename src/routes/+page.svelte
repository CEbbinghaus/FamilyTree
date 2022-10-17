<script>
	import SvgContainer from "../components/SvgContainer.svelte";
</script>

<style>
@supports not (d: path("M 0,0 L 0,0")){
	.dcsswarning{
		display: block;
	}
}
</style>

<SvgContainer />

<div class="dcsswarning hidden absolute top-0 left-0 w-full h-full backdrop-blur-[1.5px]">
	<div class="absolute top-[12.5%] left-[12.5%] w-3/4 h-3/4 bg-slate-400 text-center p-20">
		<h3 class="text-5xl font-semibold mb-5">Sorry this browser doesn't support some of the features required for this app to run.</h3>
		<p class="text-2xl">Reccomended tested browsers include (Firefox, Chrome, Edge) and using any of them should get rid of this message.</p>
	</div>
</div>