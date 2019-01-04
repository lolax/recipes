<template>
    <div id="recipe-view">
        <div>
            <div class="overview">
                <div class="dish">{{recipe.dish}}</div>
                <div class="desc">{{recipe.description}}</div>
                <div class="time">{{recipe.time}} minutes</div>
            </div>
            <div class="details">
                <div class="ingredients">Ingredients
                    <div v-for="ing in ingredients" :key="ing.id">
                        <div>{{ing.ingredient}}</div>
                        <div>{{ing.quantity}}</div>
                    </div>
                </div>
                <div class="steps">Steps
                    <div v-for="step in steps" :key="step.id">
                        <div>{{step.step}}</div>
                        <div>{{step.order}}</div>
                    </div>
                </div>
            </div>
            <div class="btns">
                <div class="btn" @click="this.$router.push(`/recipes/${recipe.id}/edit`)">edit</div>
                <div class="btn" @click="this.remove(this.recipe.id)">delete</div>
            </div>
        </div>
        <div>{{this.message}}</div>
    </div>
</template>

<script>
import axios from 'axios'
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
            .then(res => (this.recipe = res.data[0]))
            .catch(err => (this.message = err))
        axios
            .get(`http://localhost:3300/ingredients/${id}`)
            .then(res => (this.ingredients = res.data))
            .catch(err => (this.message = err))
         axios
            .get(`http://localhost:3300/steps/${id}`)
            .then(res => (this.steps = res.data))
            .catch(err => (this.message = err))
    },
    methods: {
        remove(id) {
            axios
                .delete(`http://localhost:3300/recipes/${id}`)
                .then(res => (this.$router.push("/recipes/")))
                .catch(err => (this.message = err))
        }
    }
}
</script>

<style scoped>
    .dish {
        width: 20%;
        font-size: 24px;
        font-weight: 600;
        margin: 10px auto;
        padding: 10px;
        border-bottom: 4px double black;
    }
    .desc {
        font-size: 20px;
    }
    .time {
        font-size: 20px;
    }
    .details {
        display: flex;
        justify-content: space-evenly;
    }
    .ingredients {
        font-size: 20px;
        border: 1px solid lavender;
        padding: 10px;
        width: 40%;
    }
    .steps {
        font-size: 20px;
        border: 1px solid lavender;
        padding: 10px;
        width: 40%;
    }
</style>