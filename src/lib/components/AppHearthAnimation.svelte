<script>
	import { quintOut } from 'svelte/easing';
	import { draw } from 'svelte/transition';
	import { userStore } from '../store/user.svelte';

	const pathData = "M624.168 156.467C621.44 133.713 614.108 111.753 602.619 91.9238C591.13 72.0948 575.724 54.8125 557.341 41.1295C538.957 27.4465 517.98 17.6494 495.688 12.3349C473.396 7.02047 450.255 6.29998 427.675 10.2173C405.096 14.1347 383.55 22.6079 364.351 35.1207C345.151 47.6336 328.701 63.9241 316 82.9999C300.569 60.2523 279.802 41.6298 255.514 28.7592C231.225 15.8887 204.155 9.16187 176.667 9.1665H176.5C144.587 9.12687 113.318 18.1418 86.324 35.1642C59.3301 52.1865 37.7192 76.5177 24.0015 105.332C10.2838 134.146 5.0221 166.261 8.82762 197.946C12.6331 229.631 25.3497 259.587 45.5002 284.333C65.6508 309.08 130.278 349.237 176.5 393.861C249.977 464.797 316 601.833 316 601.833C316 601.833 425.298 444.591 527.5 385.072C572.561 358.831 603.897 346.278 624.168 340.302C645.409 334.04 656.5 333.5 664.5 333.5 l20 0 l20 -40 l20 40 l30 0 l20 -80 l20 120 l20 -40 l40 0 l20 -40 l20 60 l20 -20 l20 0 l20 0";

    const currentTime = $derived(userStore.secondsRemaining);
</script>

<div class="flex items-center justify-center">
    {#key currentTime}
	<svg class="w-50 h-50" viewBox="0 0 1097 609" xmlns="http://www.w3.org/2000/svg">
		<path
			d={pathData}
			stroke="#d72638"
			stroke-width="14"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="none"
			in:draw={{ duration: 1000, easing: quintOut }}
		/>
	</svg>
    {/key}
</div>

<!--<style>
	.container {
		width: 100%;
		max-width: 1097px;
		margin: 2rem auto;
		padding: 1rem;
		background-color: #f0f0f0;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}
	svg {
		display: block;
		width: 100%;
		height: auto;
	}
</style>-->