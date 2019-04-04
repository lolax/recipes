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
                        <span>{{ing.quantity}}</span>
                        <span>{{ing.ingredient}}</span>
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
                    <div class="edit-text">edit</div>
                </div>
                <div class="btn delete" @click="remove(recipe.id)">
                    <div class="delete-text">delete</div>
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
            .get(`https://lolarecipes-backend.herokuapp.com/recipes/${id}`, {headers: { Authorization: localStorage.getItem("token") }})
            .then(res => (this.recipe = res.data[0]))
            .catch(err => (this.message = err.message))
        axios
            .get(`https://lolarecipes-backend.herokuapp.com/ingredients/${id}`, {headers: { Authorization: localStorage.getItem("token") }})
            .then(res => (this.ingredients = res.data))
            .catch(err => (this.message = err.message))
        axios
            .get(`https://lolarecipes-backend.herokuapp.com/steps/${id}`, {headers: { Authorization: localStorage.getItem("token") }})
            .then(res => (this.steps = res.data.sort((a, b) => a.order - b.order)))
            .catch(err => (this.message = err.message))
    },
    methods: {
        remove(id) {
            axios
                .delete(`https://lolarecipes-backend.herokuapp.com/recipes/${id}`, {headers: { Authorization: localStorage.getItem("token") }})
                .then(res => (this.$router.push("/recipes/")))
                .catch(err => (this.message = err.message))
        }
    }
}
</script>

<style scoped>
    .dish {
        width: 20%;
        font-size: 26px;
        font-weight: 600;
        margin: 10px auto;
        padding: 10px;
        border-bottom: 4px double white;
        color: white;
    }
    .desc {
        font-size: 20px;
        color: white;
    }
    .time {
        font-size: 20px;
        color: white;
    }
    .details {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 20px;
    }
    .ingredients {
        font-size: 20px;
        border: 1px solid lightgrey;
        color: white;
        padding: 10px;
        border-radius: 5px;
        width: 50%;
        margin: 10px;
    }
    .steps {
        font-size: 20px;
        border: 1px solid lightgrey;
        color: white;
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
        background: white;
        color: black;
        position: relative;
    }
    .btn:hover {
        background: black;
        color: white;
    }
    .edit {
        clip-path: polygon(0 0, 0 100%, 100% 0);
    }
    .edit-text {
        position: absolute;
        z-index: 2;
        top: 10px;
        left: 10px;
    }
    .delete-text {
        position: absolute;
        z-index: 2;
        bottom: 10px;
        right: 10px;
    }
    .delete {
        clip-path: polygon(100% 0, 0 100%, 100% 100%);
    }
    span {
        margin: 1px 3px;
    }
</style>