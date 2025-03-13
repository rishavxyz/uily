<script lang="ts">
	import { cn } from '$lib/utils'
	import type { Snippet } from 'svelte'
	type Props = {
		children: Snippet
		class?: string
	}
	let { children, class: cls }: Props = $props()
</script>

<div class="embla__slide {cn(cls)}">{@render children()}</div>

<style>
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
		overflow: clip;
	}
</style>
