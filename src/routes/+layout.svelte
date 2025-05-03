<script lang="ts">
	import '@fontsource/prata'
	// Supports weights 100-900
	import '@fontsource-variable/inter'
	import '@fontsource/ibm-plex-mono'
	import '../app.css'
	import { MoonIcon, SunIcon } from '@lucide/svelte'
	import { onNavigate } from '$app/navigation'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from './$types.js'
	import type { SystemTheme } from '$lib/types/theme'

	let { children, data } = $props()

	const setTheme: SubmitFunction = ({ action }) => {
		let theme = action.searchParams.get('theme') as SystemTheme | null
		theme = theme ?? 'light'
		setTimeout(() => document.documentElement.setAttribute('data-theme', theme), 150)
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<div class="container mx-auto">
	<nav class="navbar [view-transition-name:nav]">
		<ul class="navbar-start ps-4">
			<li>
				<a href="/" class="card-title text-[1.1rem]"
					>Ui<span class="-ms-2 -mt-0.5 inline-block font-mono">.ly</span></a
				>
			</li>
		</ul>
		<ul class="navbar-end">
			<li>
				<a href="/colors">Colors</a>
			</li>
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

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
