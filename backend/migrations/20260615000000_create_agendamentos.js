/**
 * Migration: create table agendamentos
 */
exports.up = function(knex) {
  return knex.schema.createTable('agendamentos', function(table){
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('telefone').notNullable();
    table.string('profissional').notNullable();
    table.date('data').notNullable();
    table.time('hora').notNullable();
    table.string('status').notNullable().defaultTo('pendente');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('agendamentos');
};
