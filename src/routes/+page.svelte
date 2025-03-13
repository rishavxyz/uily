<script lang="ts">
	import { Carousel, CarouselContent, CarouselItem } from '$lib/components/carousel'
	import { AspectRatio } from 'bits-ui'
	const { data } = $props()
</script>

<section class="p-5">
	<ul class="grid gap-5">
		{#each data.results as result}
			<li class="card bg-base-200 max-w-sm">
				<div class="card-body">
					<p class="card-title font-serif">{result.properties.Name.title[0].plain_text}</p>
					<p class="opacity-75">{result.properties.Description.rich_text[0].plain_text}</p>
					<Carousel>
						<CarouselContent>
							{#each result.properties.Thumbnails.files as file}
								<CarouselItem class="card">
									<AspectRatio.Root ratio={2 / 3}>
										<img src={file.file.url} alt="" class="size-full object-cover" />
									</AspectRatio.Root>
								</CarouselItem>
							{/each}
						</CarouselContent>
					</Carousel>
				</div>
			</li>
		{/each}
	</ul>
</section>
