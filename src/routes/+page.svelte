<script lang="ts">
	import { AspectRatio } from 'bits-ui'
	const { data } = $props()
</script>

<section class="p-5">
	<ul class="grid gap-5">
		{#each data.results as { metadata, slug, title, thumbnail } (slug)}
			<li class="card bg-base-200 max-w-sm">
				<a href="/theme/{slug}">
					<header class="card overflow-clip">
						<AspectRatio.Root ratio={2 / 3}>
							<img src={thumbnail} alt="" class="size-full object-cover" />
						</AspectRatio.Root>
					</header>
					<footer class="card-body">
						<p class="card-title font-serif">{title}</p>
						<p class="text-muted text-balance">{@html metadata.description}</p>
					</footer>
				</a>
			</li>
		{/each}
	</ul>
</section>
