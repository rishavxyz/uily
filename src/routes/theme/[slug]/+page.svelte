<script lang="ts">
	import { Carousel, CarouselContent, CarouselItem } from '$lib/components/carousel'
	import type { Result } from '$lib/types/result.js'
	import { AspectRatio } from 'bits-ui'
	import { ArrowLeftIcon } from '@lucide/svelte'

	type Props = {
		data: { result: Result }
	}
	let { data }: Props = $props()
	const { result } = data
	const file = result.metadata.files[0]

	let current = $state(0)
</script>

<nav class="p-5">
	<a href="/" class="btn btn-neutral">
		<ArrowLeftIcon class="size-4" />
		Back
	</a>
</nav>

<main class="p-5">
	<div class="grid max-w-sm gap-4">
		<h1 class="card-title font-serif text-xl">{result.title}</h1>

		<Carousel currentSlide={(n) => (current = n)}>
			<CarouselContent>
				<CarouselItem class="card">
					<AspectRatio.Root ratio={2 / 3}>
						<img src={file.home_screen.imgix_url} alt="" class="size-full object-cover" />
					</AspectRatio.Root>
				</CarouselItem>
				<CarouselItem class="card">
					<AspectRatio.Root ratio={2 / 3}>
						<img src={file.lock_screen.imgix_url} alt="" class="size-full object-cover" />
					</AspectRatio.Root>
				</CarouselItem>
			</CarouselContent>
			<div class="mt-4 flex justify-center gap-1.5">
				<span class="font-semibold" class:opacity-45={current}>Lock screen</span>
				<span class="opacity-30">/</span>
				<span class="font-semibold" class:opacity-45={!current}>Home screen</span>
			</div>
		</Carousel>

		<p class="opacity-75">{@html result.metadata.description}</p>
		<div class="grid gap-1 text-sm opacity-75">
			<p>Created by <a href="#/" class="hover:underline">{result.metadata.author.title}</a></p>
			<time datetime={result.created_at}
				>Created at {new Date(result.created_at).toLocaleDateString()}</time
			>
		</div>
	</div>
</main>
