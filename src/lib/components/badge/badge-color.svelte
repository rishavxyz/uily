<script lang="ts">
	type Props = {
		class?: string | boolean
		color: string
		href?: string
		title: string
	}
	let { color, href, title, class: cls }: Props = $props()
	const defClass = 'badge badge-sm badge-accent'
</script>

{#if href}
	<a {href} class={[defClass, 'link-hover', cls]}>{@render content()}</a>
{:else}
	<div class={[defClass, cls]}>{@render content()}</div>
{/if}

{#snippet content()}
	<span class="rounded-box size-2.5" style="background-color:{color};"></span>
	<span>{title}</span>
{/snippet}
