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
	const file = result.metadata.files[0]

	let current = $state(0)
	let backgroundColor = $state('transparent')

	function extractColors(src: string) {
		Vibrant.use(new WorkerPipeline(Pipeline as never))

		const img = new Image()
		img.src = src
		img.crossOrigin = 'anonymous'
		img.onload = async () => {
			const builder = Vibrant.from(img)
			const colors = await builder.getPalette()
			backgroundColor = colors.DarkVibrant?.hex ?? 'transparent'
		}
	}

	$effect(() => {
		extractColors(file.lock_screen.imgix_url)
	})
	const date = moment(result.created_at).fromNow()
</script>

<main class="mx-auto flex flex-col justify-between gap-5 p-5 md:flex-row">
	<div class="grid gap-5 md:max-w-xs">
		<h1 class="card-title font-serif text-2xl">{result.title}</h1>

		<Carousel currentSlide={(n) => (current = n)} class="-mx-3">
			<CarouselContent>
				<CarouselItem class="card">
					<div style="background-color:{backgroundColor};">
						<AspectRatio.Root ratio={9 / 18}>
							<img src={file.lock_screen.imgix_url} alt="" class="size-full object-contain" />
						</AspectRatio.Root>
					</div>
				</CarouselItem>
				<CarouselItem class="card">
					<div style="background-color:{backgroundColor};">
						<AspectRatio.Root ratio={9 / 18}>
							<img src={file.home_screen.imgix_url} alt="" class="size-full object-contain" />
						</AspectRatio.Root>
					</div>
				</CarouselItem>
			</CarouselContent>
			<div class="mt-4 flex justify-center gap-1.5">
				<span class="font-semibold" class:text-muted={current}>Lock screen</span>
				<span class="opacity-30">/</span>
				<span class="font-semibold" class:text-muted={!current}>Home screen</span>
			</div>
		</Carousel>
	</div>

	<div class="grid gap-5">
		<section class="space-y-1">
			<div class="space-y-1">
				<p class="font-medium tracking-wide">
					<a href="#/" class="link">{result.metadata.author.title}</a>
				</p>
				<time class="text-muted text-sm" datetime={result.created_at}>Created {date}</time>
			</div>

			<article class="mt-4">{@html result.metadata.description}</article>
		</section>

		<section class="mt-4 space-y-4">
			<p class="font-serif text-xl font-medium">Steps to create</p>
			<ol class="space-y-4">
				{#each result.metadata.requirments as { requirment }, i}
					<li class=""><span class="text-muted">{i + 1}&period;</span> {requirment}</li>
				{:else}
					<li>No steps provided &colon;&lpar;</li>
				{/each}
			</ol>
		</section>

		{#if result.metadata.notes}
			<div class="card border-neutral bg-base-100 mt-4 max-w-sm border">
				<div class="card-body">
					<h2 class="flex gap-3 font-serif text-xl">
						<EditIcon class="text-muted" />
						Notes
					</h2>
					<article class="prose">{@html result.metadata.notes}</article>
				</div>
			</div>
		{/if}
	</div>
</main>

<div
	id="gradient-bg"
	class="absolute inset-0 bottom-20 isolate -z-2 transition-transform"
	style="
		--color: {backgroundColor};
		--opacity: {data.theme == 'dark' ? 62 : 28}%;
	"
></div>

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
