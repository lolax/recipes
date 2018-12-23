
exports.seed = function(knex, Promise) {
  return knex('steps').truncate()
    .then(function () {
      return knex('steps').insert([
        { step: 'shake up', order: 2, recipe_id: 1 },
        { step: 'simmer', order: 1, recipe_id: 1 },
        { step: 'boil', order: 1, recipe_id: 2 },
        { step: 'bake', order: 5, recipe_id: 2 },
        { step: 'chop', order: 1, recipe_id: 3 },
        { step: 'sautee', order: 2, recipe_id: 3 },
      ])
    })
}
