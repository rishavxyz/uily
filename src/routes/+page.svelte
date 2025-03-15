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
		<h2 class="mb-5 font-serif text-xl font-medium">Recent Themes</h2>
		<ul class="grid grid-cols-2 gap-5 md:grid-cols-3">
			{#each data.results as { created_at, slug, title, thumbnail } (slug)}
				<li class="card card-sm bg-base-200 h-min md:max-w-xs">
					<a href="/theme/{slug}">
						<header class="rounded-box overflow-clip">
							<AspectRatio.Root ratio={4 / 5} class="size-full">
								<img src={thumbnail} alt="" class="size-full object-cover" />
							</AspectRatio.Root>
						</header>
						<footer class="card-body md:text-base">
							<p class="text-muted">{formatDate(created_at)}</p>
							<h6 class="font-medium">{title}</h6>
						</footer>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</main>
