<script lang="ts">
	import { Carousel, CarouselContent, CarouselItem } from '$lib/components/carousel'
	import { AspectRatio } from 'bits-ui'
	import { EditIcon } from '@lucide/svelte'
	import { Vibrant, WorkerPipeline } from 'node-vibrant/worker'
	import moment from 'moment'
	import Pipeline from 'node-vibrant/worker.worker?worker'
	import type { Result } from '$lib/types/result.js'
	import type { SystemTheme } from '$lib/types/theme'

	type Props = {
		data: { result: Result; theme: SystemTheme }
	}
	let { data }: Props = $props()
	const { result } = data
	const lockScreen = result.metadata.screenshots[0]

	let current = $state(0)
	let backgroundColor = $state('transparent')
	let imgLoaded = $state(false)

	function extractColors(src: string) {
		Vibrant.use(new WorkerPipeline(Pipeline as never))

		const img = new Image()
		img.src = src
		img.crossOrigin = 'anonymous'
		img.onload = async () => {
			const builder = Vibrant.from(img)
			const colors = await builder.getPalette()
			backgroundColor = colors.DarkVibrant?.hex ?? 'transparent'
			imgLoaded = true
		}
	}

	$effect(() => {
		extractColors(lockScreen.screenshot.imgix_url)
	})
	const date = moment(result.created_at).fromNow()
</script>

<main class="mx-auto flex flex-col justify-evenly gap-5 p-5 md:flex-row md:gap-20">
	<div class="grid gap-5 md:max-w-xs">
		<h1 class="card-title font-serif text-2xl">{result.title}</h1>

		<Carousel currentSlide={(n) => (current = n)} class="-mx-3">
			<CarouselContent>
				{#each result.metadata.screenshots as { screenshot }, i (i)}
					<CarouselItem class="card">
						<div style="background-color:{backgroundColor};">
							<AspectRatio.Root ratio={9 / 18}>
								{#if imgLoaded}
									<img
										src={screenshot.imgix_url}
										alt=""
										loading="eager"
										draggable="false"
										class="size-full object-contain"
									/>
								{/if}
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
		<section class="space-y-1">
			<div class="space-y-1">
				<p class="font-medium tracking-wide">
					<a href="#/" class="link">{result.metadata.author.title}</a>
				</p>
				<time class="text-muted text-sm" datetime={result.created_at}>Created {date}</time>
			</div>

			<ul class="mt-2 flex flex-wrap gap-3">
				{#each result.metadata.categories as category (category.slug)}
					<li>
						<a href="#/" class="badge badge-accent">{category.title}</a>
					</li>
				{/each}
			</ul>
		</section>

		{#if result.metadata.steps_to_recreate}
			<section class="mt-4 space-y-4">
				<p class="font-serif text-xl font-medium">Steps to Recreate</p>
				{@render html(result.metadata.steps_to_recreate)}
			</section>
		{/if}

		{#if result.metadata.notes}
			<section class="card border-neutral bg-base-100 mt-4 max-w-lg border">
				<div class="card-body">
					<h2 class="flex gap-3 font-serif text-xl">
						<EditIcon class="text-muted" />
						Notes
					</h2>
					{@render html(result.metadata.notes)}
				</div>
			</section>
		{/if}
	</div>
</main>

{#snippet html(content: string)}
	<article class="prose text-balance">{@html content}</article>
{/snippet}

{#if imgLoaded}
	<div
		id="gradient-bg"
		class="absolute inset-0 bottom-20 isolate -z-2 transition-transform"
		style="
		--color: {backgroundColor};
		--opacity: {data.theme == 'dark' ? 62 : 28}%;
	"
	></div>
{/if}

<style>
	#gradient-bg {
		--from: color-mix(in oklab, var(--color) var(--opacity), transparent);
		background-image: linear-gradient(180deg, var(--from), transparent);
		filter: blur(12px);
		transform-origin: top;
		transform: scaleY(0);
		animation: reveal 3s cubic-bezier(0, 0.55, 0.45, 1) forwards;
		animation-delay: 0.7s;
	}
	@keyframes reveal {
		to {
			transform: scaleY(100%);
		}
	}
</style>
