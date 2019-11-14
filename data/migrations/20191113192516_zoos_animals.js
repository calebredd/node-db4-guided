exports.up = function(knex) {
  return knex.schema
    .createTable("zoos", tbl => {
      tbl.increments();
      tbl
        .text("zoo_name", 128)
        .unique()
        .notNullable();
      tbl
        .text("address", 128)
        .unique()
        .notNullable();
    })
    .createTable("species", tbl => {
      tbl.increments();
      tbl
        .text("species_name", 128)
        .unique()
        .notNullable();
    })
    .createTable("animals", tbl => {
      tbl.increments();
      tbl
        .text("animal_name", 128)
        .unique()
        .notNullable();
      //foreign key that points to species table:
      //unsigned() means the id integer must be a positive number
      tbl
        .integer("species_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("species")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("zoo_animals", tbl => {
      tbl
        .integer("animal_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("animals")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("zoo_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("zoos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["animal_id", "zoo_id"]);
    });
};

exports.down = function(knex) {
  //reverse order of setup. Like shoes and socks.
  return knex.schema
    .dropTableIfExists("zoo_animals")
    .dropTableIfExists("animals")
    .dropTableIfExists("species")
    .dropTableIfExists("zoos");
};
