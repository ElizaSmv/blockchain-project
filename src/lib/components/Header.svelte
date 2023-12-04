<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo-2.svg';
	import add from '$lib/images/add.svg';
</script>

<header>
	<nav class="navbar" role="navigation">
		<img src={logo} alt="Logo" />
		<div class="line_in_nav"></div>
		<div id="togglebtn">
			<img src={add} alt="open Menu" id="burger" class="burger" />
		</div>
		<ul class="navlists" id="navlist">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/" class="link">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/contracts' ? 'page' : undefined}>
				<a href="/contracts" class="link">Contracts</a>
			</li>
			<li aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}>
				<a href="/profile" class="link">Profile</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.navbar {
		/*padding: 20px 0 0 20px;*/
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}
	.navbar img {
		margin-right: 50px;
		margin-left: 20px;
		transition: all 2s linear 0s;
		width: 3.5em;
		height: 3.5em;
	}

	.line_in_nav {
		width: max-content;
		padding: 1px;
		flex: 1;
		background-color: #808080;
		display: none;
	}

	.navlists {
		list-style-type: none;
		text-align: center;
		background-color: var(--primary-color);
		position: absolute;
		right: -100%;
		top: 65px;
		height: 90vh;
		width: 90%;
		z-index: 10;
		display: flex;
		flex-flow: column wrap;
		justify-content: space-evenly;
	}

	.burger {
		margin-right: 40px !important;
		width: 40px;
	}

	.showNavigation {
		right: 5% !important;
	}

	.navlists li {
		margin: 0 auto;
		width: 50%;
		padding: 20px 0;
		border-bottom: 3px solid transparent;
	}

	.link {
		color: white;
		text-transform: uppercase;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
	.link:hover {
		color: var(--secondary-color);
	}

	@media only screen and (min-width: 780px) {
		.line_in_nav {
			display: block;
		}

		.navlists {
			width: 50%;
			position: static;
			height: auto;
			z-index: 10;
			display: flex;
			flex-flow: row wrap;
			/*justify-content: baseline;*/
			/* padding: 10px 0px; */
		}

		.navlists li {
			width: auto;
			padding: 30px 0;
		}

		.burger {
			display: none;
		}
	}
</style>
