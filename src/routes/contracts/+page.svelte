<script lang="ts">
	import type { Contract } from '../contract';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import AdditionForm from '$lib/components/AdditionForm.svelte';
	import addButton from '$lib/images/add.svg';
	import type { QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
	import { collection, Query, onSnapshot, getDocs } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { ref, get } from "firebase/database";

	import { browser } from '$app/environment';
	let showAdditionForm = false;

	let items: Contract[] = [];
	function getDB() {
		// const collectionRef: Query<any> = 
		// if (browser) {
		// 	onSnapshot(collectionRef, (collectionSnap) => {
		// 		items = collectionSnap.docs.map((doc) =>
		// 			Object.assign(doc.data(), { id: doc.id })
		// 		) as Contract[];
		// 	});
		// 	console.log(items);
		// } else {
		// 	const collectionSnap: QuerySnapshot<Contract> = await getDocs(collectionRef);
		// 	items = collectionSnap.docs.map((doc: QueryDocumentSnapshot<Contract>) =>
		// 		Object.assign(doc.data(), { id: doc.id })
		// 	);
		// 	console.log(items);
		// }
		

		// Querying real-time database
		
		const dbRef = ref(db, 'contracts');

		get(dbRef).then((snapshot) => {
			if (snapshot.exists()) {
				for (const [key, value] of Object.entries(snapshot.val())) {
					items.push({
						id: key,
						...value
					})
				}
				items = [...items]
			} else {
				console.log('No data available');
			}

		}).catch((error) => {
			console.error(error);
		});

	}
	getDB();

	let showCurrentUserItems = false;

	// $: filteredItems = showCurrentUserItems
	// 	? items.filter((item) => item.ownerId === currentUserId)
	// 	: items;
	let accountId : string | null = "";
	if (browser) {
		accountId = localStorage.getItem('accountId');
	}
</script>

<svelte:head>
	<title>Contracts</title>
	<meta name="description" content="Collection of items in stock" />
</svelte:head>

<div class="wrap">
	<h1>Contracts</h1>
	<h4 style="text-align: center;">Account: {accountId}</h4>
	<div class="contactField">
		<input
			type="checkbox"
			id="mine"
			bind:checked={showCurrentUserItems}
			name="Show only my contacts"
			class="custom-checkbox"
		/>
		<label for="mine">Show only my contacts</label>
	</div>
	<div class="cards_grid">
		{#if items}
			{#each items as item}
				{#if showCurrentUserItems && item.owner === accountId}
					<ItemCard {item} />
				{:else if !showCurrentUserItems}
					<ItemCard {item} />
				{/if}
			{/each}
		{/if}
	</div>

	<button class="add_btn" on:click={() => (showAdditionForm = true)}>
		<img class="add_img" src={addButton} alt="button to add new item" />
	</button>
	<!-- <button on:click={() => (removeFromList = true)}>
		Remove
	</button> -->

	<AdditionForm bind:showAdditionForm />
</div>

<style>
	.wrap {
		padding: 0 64px;
	}
	.custom-checkbox {
		-webkit-appearance: none; /* Remove default appearance */
		-moz-appearance: none;
		appearance: none;
		background: var(--secondary-color);
		width: 20px;
		height: 20px;
		border: 2px solid #999;
		border-radius: 4px;
		outline: none;
		transition: background-color 0.3s ease-in-out;
	}
	.custom-checkbox:checked::before {
		content: '\2714'; /* check mark symbol Unicode */
		display: block;
		text-align: center;
		font-size: 16px;
		line-height: 18px;
		color: white;
	}

	.custom-checkbox:checked {
		background-color: green; /* Change background color when checked */
	}
	.cards_grid {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-gap: 1rem;
	}
	.add_btn {
		position: fixed;
		height: 9vh;
		width: fit-content;
		background: none;
		border: none;
		bottom: 8%;
		right: 6%;
	}
	.add_img {
		height: inherit;
		width: inherit;
	}
	button:hover {
		cursor: pointer;
	}
	button:active {
		transform: scale(0.94);
	}
	.contactField {
		display: flex;
		align-items: center;
		gap: 4px;
		width: fit-content;
		padding: 8px 12px;
		border: 1px solid;
		border-radius: 4px;
	}
</style>
