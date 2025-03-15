<script lang="ts">
	import '@fontsource/prata'
	// Supports weights 100-900
	import '@fontsource-variable/inter'
	import '@fontsource/ibm-plex-mono'
	import '../app.css'
	import { MoonIcon, SunIcon } from '@lucide/svelte'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from './$types.js'
	import type { SystemTheme } from '$lib/types/theme'

	let { children, data } = $props()

	const flex = 'flex items-center justify-between'

	const setTheme: SubmitFunction = ({ action }) => {
		let theme = action.searchParams.get('theme') as SystemTheme | null
		theme = theme ?? 'light'
		setTimeout(() => document.documentElement.setAttribute('data-theme', theme), 150)
	}
</script>

<div class="container mx-auto">
	<nav class="navbar">
		<ul class="navbar-start ps-4">
			<li>
				<a href="/" class="card-title text-[1.1rem]">Ui<span class="-ms-2 font-mono">.ly</span></a>
			</li>
		</ul>
		<ul class="navbar-end">
			<li>{@render themeForm()}</li>
		</ul>
	</nav>
	{@render children()}
</div>

{#snippet themeForm()}
	{@const theme = data.theme == 'dark' ? 'light' : 'dark'}
	<form method="post" action="/?/set-theme&theme={theme}" use:enhance={setTheme}>
		<label for="theme-toggle" class="swap swap-rotate px-4">
			<input type="checkbox" id="theme-toggle" checked={theme == 'dark'} hidden />
			<MoonIcon class="swap-on -z-1 size-5" />
			<SunIcon class="swap-off -z-1 size-5" />
			<button aria-label="toggle theme" class="size-5 cursor-pointer"></button>
		</label>
	</form>
{/snippet}
