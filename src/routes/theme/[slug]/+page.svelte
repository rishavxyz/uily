<script lang="ts">
	import { Carousel, CarouselContent, CarouselItem } from '$lib/components/carousel'
	import type { Result } from '$lib/types/result.js'
	import { AspectRatio } from 'bits-ui'
	import { ArrowLeftIcon } from '@lucide/svelte'
	import { Vibrant, WorkerPipeline } from 'node-vibrant/worker'
	import Pipeline from 'node-vibrant/worker.worker?worker'
	import { cn } from '$lib/utils'

	type Props = {
		data: { result: Result }
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
</script>

<div></div>

<nav class="sticky top-0 isolate z-[100] p-5">
	<a href="/" class="btn btn-outline backdrop-blur-md">
		<ArrowLeftIcon class="size-4" />
		Back
	</a>
</nav>

<main class="p-5">
	<div class="grid max-w-sm gap-5">
		<h1 class="card-title font-serif text-2xl">{result.title}</h1>

		<Carousel currentSlide={(n) => (current = n)}>
			<CarouselContent>
				<CarouselItem class="card">
					<AspectRatio.Root ratio={2 / 3}>
						<img src={file.lock_screen.imgix_url} alt="" class="size-full object-cover" />
					</AspectRatio.Root>
				</CarouselItem>
				<CarouselItem class="card">
					<AspectRatio.Root ratio={2 / 3}>
						<img src={file.home_screen.imgix_url} alt="" class="size-full object-cover" />
					</AspectRatio.Root>
				</CarouselItem>
			</CarouselContent>
			<div class="mt-4 flex justify-center gap-1.5">
				<span class="font-semibold" class:opacity-45={current}>Lock screen</span>
				<span class="opacity-30">/</span>
				<span class="font-semibold" class:opacity-45={!current}>Home screen</span>
			</div>
		</Carousel>

		<div class="card border-neutral bg-base-100 max-w-sm border">
			<div class="card-body">
				<p class="card-title font-serif">Requirments</p>
				<article class="text-base">
					{@html result.metadata.description}
				</article>
			</div>
		</div>
		<div class="grid gap-1 text-sm opacity-75">
			<p>Created by <a href="#/" class="hover:underline">{result.metadata.author.title}</a></p>
			<time datetime={result.created_at}
				>Created at {new Date(result.created_at).toLocaleDateString()}</time
			>
		</div>
	</div>
</main>

<div
	class={cn('absolute inset-0 bottom-20', 'isolate z-[-1] transition-transform')}
	id="gradient-bg"
	style="--bg-color:{backgroundColor};"
></div>

<style>
	#gradient-bg {
		--from: color-mix(in oklab, var(--bg-color) 68%, transparent);
		background-image: linear-gradient(180deg, var(--from), transparent);
		filter: blur(12px);
		transform-origin: top;
		transform: scaleY(0);
		animation: reveal 1.5s cubic-bezier(0, 0.55, 0.45, 1) forwards;
		animation-delay: 300ms;
	}
	@keyframes reveal {
		to {
			transform: scaleY(100%);
		}
	}
</style>
