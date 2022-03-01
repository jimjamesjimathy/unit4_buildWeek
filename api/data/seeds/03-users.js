/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

   
 const bcrypt = require("bcryptjs");

 const hash = bcrypt.hashSync("1234", 8);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'John Diss', password: hash, role_id: 1},
        { username: 'Phillip McCrevis', password: hash, role_id: 1},
        { username: 'Molly Cule', password: hash, role_id: 2},
        { username: 'Ally Gator', password: hash, role_id: 2},
      ]);
    });
};