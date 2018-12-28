<template>
    <div id="edit-recipe">
        <form class="form">Edit Recipe
            <input 
                class="input" 
                type="text"
                v-model="dish" 
                v-on:keyup.enter="editRecipe"
                placeholder="Dish"
            />
            <input 
                class="input" 
                type="text" 
                v-model="description" 
                v-on:keyup.enter="editRecipe"
                placeholder="Description"
            />
            <input 
                class="input" 
                type="text" 
                v-model="time" 
                v-on:keyup.enter="editRecipe"
                placeholder="Preparation Time (in minutes)"
            />
            <div class="ingredients">
                <div class="list" v-for="i in ingredients" :key="i.id">
                    <div>{{i.ingredient}} ; {{i.quantity}}</div>
                    <div class="minus" @click="remove(ingredients, i.id)">-</div>
                </div>
                <input 
                    class="input" 
                    type="text"
                    v-model="ingredient" 
                    v-on:keyup.enter="addIngredient"
                    placeholder="Ingredient"
                />
                <input 
                    class="input" 
                    type="text" 
                    v-model="quantity" 
                    v-on:keyup.enter="addIngredient"
                    placeholder="Quantity"
                />
                <div class="plus" @click="addIngredient">+</div>
            </div>
            <div class="steps">
                <div v-for="s in steps" :key="s.id">
                    <div>{{s.order}}. {{s.step}}</div>
                    <div class="minus" @click="remove(steps, s.id)">-</div>
                </div>
                <input 
                    class="input" 
                    type="text" 
                    v-model="step" 
                    v-on:keyup.enter="addStep"
                    placeholder="Step"
                />
                <input 
                    class="input" 
                    type="text" 
                    v-model="order" 
                    v-on:keyup.enter="addStep"
                    placeholder="Order"
                />
                <div class="plus" @click="addStep">+</div>
            </div>
            <div id="submit" class="btn" @click="editRecipe">Submit Edits</div>
        </form>
        <div>{{this.message}}</div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            recipe: {},
            dish: "",
            description: "",
            time: 0,
            recipe_id: "",
            ingredients: [],
            ingredient: "",
            quantity: "",
            steps: [],
            step: "",
            order: 0,
            message: ""
        }
    },
    mounted() {
        const id = this.$route.params.id
        this.recipe_id = id
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
        addIngredient() {
            const { recipe_id, ingredient, quantity } = this
            if (recipe_id, ingredient, quantity) {
                const newIng = { recipe_id, ingredient, quantity }
                this.ingredients.push(newIng)
            } else {
                this.message = "Please enter the ingredient name & quantity."
            }
        },
        addStep() {
            const { recipe_id, step, order } = this
            if (recipe_id, step, order) {
                const newStep = { recipe_id, step, order }
                this.steps.push(newStep)
            } else {
                this.message = "Please enter the step & order."
            }
        },
        remove(type, id) {
            this.type.forEach((item, i) => {
                if (item.id === id) {
                    let index = i
                }
            })
            this.type.splice(index, 1)
        },
        addRecipe() {
            const { dish, description, time, steps, ingredients, recipe_id } = this
            if (dish && description && time) {
                const editedDish = { dish, description, time }
                axios  
                    .put(`http://localhost:3300/recipes/${recipe_id}`, editedDish)
                    .then(res => (this.message = "Dish updated"))
                    .catch(err => (this.message= "Recipe failed to update"))
            } else {
                this.message = "Please enter the dish name, description, and preparation time."
            } if (steps.length > 0) {
                axios  
                    .put(`http://localhost:3300/steps/${recipe_id}`, steps)
                    .then(res => (this.message = "Steps updated."))
                    .catch(err => (this.message= "Recipe failed to update."))
            } else {
                this.message = "Please add some steps."
            } if (ingredients.length > 0) {
                axios
                    .put(`http://localhost:3300/ingredients/${recipe_id}`, ingredients)
                    .then(res => (this.message = "Ingredients updated."))
                    .catch(err => (this.message= "Recipe failed to update."))
            } else {
                this.message = "Please add some ingredients."
            } this.$router.push(`/recipes/${recipe_id}`)
        }
    }
}
</script>

<style scoped>
.form {
    display: flex;
}
.hidden {
    display: none;
}
</style>
