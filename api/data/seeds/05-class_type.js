exports.seed = function(knex, Promise) {
  return knex('class_type').insert([   
    { type_description: 'yoga' },
    { type_description: 'boxing' },
    { type_description: 'cycling' },
    { type_description: 'swimming' }
  ]);
};