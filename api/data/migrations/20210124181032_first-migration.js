exports.up = async (knex) => {
  await knex.schema
    .createTable("user_role", (roles) => {
      roles.increments("role_id");
      roles.string("role_type", 128).notNullable().unique();
    })
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable().unique();
      users.string("password", 200).notNullable();
      users.integer("role_id").notNullable()
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("user_role")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      users.timestamps(false, true);
    })
    .createTable("class_intensity", (intensity) => {
      intensity.increments("intensity_id");
      intensity.string("intensity_level").notNullable().unique()
    })
    .createTable("class_type", (type) => {
      type.increments("type_id")
      type.string("type_description", 128).notNullable().unique()
    })
    .createTable("classes", (classes) => {
      classes.increments("class_id")
      classes.string("class_name", 128).notNullable()
      classes.string("class_duration", 128).notNullable()
      classes.integer("max_class_size").notNullable()
      classes.date("class_date").notNullable()
      classes.time("start_time").notNullable()
      classes.string("class_location", 128).notNullable()
      classes.integer("class_instructor").notNullable()
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      classes.integer("intensity_id").notNullable()
        .unsigned()
        .notNullable()
        .references("intensity_id")
        .inTable("class_intensity")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT")
      classes.integer("type_id").notNullable()
        .unsigned()
        .notNullable()
        .references("type_id")
        .inTable("class_type")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT")
    })
};

exports.down = async (knex) => {
  return knex.schema
  .dropTableIfExists("classes")
  .dropTableIfExists("class_type")
  .dropTableIfExists("class_intensity")
  .dropTableIfExists("users")
  .dropTableIfExists("user_role")
};