<script lang="ts">
	import Card from '$lib/components/card.svelte'
	import BadgeColor from '$lib/components/badge/badge-color.svelte'
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
			{#each data.results as { created_at, slug, title, thumbnail, metadata }, i (slug)}
				<li>
					<Card
						key={slug}
						href="/theme/{slug}"
						header={{ color: metadata.dominant_color, thumbnail }}
						footer={{ date: created_at, title }}
					>
						{#snippet footerActions()}
							<ul class="card-actions">
								{#each metadata.colors as { slug, title, ...r } (slug)}
									<li>
										<BadgeColor href="/colors/{slug}" color={r.metadata.color} {title} />
									</li>
								{/each}
							</ul>
						{/snippet}
					</Card>
				</li>
			{/each}
		</ul>
	</section>
</main>
