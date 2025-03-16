<script lang="ts">
	import { Carousel, CarouselContent, CarouselItem } from '$lib/components/carousel'
	import { AspectRatio } from 'bits-ui'
	import { ArrowLeftIcon, EditIcon } from '@lucide/svelte'
	import moment from 'moment'
	import type { Result } from '$lib/types/result.js'
	import type { SystemTheme } from '$lib/types/theme'
	import BadgeColor from '$lib/components/badge/badge-color.svelte'

	type Props = {
		data: { result: Result; theme: SystemTheme }
	}
	let { data }: Props = $props()
	const { result } = data
	const backgroundColor = result.metadata.dominant_color

	let current = $state(0)
	let imgLoaded = $state(false)

	const date = moment(result.created_at).fromNow()
</script>

<header>
	<a href="/" class="link-hover btn btn-outline mx-5 my-2">
		<ArrowLeftIcon />
		Back
	</a>
</header>

<main class="mx-auto flex flex-col items-start justify-evenly gap-5 p-5 md:flex-row md:gap-20">
	<div class="w-full flex-1 justify-center space-y-5 md:grid">
		<h1 class="card-title font-serif text-2xl capitalize">{result.title}</h1>

		<Carousel currentSlide={(n) => (current = n)} class="-mx-3 md:mx-0 md:w-sm" key={result.slug}>
			<CarouselContent>
				{#each result.metadata.screenshots as { screenshot }, i (i)}
					<CarouselItem class="card">
						<div style="background-color:{backgroundColor};">
							<AspectRatio.Root ratio={9 / 18}>
								<img
									src={screenshot.imgix_url}
									alt=""
									onload={() => (imgLoaded = true)}
									loading="eager"
									draggable="false"
									class="size-full object-contain"
								/>
							</AspectRatio.Root>
						</div>
					</CarouselItem>
				{/each}
			</CarouselContent>

			<div class="mt-4 flex justify-center gap-1.5">
				<span class="font-semibold" class:text-muted={current}>Lock screen</span>
				{#if result.metadata.screenshots.length > 1}
					<span class="opacity-30">/</span>
					<span class="font-semibold" class:text-muted={!current}>Home screen</span>
				{/if}
			</div>
		</Carousel>
	</div>

	<div class="grid max-w-xl flex-1 gap-5">
		<section class="space-y-5">
			<div class="space-y-1">
				<p class="font-medium tracking-wide">
					<a href="#/" class="link">{result.metadata.author.title}</a>
				</p>
				<time class="text-muted text-sm" datetime={result.created_at}>Created {date}</time>
			</div>

			<div class="space-y-3">
				<p class="card-title font-serif">Dominant colors</p>
				<ul class="card-actions">
					{#each result.metadata.colors as { slug, title, ...r } (slug)}
						<li>
							<BadgeColor href="/colors/{slug}" color={r.metadata.color} {title} />
						</li>
					{/each}
				</ul>
			</div>
		</section>

		{#if result.metadata.steps_to_recreate}
			<section class="mt-4 space-y-4">
				<p class="card-title font-serif">Steps to Recreate</p>
				{@render html(result.metadata.steps_to_recreate)}
			</section>
		{/if}

		{#if result.metadata.notes}
			<section class="card border-neutral bg-base-100 mt-4 border">
				<div class="card-body">
					<h2 class="card-title items-start font-serif">
						<EditIcon class="opacity-90" />
						Notes
					</h2>
					{@render html(result.metadata.notes)}
				</div>
			</section>
		{/if}
		<footer>
			<a href="/" class="link-hover btn btn-outline my-2 w-full"> Back to home </a>
		</footer>
	</div>
</main>

{#snippet html(content: string)}
	<article class="prose text-balance">{@html content}</article>
{/snippet}

{#if imgLoaded}
	<div
		id="gradient-bg"
		class="absolute inset-0 isolate -z-2 h-screen transition-transform"
		style="
		--color: {backgroundColor};
		--opacity: {data.theme == 'dark' ? 52 : 42}%;
	"
	></div>
{/if}

<style>
	#gradient-bg {
		--from: color-mix(in oklab, var(--color) var(--opacity), transparent);
		background-image: linear-gradient(180deg, var(--from), transparent);
		/* filter: blur(12px); */
		transform-origin: top;
		transform: scaleY(0);
		animation: reveal 2s cubic-bezier(0.77, 0, 0.13, 1) forwards;
		animation-delay: 0.7s;
	}
	@keyframes reveal {
		to {
			transform: scaleY(100%);
		}
	}
</style>
