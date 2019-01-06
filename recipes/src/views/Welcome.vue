<template>
    <div id="welcome">
        <h1>Welcome to L & L Recipes</h1>
        <h2>artisinal, vegetarian, amature</h2>
        <div class="images">
            <img src="../assets/bananastand.jpg" alt="banana stand">
            <img src="../assets/boilingwaterhotpocket.jpg" alt="hot pocket">
            <img src="../assets/chef.png" alt="chef">
            <img src="../assets/chefmario.png" alt="chef mario">
            <img src="../assets/sushi.jpg" alt="sushi">
            <img src="../assets/fieri.png" alt="guy fieri">
            <img src="../assets/franziaoreo.jpg" alt="franzia oreos">
            <img src="../assets/peetandcheese.jpg" alt="kraft box cat">
            <img src="../assets/prongles.jpg" alt="prongles">
            <img src="../assets/raisinman.jpg" alt="raisin man">
            <img src="../assets/rumham.gif" alt="rum ham">
            <img src="../assets/spagett.jpg" alt="spagett">
        </div>
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