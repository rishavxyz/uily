<script lang="ts">
	import { Carousel, CarouselContent, CarouselItem } from '$lib/components/carousel'
	import type { Result } from '$lib/types/result.js'
	import { AspectRatio } from 'bits-ui'
	import { ArrowLeftIcon } from '@lucide/svelte'
	import { Vibrant, WorkerPipeline } from 'node-vibrant/worker'
	import Pipeline from 'node-vibrant/worker.worker?worker'
	import { cn } from '$lib/utils'
	import moment from 'moment'
	import { MediaQuery } from 'svelte/reactivity'

	type Props = {
		data: { result: Result }
	}
	let { data }: Props = $props()
	const { result } = data
	const file = result.metadata.files[0]

	const isDarkMode = new MediaQuery('(prefers-color-scheme:dark)')

	let current = $state(0)
	let backgroundColor = $state('transparent')
	let likes = $state(result.metadata.likes ?? Math.floor(Math.random() * 9))
	let liked = $state(false)

	function extractColors(src: string) {
		Vibrant.use(new WorkerPipeline(Pipeline as never))

		const img = new Image()
		img.src = src
		img.crossOrigin = 'anonymous'
		img.onload = async () => {
			const builder = Vibrant.from(img)
			const colors = await builder.getPalette()
			backgroundColor =
				colors[isDarkMode.current ? 'DarkVibrant' : 'LightVibrant']?.hex ?? 'transparent'
		}
	}

	$effect(() => {
		extractColors(file.lock_screen.imgix_url)
	})
	const imgUrl = (s: TemplateStringsArray) => '/emoticons/' + s.join('/')
	const date = moment(result.created_at).fromNow()
	const reaction = {
		name: 'Like',
		src: imgUrl`OK hand.png`
	}
</script>

<nav class="sticky top-0 isolate z-[100] p-5">
	<a href="/" class="btn btn-outline backdrop-blur-md">
		<ArrowLeftIcon class="size-4" />
		Back
	</a>
</nav>

<main class="mx-auto grid max-w-sm gap-5 p-5">
	<h1 class="card-title font-serif text-2xl">{result.title}</h1>

	<Carousel currentSlide={(n) => (current = n)}>
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

	<section class="flex flex-wrap justify-between gap-1">
		<div class="grid gap-1">
			<p class="font-medium tracking-wide">
				<a href="#/" class="link dark:link-primary">{result.metadata.author.title}</a>
			</p>
			<time class="text-muted text-sm" datetime={result.created_at}>Created {date}</time>
		</div>

		<div
			class={cn(
				'card border-neutral card-xs w-16 border',
				liked ? 'bg-secondary/[.2]' : 'bg-base-200'
			)}
		>
			<div class="card-body flex-row items-center justify-center gap-1">
				<button
					class={cn(
						'scale-3d transition-transform will-change-transform',
						'size-7 cursor-pointer duration-200 ease-out',
						'hover:scale-200 active:scale-125'
					)}
					onclick={() => {
						liked = !liked
						liked ? likes++ : likes--
					}}
				>
					<img
						alt=""
						src={reaction.src}
						loading="lazy"
						draggable="false"
						class="block size-full object-cover"
						oncontextmenu={(e) => e.preventDefault()}
					/>
				</button>
				<span class="flex-1 text-lg">{likes}</span>
			</div>
		</div>
	</section>

	<section class="space-y-4">
		<p class="font-serif text-xl font-medium">Steps to create</p>
		<ol class="space-y-4">
			{#each result.metadata.requirments as { requirment }, i}
				<li class=""><span class="text-muted">{i + 1}&period;</span> {requirment}</li>
			{:else}
				<li>No steps provided &colon;&lpar;</li>
			{/each}
		</ol>
	</section>

	{#if result.metadata.comment}
		<div class="card border-neutral bg-base-100 max-w-sm border">
			<div class="card-body">
				<h2 class="font-serif text-xl">Comments</h2>
				<article class="prose">{@html result.metadata.comment}</article>
			</div>
		</div>
	{/if}
</main>

<div
	id="gradient-bg"
	class="absolute inset-0 bottom-20 isolate z-[-1] transition-transform"
	style="
		--color: {backgroundColor};
		--opacity: {isDarkMode.current ? 62 : 100}%;
	"
></div>

<style>
	#gradient-bg {
		--from: color-mix(in oklab, var(--color) var(--opacity), transparent);
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
