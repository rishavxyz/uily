<script lang="ts">
	import { Carousel, CarouselContent, CarouselItem } from '$lib/components/carousel'
	import { AspectRatio } from 'bits-ui'
	const { data } = $props()
</script>

<section class="p-5">
	<ul class="grid gap-5">
		{#each data.results as { metadata, created_at, slug, id, title } (id)}
			{@const file = metadata.files[0]}
			<li class="card bg-base-200 max-w-sm">
				<a href="/theme/{slug}" class="card-body">
					<div class="flex items-center justify-between text-xs opacity-75">
						<span class="hover:underline">{metadata.author.title}</span>
						<span>{new Date(created_at).toLocaleDateString()}</span>
					</div>
					<p class="card-title font-serif">{title}</p>
					<p class="text-balance opacity-75">{@html metadata.description}</p>
					<Carousel class="mt-3">
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
					</Carousel>
				</a>
			</li>
		{/each}
	</ul>
</section>
