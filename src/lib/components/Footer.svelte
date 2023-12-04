<script>
	import location from '$lib/images/icon-location.svg';
	import email from '$lib/images/icon-email.svg';
	import phone from '$lib/images/icon-phone.svg';
</script>

<footer class="footer">
	<div class="footer__container">
		<h3>C&L</h3>

		<div class="footer__row">
			<div class="footer__col--1">
				<ul class="contacts">
					<li class="list-item">
						<img src={location} alt="Location Marker" />
						<p>Innopolis University, The Russian Federation</p>
					</li>
					<li class="list-item">
						<img src={phone} alt="Phone" />
						<p>8-800-55-35-35</p>
					</li>
					<li class="list-item">
						<img src={email} alt="Email" />
						<p>e.semenova@innopolis.university</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		max-width: 120rem;
		display: flex;
		column-gap: 4rem;
		flex-direction: column;
		background-color: var(--primary-color);
		color: #fff;
		padding: 0.5rem 8rem;
	}

	@media (min-width: 1440px) {
		.footer__row {
			display: flex;
			gap: 3rem;
		}
	}
	@media (min-width: 1440px) {
		.footer__row > div {
			flex: 1;
		}
	}
	.contacts {
		padding: 0;
		display: flex;
		justify-content: space-between;
		column-gap: 4rem;
	}
	.list-item {
		display: flex;
		align-items: center;
		gap: 2rem;
		width: fit-content;
	}
	.list-item p {
		font-family: 'Open Sans', sans-serif;
		width: max-content;
	}
</style>
