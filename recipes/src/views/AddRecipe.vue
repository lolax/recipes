<template>
    <div id="add-recipe">
        <form v-bind:class="[part === 1 ? 'form' : 'hidden']">New Recipe
            <input 
                class="input" 
                type="text"
                v-model="dish" 
                v-on:keyup.enter="addDish"
                placeholder="Dish"
            />
            <input 
                class="input" 
                type="text" 
                v-model="description" 
                v-on:keyup.enter="addDish"
                placeholder="Description"
            />
            <input 
                class="input" 
                type="text" 
                v-model="time" 
                v-on:keyup.enter="addDish"
                placeholder="Preparation Time (in minutes)"
            />
            <div id="next" class="btn" @click="addDish">Next Steps</div>
        </form>
        <form v-bind:class="[part === 2 ? 'form' : 'hidden']">
            <div class="ingredients">
                <div class="list" v-for="i in ingredients" :key="i.id">
                    <div>{{i.ingredient}} ; {{i.quantity}}</div>
                    <div class="minus" @click="removeStep(i.ingredient)">-</div>
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
                    <div class="minus" @click="removeIngredient(s.step)">-</div>
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
            <div id="submit" class="btn" @click="addRecipe">Submit Recipe</div>
        </form>
        <div>{{this.message}}</div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            part: 1,
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
    methods: {
        addDish() {
            const { dish, description, time } = this
            if (dish && description && time) {
                const newDish = { dish, description, time }
                axios  
                    .post("http://localhost:3300/recipes", newDish)
                    .then(res => (this.recipe_id = res.data[0]))
                    .catch(err => (this.message = err))
                this.part = 2
            } else {
                this.message = "Please enter the dish name, description, and preparation time."
            }
        },
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
        removeIngredient(ing) {
           this.ingredients = this.ingredients.filter(cur => cur.ingredient != ing)
        },
        removeStep(step) { 
           this.steps = this.steps.filter(cur => cur.step != step)
        },
        addRecipe() {
            const { steps, ingredients } = this
            if (steps.length > 0) {
                axios  
                    .post("http://localhost:3300/steps", steps)
                    .then(res => (this.message = "Recipe added."))
                    .catch(err => (this.message= "Recipe failed to add."))
            } else {
                this.message = "Please add some steps."
            } if (ingredients.length > 0) {
                axios  
                    .post("http://localhost:3300/ingredients", ingredients)
                    .then(res => (this.message = "Recipe added."))
                    .catch(err => (this.message= "Recipe failed to add."))
            } else {
                this.message = "Please add some ingredients."
            }
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
