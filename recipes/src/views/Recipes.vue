<template>
    <div id="recipes">
        <div v-for="recipe in recipes" :key="recipe.id">
            <router-link class="link" :to="`/recipes/${recipe.id}`">
                <div>{{recipe.dish}}</div>
                <div>{{recipe.description}}</div>
                <div>{{recipe.time}}</div>
            </router-link>
            <div class="btn" @click="this.$router.push(`/recipes/${id}/edit`)">edit</div>
            <div class="btn" @click="delete(recipe.id)">delete</div>
        </div>
        <div>{{this.message}}</div>
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
            .then(res => (this.recipes = res))
            .catch(err => (this.message = err))
    },
    methods: {
        delete(id) {
            axios
                .delete(`http://localhost:3300/recipes/${id}`)
                .then(res => (this.message = res))
                .catch(err => (this.message = err))
        }
    }
}
</script>

<style scoped>

</style>
