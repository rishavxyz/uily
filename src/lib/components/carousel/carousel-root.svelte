<script lang="ts">
	import { cn } from '$lib/utils'
	import emblaCarouselSvelte from 'embla-carousel-svelte'
	import type { Snippet } from 'svelte'
	type Props = {
		children: Snippet
		class?: string
	}
	let { children, class: cls }: Props = $props()
</script>

<div class={cn('overflow-hidden', cls)} use:emblaCarouselSvelte>{@render children()}</div>
