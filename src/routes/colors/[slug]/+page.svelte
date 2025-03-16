<script lang="ts">
	import BadgeColor from '$lib/components/badge/badge-color.svelte'
	import Card from '$lib/components/card.svelte'
	import { TriangleAlertIcon } from '@lucide/svelte'

	let { data } = $props()
</script>

<main class="p-5">
	<h2 class="mb-3 font-serif text-xl font-medium capitalize">{data.slug} themes</h2>
	<ul class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
		{#each data.results as { created_at, slug, title, thumbnail, metadata } (slug)}
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
									<BadgeColor
										href={slug != data.slug ? `/colors/${slug}` : undefined}
										class={slug == data.slug && 'badge-primary font-bold'}
										color={r.metadata.color}
										{title}
									/>
								</li>
							{/each}
						</ul>
					{/snippet}
				</Card>
			</li>
		{:else}
			<article class="alert alert-warning col-span-full md:col-span-2">
				<TriangleAlertIcon />
				<div>
					<h3 class="font-semibold font-serif">
						Could not find matching results by the color &OpenCurlyDoubleQuote;{data.slug}&CloseCurlyDoubleQuote;.
					</h3>
					<p>
						Unfortunately there&apos;s no post that has this color or this simply is not a color at
						all.
					</p>
				</div>
			</article>
		{/each}
	</ul>
</main>

{#snippet badge(color: string, title: string)}
	<span class="rounded-box size-2.5" style="background-color:{color};"></span>
	<span>{title}</span>
{/snippet}
