exports.seed = function(knex, Promise) {
  return knex('class_intensity').insert([   
    { intensity_level: 'beginner' },
    { intensity_level: 'intermediate' },
    { intensity_level: 'advanced' }
  ]);
};