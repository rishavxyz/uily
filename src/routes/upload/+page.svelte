<script>
	import { Button } from 'bits-ui'
	import Card from './card.svelte'
</script>

<Card class="m-5">
	{#snippet header()}
		<h6 class="card-title font-serif">I'm just making money</h6>
		<p>Yes, you heard right!, just makin' my moni warth.</p>
	{/snippet}

	{#snippet footer()}
		<Button.Root class="btn btn-primary">Pay $$</Button.Root>
	{/snippet}
</Card>
