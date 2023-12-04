<script>
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import logo from '$lib/images/logo-2.svg';

	let loading = false;
	let email, password;
	let message = { success: null, display: '' };
	export let isLogged;

	const handleLogin = async () => {
		signInWithEmailAndPassword(auth, email, password);
		auth.onAuthStateChanged((auth) => {
			if (auth) {
				isLogged = true;
				console.log('logged in');
			} else {
				isLogged = false;
				console.log('not logged in');
			}
		});
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="wrapper">
	<img src={logo} alt="Logo" class="logo" />
	<form on:submit|preventDefault={handleLogin} class="form">
		<h1 class="header">Log in to C&L</h1>
		<div class="form-widget">
			<div class="form-group">
				<label>Email address</label>
				<input
					id="email"
					class="form-control"
					type="email"
					placeholder="Your email"
					bind:value={email}
				/>
			</div>
			<div class="form-group">
				<label>Password</label>
				<input
					id="password"
					class="form-control"
					type="password"
					placeholder="Set your new password"
					bind:value={password}
				/>
			</div>
			<div>
				<button
					type="submit"
					class="submitBtn"
					value={loading ? 'Loading' : 'Log in'}
					disabled={loading}>{loading ? 'Loading' : 'Log in'}</button
				>
			</div>
			{#if message.success != null}
				<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
					{message.display}
				</div>
			{/if}
			<a href="/" class="link">Create an account</a>
		</div>
	</form>
</div>

<style>
	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-widget {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		background: var(--primary-color);
		font-family: 'Quicksand', sans-serif;
		border-radius: 10px;
		padding: 30px;
		width: 100%;
		position: relative;
		box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.3);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
		color: white;
	}

	.form-widget input {
		padding: 8px 16px;
		border-radius: 4px;
		border: none;
	}

	.submitBtn {
		cursor: pointer;
		font-weight: 600;
		background: var(--primary-color-dark);
		color: #fff;
		border-radius: 4px;
		border: none;
		padding: 12px 24px;
	}
	.submitBtn:hover {
		opacity: 0.9;
	}

	.wrapper {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		min-height: 100%;
		padding: 20px;
	}

	.logo {
		width: 3.5em;
		height: 3.5em;
		/*margin-top: 50px;*/
	}

	.link {
		color: white;
		text-decoration: underline;
	}
	.link:hover {
		color: var(--secondary-color);
	}
</style>
