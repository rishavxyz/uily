<script lang="ts">
	import '@fontsource/prata'
	// Supports weights 100-900
	import '@fontsource-variable/inter'
	import '@fontsource/ibm-plex-mono'
	import '../app.css'

	let { children } = $props()
</script>

<div class="container mx-auto">
	{@render children()}
</div>
