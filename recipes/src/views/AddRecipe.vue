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
                    <div class="minus" @click="removeIngredient(i.id)">-</div>
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
                    <div class="minus" @click="removeStep(s.id)">-</div>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            part: 1,
            dish: "",
            description: "",
            time: 0,
            ingredients: [],
            ingredient: "",
            quantity: "",
            steps: [],
            step: "",
            order: 0
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
