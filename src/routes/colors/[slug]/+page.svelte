<script lang="ts">
	import { formatDate } from '$lib/utils.js'
	import { TriangleAlertIcon } from '@lucide/svelte'
	import { AspectRatio } from 'bits-ui'

	let { data } = $props()
</script>

<main class="p-5">
	<h2 class="mb-3 font-serif text-xl font-medium capitalize">{data.slug} themes</h2>
	<ul class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
		{#each data.results as { created_at, slug, title, thumbnail, metadata } (slug)}
			<li class="card card-sm bg-base-200 h-min min-w-full shadow-sm md:max-w-2xs">
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
					<p class="card-title font-serif capitalize">
						<a href="/theme/{slug}" class="link-hover">{title}</a>
					</p>
					<ul class="card-actions">
						{#each metadata.colors as color}
							{@const c = color.metadata.color}
							{@const t = color.title}

							{#if color.slug == data.slug}
								<li class="badge badge-sm badge-outline">
									{@render badge(c, t)}
								</li>
							{:else}
								<li>
									<a href="/colors/{color.slug}" class="badge badge-sm badge-accent link-hover">
										{@render badge(c, t)}
									</a>
								</li>
							{/if}
						{/each}
					</ul>
				</footer>
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
