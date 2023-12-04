<script>
	// const user = true;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="home">
	<div class="content">
		<div class="text-column">
			<h2>C&L - Time locked NFT</h2>
			Application for creating your time locked NFT
		</div>
		<!-- {#if user === true}
			<a href="/contracts" class="button">Get Started</a>
		{:else} -->
		<a href="/login" class="button">Get Started</a>
		<!-- {/if} -->
	</div>
</div>

<style>
	.home {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.content {
		position: absolute;
		top: 25%;
		right: 10%;
		display: flex;
		gap: 1rem;
		flex-direction: column;
	}
	.button {
		background: #ffe4dc;
		color: var(--primary-color);
		border: none;
		border-radius: 8px;
		padding: 15px 32px;
		text-align: center;
		display: inline-block;
		font-size: 16px;
		width: fit-content;
	}
	.button:hover {
		opacity: 0.8;
	}

	.text-column {
		color: white;
	}
</style>
