<script lang="ts">
	import { formatDate } from '$lib/utils.js'
	import { AspectRatio } from 'bits-ui'
	const { data } = $props()
</script>

<main class="space-y-10 p-5">
	<header class="space-y-4 text-center text-balance">
		<h1 class="font-serif text-2xl font-medium">
			My HyperOS lock screen customizations and themes
		</h1>
	</header>

	<section>
		<h2 class="mb-3 font-serif text-xl font-medium">Recent Themes</h2>
		<ul class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
			{#each data.results as { created_at, slug, title, thumbnail, metadata } (slug)}
				<li class="card card-sm bg-base-200 h-min shadow-sm md:max-w-2xs">
					<a href="/theme/{slug}" class="rounded-box overflow-clip">
						<AspectRatio.Root
							ratio={2 / 3}
							class="size-full"
							style="background-color:{metadata.dominant_color};"
						>
							{#if thumbnail}
								<img
									src={thumbnail}
									alt=""
									loading="eager"
									draggable="false"
									class="size-full object-contain"
								/>
							{/if}
						</AspectRatio.Root>
					</a>
					<footer class="card-body md:text-base">
						<p class="text-muted">{formatDate(created_at)}</p>
						<h6 class="font-medium">{title}</h6>
						<ul class="card-actions">
							{#each metadata.categories as category}
								<li>
									<a href="#/" class="badge badge-sm badge-accent">{category.title}</a>
								</li>
							{/each}
						</ul>
					</footer>
				</li>
			{/each}
		</ul>
	</section>
</main>
