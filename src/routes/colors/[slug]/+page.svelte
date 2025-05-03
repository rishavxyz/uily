<script lang="ts">
	import BadgeColor from '$lib/components/badge/badge-color.svelte'
	import Card from '$lib/components/card.svelte'
	import { ArrowLeftIcon, TriangleAlertIcon } from '@lucide/svelte'

	let { data } = $props()

	let colors = data.slug.split('-')
	let str = $state('')

	colors.forEach((color,i) => {
		if (color.length == 0) return
		if (i == colors.length - 2) {
			str += color + ' & '
		} else if (i == colors.length - 1) {
			str += color
		} else {
			str += color + ', '
		}
	})
</script>

<header>
	<a href="/colors" class="link-hover btn btn-outline mx-5 my-2">
		<ArrowLeftIcon />
		Back
	</a>
</header>

<main class="p-5">
	<h2 class="mb-3 font-serif text-xl font-medium capitalize">{str} themes</h2>
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
										href="/colors/{slug}"
										class={[colors.includes(slug) && 'badge-neutral badge-soft font-medium']}
										{...r}
										{title}
										color={r.metadata.color}
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
