<script lang="ts">
    import profile from '$lib/images/profile-pic.png';
    import { browser } from '$app/environment';

    let accountId : string | null = "";
    if (browser) {
        accountId = localStorage.getItem('accountId');
    }
    

</script>

<svelte:head>
    <title>Profile</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

    <div class="wrapper">
        <div class="top-container">
            <img src={profile} class="profile-image" width="100" alt="profile-picture">
            <div>
                Account ID: <span class="name">{accountId}</span>
            </div>
        </div>

        <div>
            <a href="/" class="button">Log out</a>
        </div>
    </div>

<style>
    .top-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1vh;
        margin-bottom: 2vh;
    }
    .profile-image{
        border-radius: 10px;
        border: 2px solid #225678;
    }
    .name{
        font-weight: bold;
    }
    .mail{
        color: #225678;
    }

    .button {
        background: #225678;
        color: var(--secondary-color);
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

    .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        min-height: 70%;
        padding: 20px;
    }
</style>