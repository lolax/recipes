
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', table => {
    table.increments()
    table.string('dish', 255).notNullable()
    table.text('description').notNullable()
    table.integer('time').notNullable()
    table.string('uid').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipes')
};
