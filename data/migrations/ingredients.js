
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredients', table => {
    table.increments()
    table.string('ingredient', 500).notNullable()
    table.string('quantity', 255).notNullable()
    table.integer('recipe_id').unsigned().references('id').inTable('recipes')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ingredients')
};
