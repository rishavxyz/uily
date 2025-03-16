<script lang="ts">
	import { AspectRatio } from 'bits-ui'
	import type { Snippet } from 'svelte'
	import { formatDate } from '$lib/utils'

	type Header = {
		color: string
		thumbnail: string | null
		aspectRatio?: number
	}
	type Footer = {
		date: string
		title: string
	}
	type Props = {
		class?: string
		header: Header
		footer: Footer
		href?: string
		key?: string | number
		footerChild?: Snippet
		footerActions?: Snippet
	}
	let props: Props = $props()
</script>

<article
	class={['card card-sm bg-base-200 h-min min-w-full shadow-sm md:max-w-2xs', props.class]}
	style="view-transition-name:card-{props.key}"
>
	{@render header(props.header)}
	{@render footer(props.footer)}
</article>

{#snippet header({ color = '', thumbnail, aspectRatio = 2 / 3 }: Header)}
	{#if props.href}
		<a href={props.href} class="rounded-box overflow-clip"> {@render image()} </a>
	{:else}
		<div class="rounded-box card-border overflow-clip">{@render image()}</div>
	{/if}

	{#snippet image()}
		<AspectRatio.Root ratio={aspectRatio} class="size-full" style="background-color:{color};">
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
	{/snippet}
{/snippet}

{#snippet footer({ date, title }: Footer)}
	{#if props.footerChild}
		{@render props.footerChild()}
	{:else}
		<footer class="card-body md:text-base">
			<p class="text-muted">{formatDate(date)}</p>
			<p class="card-title font-serif capitalize">
				<a href={props.href} class="link-hover">{title}</a>
			</p>
			{#if props.footerActions}{@render props.footerActions()}{/if}
		</footer>
	{/if}
{/snippet}
