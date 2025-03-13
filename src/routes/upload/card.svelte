<script lang="ts">
	import { cn } from '$lib/utils'
	import type { Snippet } from 'svelte'
	type Props = {
		class?: string
		header: Snippet
		body?: Snippet
		footer?: Snippet
	}
	let { header, body, footer, class: cls }: Props = $props()
</script>

<div class="card {cn('bg-base-200 max-w-sm', cls)}">
	<header class="card-body">
		{@render header()}
	</header>

	{#if body}{@render body()}{/if}

	{#if footer}
		<footer class="card-body">
			<div class="card-actions -mt-6 self-end">
				{@render footer()}
			</div>
		</footer>
	{/if}
</div>
