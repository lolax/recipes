<template>
    <div id="welcome">
        <h1>Welcome to L & L Recipes</h1>
        <h2>artisinal, vegetarian, amature</h2>
    </div>
</template>

<style scoped>
    h1 {
        width: 50%;
        padding: 30px;
        margin: 40px auto;
        font-size: 28px;
        border-bottom: 4px double black;
    }
    h2 {
        font-size: 20px;
        font-style: italic;
    }
    .images {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    img {
        object-fit: scale-down;
        display: block;
        width: 20%;
        height: auto;
        margin: 20px;
    }
</style>