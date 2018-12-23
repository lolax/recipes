
exports.up = function(knex, Promise) {
  return knex.schema.createTable('steps', table => {
    table.increments()
    table.text('step').notNullable()
    table.integer('order').notNullable()
    table.integer('recipe_id').unsigned().references('id').inTable('recipes')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('steps')
};
