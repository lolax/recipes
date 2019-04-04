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
            <div class="message">{{message}}</div>
            <div class="ing-steps">
                <div class="ingredients">
                    <div class="input-section">
                        <div class="inputs">
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
                        </div>
                        <div class="round-btn plus" @click="addIngredient">+</div>
                        <div class="tablet-plus btn" @click="addIngredient">add ingredient</div>
                    </div>
                    <div class="list" v-for="i in ingredients" :key="i.id">
                        <div class="list-item">{{i.quantity}} {{i.ingredient}}</div>
                        <div class="round-btn" @click="removeIngredient(i.ingredient)">-</div>
                    </div>
                </div>
                <div class="steps">
                    <div class="input-section">
                        <div class="inputs">
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
                        </div>
                        <div class="round-btn plus" @click="addStep">+</div>
                        <div class="tablet-plus btn" @click="addStep">add step</div>
                    </div>
                    <div class="list" v-for="s in steps" :key="s.id">
                        <div class="list-item">{{s.order}}. {{s.step}}</div>
                        <div class="round-btn" @click="removeStep(s.step)">-</div>
                    </div>
                </div>
            </div>
            <div id="submit" class="btn" @click="editRecipe">Submit Edits</div>
        </form>
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
            time: "",
            recipe_id: "",
            ingredients: [],
            ingredient: "",
            quantity: "",
            steps: [],
            step: "",
            order: "",
            message: ""
        }
    },
    mounted() {
        const id = this.$route.params.id
        this.recipe_id = id
        axios
            .get(`https://lolarecipes-backend.herokuapp.com/recipes/${id}`, {headers: { Authorization: localStorage.getItem("token") }})
            .then(res => {
                this.recipe = res.data[0]
                this.dish = res.data[0].dish
                this.description = res.data[0].description
                this.time = res.data[0].time
            })
            .catch(err => (this.message = err.message))
        axios
            .get(`https://lolarecipes-backend.herokuapp.com/ingredients/${id}`, {headers: { Authorization: localStorage.getItem("token") }})
            .then(res => (this.ingredients = res.data))
            .catch(err => (this.message = err.message))
        axios
            .get(`https://lolarecipes-backend.herokuapp.com/steps/${id}`, {headers: { Authorization: localStorage.getItem("token") }})
            .then(res => (this.steps = res.data))
            .catch(err => (this.message = err.message))
    },
    methods: {
        addIngredient() {
            const { recipe_id, ingredient, quantity } = this
            if (recipe_id && ingredient && quantity) {
                const newIng = { recipe_id, ingredient, quantity }
                this.ingredients.push(newIng)
                this.ingredient = ""
                this.quantity = ""
            } else {
                this.message = "Please enter the ingredient name & quantity."
            }
        },
        addStep() {
            const { recipe_id, step, order } = this
            if (recipe_id && step && order) {
                const newStep = { recipe_id, step, order }
                this.steps.push(newStep)
                this.steps = this.steps.sort((a, b) => a.order - b.order)
                this.step = ""
                this.order = ""
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
        editRecipe() {
            const { dish, description, time, steps, ingredients, recipe_id } = this
            if (dish && description && time) {
                const editedDish = { dish, description, time }
                axios  
                    .put(`https://lolarecipes-backend.herokuapp.com/recipes/${recipe_id}`, editedDish, {headers: { Authorization: localStorage.getItem("token") }})
                    .then(res => (this.message = "Dish updated"))
                    .catch(err => (this.message = "Sorry, there was an error"))
            } else {
                this.message = "Please enter the dish name, description, and preparation time."
            } if (steps.length > 0) {
                axios  
                    .put(`https://lolarecipes-backend.herokuapp.com/steps/${recipe_id}`, steps, {headers: { Authorization: localStorage.getItem("token") }})
                    .then(res => (this.message = "Steps updated."))
                    .catch(() => (this.message = "Sorry, there was an error"))
            } else {
                this.message = "Please add some steps."
            } if (ingredients.length > 0) {
                axios
                    .put(`https://lolarecipes-backend.herokuapp.com/ingredients/${recipe_id}`, ingredients, {headers: { Authorization: localStorage.getItem("token") }})
                    .then(res => (this.message = "Ingredients updated."))
                    .catch(() => (this.message = "Sorry, there was an error"))
            } else {
                this.message = "Please add some ingredients."
            } 
        }
    }
}
</script>

<style scoped>
.form {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 40px auto;
    width: 90%;
    font-size: 24px;
}
.input {
    width: 85%;
    padding: 15px;
    font-size: 18px;
    margin: 14px 0;
}
.input-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px 20px 0;
}
.btn {
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid black;
    color: black;
    background: white;
}
.btn:hover {
    color: white;
    background: black;
}
.message {
    margin-top: 22px;
    height: 22px;
    font-size: 20px;
}
.ing-steps {
    display: flex;
    padding-top: 40px;
    margin-top: 40px;
    border-top: 4px double white;
    justify-content: space-between;
}
.list {
    padding-right: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40px auto;
    font-size: 20px;
}
.list-item {
    margin: 5px 20px;
}
.ingredients {
    width: 45%;
}
.steps {
    width: 45%;
}
.round-btn {
    min-width: 34px;
    font-size: 24px;
    font-weight: 700;
    border-radius: 50%;
    cursor: pointer;
    padding: 10px;
    color: #191919;
    background: white;
    border: 2px solid lightgrey;
}
.round-btn:hover {
    background: lightgrey;
}
.tablet-plus {
    display: none;
}
#submit {
    width: 100px;
    margin: 30px auto;
}
@media (max-width: 850px) {
    .ing-steps {
        flex-direction: column;
        align-items: center;
        padding-bottom: 40px;
        border-bottom: 4px double white;
    }
    .steps {
        width: 80%;
        border-right: none;
        margin-top: 30px;
    }
    .ingredients {
        padding-bottom: 20px;
        width: 80%;
        border-left: none;
    }
    .input-section {
        flex-direction: column;
        padding: 5px;
    }
    .plus {
        display: none;
    }
    .tablet-plus {
        display: block;
        width: 130px;
    }
    .list {
        width: 90%;
    }
    #submit {
        width: 130px;
    }
}
</style>
