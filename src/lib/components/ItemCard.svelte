<script lang="ts">
	import type { Contract } from '../../routes/contract';
	export let item: Contract;
	import { backendUrl } from '$lib/backend';
	import { browser  } from '$app/environment';

	let unique = {}

	let accountId : string | null = "";
	if (browser) {
		accountId = localStorage.getItem('accountId');
	}

	const handleBuy = async () => {
		const response = await fetch(backendUrl + '/Buy', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"contractAddress": item.id,
				"accountId": accountId,
				"price": item.price * 2,
			}),
		});
		if (response.ok) {
			alert("Bought");
			unique = {}
		} else {
			alert("Not enough money or NFT is locked");
		}
	};

	const handleLock = async () => {
		let duration = 0;
		if (browser) {
			duration = prompt("Enter duration in seconds");
		}
		const response = await fetch(backendUrl + '/Lock', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"contractAddress": item.id,
				"accountId": accountId,
				"duration": duration,
			}),
		});
		if (response.ok) {
			alert("Locked for " + duration + " seconds");
			unique = {}
		} else {
			alert("Errror");
		}
	};
</script>

<div class="card_container">
	<div class="card">
		<span class="card_content">
			<h3 class="item_title"><a href="../item/{item.id}">{item.name}</a></h3>
			<p class="item_owner"><b>Owner: </b>{item.owner}</p>
			{#if item.imageLink === undefined}
				<p class="item_description">No Image</p>
			{:else}
				<img class="item_image" src={item.imageLink} alt="Image"/>
	
			{/if}
			<span class="card_footer">
				<p class="item_price">{item.price}$</p>
				{#if item.owner === accountId}
					<button class="item_amount" on:click={handleLock}>Lock</button>
				{:else}
					<button class="item_amount" on:click={handleBuy}>Buy</button>
				{/if}
			</span>
		</span>
	</div>
</div>

<style>
	.card_container {
		position: relative;
	}
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: aliceblue;
		padding-bottom: 10px;
		padding-left: 20px;
		padding-right: 20px;
		box-shadow: 3px 3px 3px rgb(206, 178, 154);
		text-decoration: none;
		color: #2e2e2e;
		border-radius: 8px;
	}
	/* .card :hover{
    transform: scale(.98);
} */
	.card :active {
		transform: scale(0.98);
	}
	.card_content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.item_price {
		margin: 0;
	}
	.item_amount {
		margin: 0;
		position: static;
		text-align: right;
	}
	.card_footer {
		display: flex;
		transform: inherit;
		bottom: 0;
		justify-content: space-between;
	}
	.item_description {
		transform: inherit;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		word-break: break-word;
	}
	.item_title {
		transform: inherit;
	}
	.item_image {
		width: auto;
		height: 250px;
		object-fit: contain;
	}
	.item_amount {
		background-color: var(--secondary-color);
		border: none;
		border-radius: 4px;
		padding: 8px 16px;
		font-size: 16px;
	}
</style>
