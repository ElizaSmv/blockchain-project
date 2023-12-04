<script>
	import { page } from '$app/stores';
	import Header from '../lib/components/Header.svelte';
	import './styles.css';
	import Footer from '../lib/components/Footer.svelte';
	// import isLogged from './login/+page.svelte'
	const isLogged = true;
</script>

<link
	href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&family=Rubik:wght@300;400;500&display=swap"
	rel="stylesheet"
/>

<div class="app">
	<main class={`${$page.url.pathname === '/' ? 'home' : 'main'}`}>
		{#if isLogged === true}
			<Header />
		{/if}
		<div class="slot">
			<slot />
		</div>
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		font-family: 'Rubik', sans-serif;
		letter-spacing: 0.02em;
		color: #3c4044;
	}

	.main {
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
		height: 100vh;
		background: var(--secondary-color);
	}

	.home {
		background-image: url('../lib/images/bg.jpg');
		background-size: cover;
		height: 100vh;
	}

	.slot {
		height: 100%;
	}
</style>
