<template>
    <div id="recipes">
        <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
            <router-link class="link" :to="`/recipes/${recipe.id}`">
                <div class="dish">{{recipe.dish}}</div>
                <div class="desc">{{recipe.description}}</div>
                <div class="time">{{recipe.time}} minutes</div>
            </router-link>
            <div class="btns"> 
                <div class="btn" @click="$router.push(`/recipes/${recipe.id}/edit`)">edit</div>
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
        this.fetch()
    },
    methods: {
        remove(id) {
            axios
                .delete(`http://localhost:3333/recipes/${id}`, {headers: { Authorization: localStorage.getItem("token") }})
                .then(res => (this.fetch()))
                .catch(err => (this.message = err))
        },
        fetch() {
            axios
                .get("http://localhost:3333/recipes/", {headers: { Authorization: localStorage.getItem("token") }})
                .then(res => (this.recipes = res.data))
                .catch(err => (this.message = err))
        }
    }
}
</script>

<style scoped>
    .recipe {
        background: #d3d3d3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        width: 400px;
        margin: 30px auto;
        -webkit-box-shadow: 0 0 3px 1px grey;
        -moz-box-shadow: 0 0 3px 1px grey;
        box-shadow: 0 0 3px 1px grey;
    }
    .link {
        color: #191919;
        width: 250px;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: start;
    }
    .link:hover {
        background: lightgrey;
    }
    a {
        border: 0;
    }
    a:hover {
        border: 0;
        outline: 0;
    }
    .dish {
        font-size: 20px;
        font-weight: 600;
        margin: 2px 0;
    }
    .desc {
        font-size: 18px;
        margin: 2px;
    }
    .time {
        margin: 2px;
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
    @media (max-width: 500px) {
        .recipe {
            width: 88%;
        }
    }
</style>
