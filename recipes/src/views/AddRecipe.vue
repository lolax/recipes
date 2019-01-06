<template>
    <div id="add-recipe">
        <form v-bind:class="[part === 1 ? 'form' : 'hidden']">What's Cookin?
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
            <div class="ing-steps">
                <div class="ingredients">
                    <div class="input-section">
                        <div class="inputs">
                            <div class="title">Ingredients</div>
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
                    </div>
                    <div class="list" v-for="i in ingredients" :key="i.id">
                        <div class="list-item">{{i.quantity}} {{i.ingredient}}</div>
                        <div class="round-btn" @click="removeIngredient(i.ingredient)">-</div>
                    </div>
                </div>
                <div class="steps">
                    <div class="input-section">
                        <div class="inputs">
                            <div class="title">Steps</div>
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
                    </div>
                    <div class="list" v-for="s in steps" :key="s.id">
                        <div class="list-item">{{s.order}}. {{s.step}}</div>
                        <div class="round-btn" @click="removeStep(s.step)">-</div>
                    </div>
                </div>
            </div>
            <div 
                id="submit" 
                v-bind:class="[steps.length > 0 && ingredients.length > 0 ? 'btn' : 'hidden']" 
                @click="addRecipe">
                Submit Recipe
            </div>
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
    methods: {
        addDish() {
            const { dish, description, time } = this
            if (dish && description && time) {
                const newDish = { dish, description, time }
                axios  
                    .post("http://localhost:3300/recipes", newDish)
                    .then(res => {
                        this.recipe_id = res.data[0]
                        this.part = 2
                        this.dish = ""
                        this.description = ""
                        this.time = ""
                    })
                    .catch(err => (this.message = err))
                
            } else {
                this.message = "Please enter the dish name, description, and preparation time."
            }
        },
        addIngredient() {
            if (this.ingredient.length > 27) { this.ingredient = this.ingredient.slice(0, 27) + "..." }
            const { recipe_id, ingredient, quantity } = this
            if (recipe_id && ingredient && quantity) {
                const newIng = { recipe_id, ingredient, quantity }
                this.ingredients.push(newIng)
                this.ingredient = ""
                this.quantity = ""
                this.message = ""
            } else {
                this.message = "Please enter the ingredient name & quantity."
            }
        },
        addStep() {
            const { recipe_id, step, order } = this
            if (recipe_id && this.step && this.order) {
                const newStep = { recipe_id, step, order }
                this.steps.push(newStep)
                this.steps = this.steps.sort((a, b) => a.order - b.order)
                this.step = ""
                this.order = ""
                this.message = ""
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
                    .then(res => {
                        this.message = "Recipe added."
                        this.steps = []
                        this.part = 1
                    })
                    .catch(err => (this.message = "Recipe failed to add."))
            } else {
                this.message = "Please add some steps."
            } if (ingredients.length > 0) {
                axios  
                    .post("http://localhost:3300/ingredients", ingredients)
                    .then(res => {
                        this.message = "Recipe added."
                        this.ingredients = []
                        this.part = 1
                    })
                    .catch(err => (this.message = "Recipe failed to add."))
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
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 40px auto;
    width: 90%;
    font-size: 24px;
}
.hidden {
    display: none;
}
.input {
    width: 85%;
    padding: 15px;
    font-size: 18px;
    margin: 14px 0;
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
.ing-steps {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.ingredients {
    width: 42%;
    padding: 0 20px;
    border-right: 4px double black;
    border-left: 4px double black;
}
.steps {
    width: 42%;
    padding: 0 20px;
    border-right: 4px double black;
    border-left: 4px double black;
}
.input-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px 20px 0;
}
.plus {
    margin-top: 32px;
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
.round-btn {
    min-width: 34px;
    font-size: 24px;
    font-weight: 700;
    border-radius: 50%;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #e5e5e5;
    color: #e5e5e5;
    background: white;
}
.round-btn:hover {
    color: white;
    background: #e5e5e5;
}
#submit {
    width: 66px;
    margin: 30px auto;
}
</style>