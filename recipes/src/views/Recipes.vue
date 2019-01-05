<template>
    <div id="recipes">
        <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
            <router-link class="link" :to="`/recipes/${recipe.id}`">
                <div class="dish">{{recipe.dish}}</div>
                <div class="desc">{{recipe.description}}</div>
                <div class="time">{{recipe.time}} minutes</div>
            </router-link>
            <div class="btns"> 
                <div class="btn" @click="$router.push(`/recipes/${id}/edit`)">edit</div>
                <div class="btn" @click="remove(recipe.id)">delete</div>
            </div>
        </div>
        <div>{{message}}</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            recipes: [],
            message: ""
        }
    },
    mounted() {
        axios
            .get("http://localhost:3300/recipes/")
            .then(res => (this.recipes = res.data))
            .catch(err => (this.message = err))
    },
    methods: {
        remove(id) {
            axios
                .delete(`http://localhost:3300/recipes/${id}`)
                .then(res => (this.message = 'Recipe deleted'))
                .catch(err => (this.message = err))
        }
    }
}
</script>

<style scoped>
    .recipe {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        width: 400px;
        margin: 30px auto;
        border: 1px solid black;
    }
    .link {
        width: 200px;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: start;
    }
    a {
        border: 0;
    }
    a:hover {
        border: 0;
        outline: 0;
    }
    .dish {
        font-size: 18px;
        font-weight: 600;
        margin: 2px 0;
    }
    .desc {
        margin: 2px 0;
    }
    .time {
        margin: 2px 0;
    }
    .btns {
        display: flex;
        flex-direction: column;
    }
    .btn {
        width: 80px;
        margin: 5px auto;
        cursor: pointer;
        padding: 10px;
        border: 1px solid lavender;
        color: black;
        background: white;
    }
    .btn:hover {
        border: 1px solid black;
        color: white;
        background: black;
    }
</style>
