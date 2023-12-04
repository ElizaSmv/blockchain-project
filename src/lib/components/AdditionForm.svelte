<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import cross from '$lib/images/cross.svg';
	import type { Contract } from '../../routes/contract';
	import { addDoc, collection, CollectionReference, DocumentReference } from 'firebase/firestore';
	import { db } from '../firebase';
	import { backendUrl } from '$lib/backend';
	// local storage
	import { browser } from '$app/environment';



	interface Error {
		name?: string;
		price?: string;
		time?: string;
		imageUrl?: string;
		description?: string;
	}

	export let showAdditionForm: boolean; // boolean
	let dialog: HTMLDialogElement; // HTMLDialogElement
	$: if (dialog && showAdditionForm) dialog.showModal();

	async function addToDB(newItem: Contract) {
		const collectionRef: CollectionReference<any> = collection(db, 'items');
		const collectionSnap: DocumentReference<Contract> = await addDoc(collectionRef, newItem);
	}

	const { form, handleChange, handleSubmit, handleReset, errors } = createForm({
		initialValues: {} as Contract,
		validate: (values) => {
			let errs: Error = {};
			const for_price = new RegExp('.*');
			const for_time = new RegExp("[1-9]\d*|0");
			if (values.name === undefined || values.name === '') {
				errs['name'] = 'Name is required';
			}
			if (values.price === undefined || !for_price.test(values.price.toString())) {
				errs['price'] = 'Invalid price: should be written as 00';
			}
			if (values.imageLink === undefined || values.imageLink === '') {
				errs['imageUrl'] = 'Image URL is required';
			}
			// if ((values.description === undefined) || values.description === "") {
			// 	errs["description"] = "Description is required";
			// }
			// if (values.time === undefined || !for_time.test(values.time.toString())) {
			// 	errs['time'] = 'Deadline is required';
			// }
			return errs;
		},
		onSubmit: (values) => {
			const body = {
				// "name", "accountId", "imageLink", "price"
				name: values.name,
				accountId: localStorage.getItem('accountId'),
				imageLink: values.imageLink,
				price: values.price,
			}
			fetch(backendUrl + '/New', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}).then((response) => {
				if (response.ok) {
					console.log('Contract added');
				} else {
					console.log('Contract not added');
				}
			});
		}
	});
	let accountId: string | null = '';
	if (browser) {
		accountId = localStorage.getItem('accountId')
	} 
	// const accountId = localStorage.getItem('accountId')
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showAdditionForm = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="dialog_content">
		<slot name="header" />
		<!--        <slot />-->
		<h2 class="title">Add a new contract</h2>
		<!-- svelte-ignore a11y-autofocus -->
		<button class="close_btn" autofocus on:click={() => dialog.close()}>
			<img class="close_img" src={cross} alt="Close" />
		</button>
		<form on:submit={handleSubmit}>
			<div class="form">
				<div class="form-item">
					<label class="label">Contract Name </label>
					<input
						type="text"
						id="name"
						placeholder="Name"
						bind:value={$form.name}
						on:change={handleChange}
					/>
					{#if $errors.name}
						<small>{$errors.name}</small>
					{/if}
				</div>

				<div class="form-item">
					<label class="label">Price of the contract </label>
					<input
						type="number"
						id="price"
						placeholder="Price"
						bind:value={$form.price}
						on:change={handleChange}
						min="0.01"
						step="0.01"
					/>
					{#if $errors.price}
						<small>{$errors.price}</small>
					{/if}
				</div>
				<!-- <div class="form-item">
					<label class="label">Duration (seconds)</label>
					<input
						type="number"
						id="time"
						placeholder="Deadline"
						bind:value={$form.time}
						on:change={handleChange}
					/>
					{#if $errors.time}
						<small>{$errors.time}</small>
					{/if}
				</div> -->
				<div class="form-item">
					<label class="label">Your image URL</label>
					<input
						type="text"
						id="imageUrl"
						placeholder="image Url"
						bind:value={$form.imageLink}
						on:change={handleChange}
					/>
					{#if $errors.imageLink}
						<small>{$errors.imageLink}</small>
					{/if}
				</div>
				<!-- <div class="form-item">
					<label class="label">Description</label>
					<textarea
						id="description"
						rows="3"
						placeholder="Description"
						bind:value={$form.description}
						on:change={handleChange}
					></textarea>
					{#if $errors.description}
						<small>{$errors.description}</small>
					{/if}
				</div> -->
				<div class="form-item">
					<label class="label">Owner </label>
					<input
						type="text"
						id="owner"
						value={accountId}
						on:change={handleChange}
					/>
				</div>
				<!--						bind:value={$form.owner} -->
				<!--						on:change={handleChange} readonly="readonly">-->
			</div>

			<div class="buttons">
				<button class="form_button reset" type="reset">Reset</button>
				<button
					class="form_button submit"
					type="submit"
					on:close={() => (showAdditionForm = false)}
					on:reset={handleReset}
					>Send</button
				>
			</div>
		</form>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.5em;
		border: none;
		padding: 0;
		background: var(--primary-color);
		font-family: 'Quicksand', sans-serif;
		overflow: hidden;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	.dialog_content {
		height: 40rem;
		width: 30rem;
		padding: 24px;
	}
	dialog > div {
		padding-left: 3em;
		padding-right: 3em;
		padding-bottom: 3em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.title {
		color: var(--secondary-color);
	}

	.form {
		background-color: aliceblue;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 2vw 4vw;
		border: none;
		border-radius: 0.3rem;
		align-content: center;
		overflow-y: auto;
		height: 25rem;
	}

	h2 {
		text-align: center;
		font-weight: 500;
	}
	.form-item {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.close_btn {
		position: absolute;
		height: 2vh;
		width: fit-content;
		background: none;
		border: none;
		top: 2.6%;
		right: 2.6%;
	}
	.close_btn:hover {
		cursor: pointer;
	}
	.close_img {
		height: inherit;
		width: inherit;
	}

	.close_btn:active {
		transform: scale(0.9);
	}

	form input,
	textarea {
		border-width: 1px;
		border-color: #58557c;
		border-style: solid;
		padding: 18px;
		background-color: rgb(237, 246, 253);
		/* outline: none; */
		/* background: aliceblue; */
		font-size: 16px;
		border-radius: 10px;
		resize: vertical;
	}
	form input:focus,
	textarea:focus {
		outline: none;
		border: 2px solid #58557c;
	}

	form input:invalid:focus,
	textarea:invalid:focus {
		background: #ffe4dc;
		border: 2px solid #dc572f;
		outline: none;
	}

	.form_button {
		padding: 15px;
		font-size: 1rem;
		outline: none;
		cursor: pointer;
		width: 100%;
		font-weight: bold;
		margin: 20px auto 0;
		border-radius: 30px;
		transition: all 0.3s ease-in;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		gap: 1vh;
	}
	.reset {
		background: #ffe4dc;
		color: #dc572f;
		border: 1px solid #dc572f;
	}
	.submit {
		background: #e3f4ff;
		color: #49abed;
		border: 1px solid #49abed;
	}

	.reset:hover {
		border: 1px solid #db643f;
		background: #db643f;
		color: white;
	}
	.submit:hover {
		border: 1px solid #91cbf2;
		background: #91cbf2;
		color: white;
	}

	small {
		color: #c42b2b;
	}

	.label {
		color: #4d4a6c;
	}
</style>
