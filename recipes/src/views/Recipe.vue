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
                    <div class="step" v-for="step in steps" :key="step.id">
                        <div>{{step.order}}. {{step.step}}</div>
                    </div>
                </div>
            </div>
            <div class="btns">
                <div class="btn edit" @click="$router.push(`/recipes/${recipe.id}/edit`)">
                    <div>edit</div>
                </div>
                <div class="btn delete" @click="remove(recipe.id)">
                    <div>delete</div>
                </div>
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
            .then(res => (this.steps = res.data.sort((a, b) => a.order - b.order)))
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
        align-items: center;
        flex-direction: column;
        margin: 20px;
    }
    .ingredients {
        font-size: 20px;
        border: 1px solid lavender;
        padding: 10px;
        border-radius: 5px;
        width: 50%;
        margin: 10px;
    }
    .steps {
        font-size: 20px;
        border: 1px solid lavender;
        padding: 10px;
        border-radius: 5px;
        width: 50%;
        margin: 10px;
    }
    .btns {
        display: flex;
        justify-content: center;
    }
    .btn {
        font-size: 18px;
        display: flex;
        margin: 10px -50px;
        width: 100px;
        padding: 10px;
        height: 100px;
        cursor: pointer;
        background: lavender;
        color: black;
    }
    .btn:hover {
        background: black;
        color: white;
    }
    .edit {
        justify-content: start;
        align-items: start;
        clip-path: polygon(0 0, 0 100%, 100% 0);
    }
    .delete {
        justify-content: end;
        align-items: end;
        clip-path: polygon(100% 0, 0 100%, 100% 100%);
    }
</style>