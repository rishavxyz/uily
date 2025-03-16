<script lang="ts">
	import { cn } from '$lib/utils'
	import emblaCarouselSvelte from 'embla-carousel-svelte'
	import type { Snippet } from 'svelte'

	let api = $state()
	let current = $state(0)

	// TODO: Add type support by installing `embla carousel`
	function onInit(e: { detail: unknown }) {
		api = e.detail
		api.on('slidesInView', () => {
			current = api.slidesInView()[0]
		})
	}
	type Props = {
		children: Snippet
		class?: string
		currentSlide?: (n: number) => void
		key?: string | number
	}
	let { children, class: cls, currentSlide, key }: Props = $props()

	$effect(() => {
		if (currentSlide) currentSlide(current)
	})
</script>

<div
	class={cn('overflow-hidden', cls)}
	style="view-transition-name:card-{key}"
	use:emblaCarouselSvelte
	onemblaInit={onInit}
>
	{@render children()}
</div>
