
exports.seed = function(knex, Promise) {
  return knex('ingredients').truncate()
    .then(function () {
      return knex('ingredients').insert([
        { ingredient: 'butter', quantity: '2 cup', recipe_id: 1 },
        { ingredient: 'egg', quantity: '1', recipe_id: 1 },
        { ingredient: 'milk', quantity: '1/2 cup', recipe_id: 2 },
        { ingredient: 'broth', quantity: '1 lb', recipe_id: 2 },
        { ingredient: 'wheat', quantity: '2 oz', recipe_id: 3 },
        { ingredient: 'soybean', quantity: '4 tsp', recipe_id: 3 },
      ])
    })
}
