<script lang="ts">
	import { goto, pushState } from '$app/navigation'
	import BadgeColor from '$lib/components/badge/badge-color.svelte'
	import { cn } from '$lib/utils'
	import { fade, slide } from 'svelte/transition'

	type V = { color: string; href: string | undefined; title: string }

	let { data } = $props()

	let checked = $state(false)
	let colors = $state<V[]>([])
	let newUrl = ''

	function handleClick(v: V) {
		const i = colors.findIndex((c) => c.color == v.color)
		if (i >= 0) {
			colors.splice(i, 1)
		} else {
			colors.push(v)
		}
		newUrl = colors.map((c) => c.title.toLowerCase()).join('-')
		pushState(colors.length == 0 ? '' : '/colors/' + newUrl, {})
	}
</script>

<main class="mx-auto max-w-md space-y-5 p-5">
	<h1 class="card-title font-serif text-2xl">All colors</h1>

	<form action="" class="card card-border card-sm w-full md:w-sm">
		<fieldset class="card-body flex-row items-center gap-1">
			<label for="toggle">
				<h5 class="card-title mb-2 text-base">Turn on multi color mode?</h5>
				<p class="text-muted text-xs text-balance">
					With this toggle on, you can search upto 5 different colors at once. The result will be a
					mix of all the given colors.
				</p>
			</label>
			<input type="checkbox" id="toggle" bind:checked class="toggle toggle-secondary" />
		</fieldset>
	</form>

	<ul class="flex min-h-12 flex-wrap gap-3">
		{#each data.allAvailableColors as { slug, title, metadata } (slug)}
			{@const color = metadata.color}
			<li>
				<BadgeColor
					{color}
					{title}
					href={!checked ? `/colors/${slug}` : undefined}
					class={cn(
						{ 'btn btn-xs btn-ghost h-auto font-normal': checked },
						{ 'badge-neutral badge-soft': colors.find((v) => v.color == color) }
					)}
					onclick={handleClick}
					disabled={colors.length >= 5 && !colors.find((v) => v.color == color)}
				/>
			</li>
		{:else}
			<li class="text-muted text-center">No colors found</li>
		{/each}
	</ul>

	{#if checked}
		{@const color = colors.map((c) => c.color).join(',')}
		<section class="card card-border overflow-clip shadow-sm" transition:slide>
			{#if colors.length>0}
			<figure
				class="aspect-video h-20 blur-md transition-all will-change-colors"
				style={'background-blend-mode: multiply, screen;' +
					(colors.length == 1
						? `background-color: ${colors[0].color};`
						: `background-image: linear-gradient(135deg, ${color});`)}
			></figure>
			{:else}
				<div class="aspect-video h-20 grid place-items-center" in:fade>
					<span>Add colors to see the result</span>
				</div>
			{/if}
			<footer class="card-body">
				<button class="mt-3 btn btn-primary" disabled={!colors.length} onclick={() => goto('/colors/'+newUrl)}>Search colors</button>
			</footer>
		</section>
	{/if}
</main>
