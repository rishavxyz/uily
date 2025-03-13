<script lang="ts">
	import { cn } from '$lib/utils'
	import type { Snippet } from 'svelte'
	type Props = {
		children: Snippet
		class?: string
	}
	let { children, class: cls }: Props = $props()
</script>

<div class="embla__container {cn('gap-5', cls)}">{@render children()}</div>

<style>
	.embla__container {
		display: flex;
	}
</style>
