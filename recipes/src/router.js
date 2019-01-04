import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome.vue'
import AddRecipe from './views/AddRecipe.vue'
import EditRecipe from './views/EditRecipe.vue'
import Recipes from './views/Recipes.vue'
import Recipe from './views/Recipe.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/new',
      name: 'add-recipe',
      component: AddRecipe
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: Recipe
    },
    {
      path: '/recipes/:id/edit',
      name: 'edit-recipe',
      component: EditRecipe
    }
  ]
})
