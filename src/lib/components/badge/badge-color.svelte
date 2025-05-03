<script lang="ts">
	type Props = {
		class?: string | boolean
		color: string
		href?: string
		title: string
		disabled?: boolean
		onclick?: (v: { color: string; href: string | undefined; title: string }) => void
	}
	let { color, href, title, disabled, class: cls, onclick }: Props = $props()
	const defClass = 'badge badge-sm badge-accent'

	function handleClick() {
		if (onclick) {
			onclick({ color, href, title })
		}
	}
</script>

{#if href}
	<a onclick={handleClick} {href} class={[defClass, 'link-hover', cls]}>{@render content()}</a>
{:else}
	<button onclick={handleClick} class={[defClass, cls]} {disabled}>{@render content()}</button>
{/if}

{#snippet content()}
	<span class="rounded-box size-2.5" style="background-color:{color};"></span>
	<span>{title}</span>
{/snippet}
