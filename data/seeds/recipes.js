
exports.seed = function(knex, Promise) {
  return knex('recipes').truncate()
    .then(function () {
      return knex('recipes').insert([
        { dish: 'Spagett', description: 'long noodle', time: 12 },
        { dish: 'Macroni', description: 'short noodle', time: 10 },
        { dish: 'Ramen', description: 'squiggly noddle', time: 30 }
      ])
    })
}
