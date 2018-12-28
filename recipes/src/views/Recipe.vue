<template>
    <div id="recipe-view">
        <div>
            <div>{{this.recipe.dish}}</div>
            <div>{{this.recipe.description}}</div>
            <div>{{this.recipe.time}} minutes</div>
            <div>Ingredients
                <div v-for="ing in ingredients" :key="ing.id">
                    <div>{{ing.ingredient}}</div>
                    <div>{{ing.quantity}}</div>
                </div>
            </div>
            <div>Steps
                <div v-for="step in steps" :key="step.id">
                    <div>{{step.step}}</div>
                    <div>{{step.order}}</div>
                </div>
            </div>
            <div class="btn" @click="this.$router.push(`/recipes/${recipe.id}/edit`)">edit</div>
            <div class="btn" @click="this.delete(this.recipe.id)">delete</div>
        </div>
        <div>{{this.message}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recipe: {},
            ingredients: [],
            steps: [],
            message: ""
        }
    },
    mounted() {
        const id = this.$route.params.id
        axios
            .get(`http://localhost:3300/recipes/${id}`)
            .then(res => (this.recipe = res))
            .catch(err => (this.message = err))
        axios
            .get(`http://localhost:3300/ingredients/${id}`)
            .then(res => (this.ingredients = res))
            .catch(err => (this.message = err))
         axios
            .get(`http://localhost:3300/steps/${id}`)
            .then(res => (this.steps = res))
            .catch(err => (this.message = err))
    },
    methods: {
        delete(id) {
            axios
                .delete(`http://localhost:3300/recipes/${id}`)
                .then(res => (this.$router.push("/recipes/")))
                .catch(err => (this.message = err))
        }
    }
}
</script>

<style scoped>

</style>