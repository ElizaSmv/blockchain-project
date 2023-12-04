<script>
    import profile from '$lib/images/profile-pic.png';
</script>

<svelte:head>
    <title>Profile</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

    <div class="wrapper">
        <div class="top-container">
            <img src={profile} class="profile-image" width="100" alt="profile-picture">
            <div>
                <h4 class="name">Sponge Bob</h4>
                <p class="mail">test@test.com</p>
            </div>
        </div>

        <div>
            <a href="/" class="button">Log out</a>
        </div>
    </div>

<style>
    .top-container{
        display: flex;
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