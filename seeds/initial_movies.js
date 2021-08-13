
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {
        "id": 1,
        "title": "Midnight In Paris",
        "runtime": 96,
        "release_year": 2011,
        "director": "Woody Allen"
        },
        {
        "id": 2,
        "title": "Titanic",
        "runtime": 210,
        "release_year": 1997,
        "director": "James Cameron"
        },
        {
        "id": 3,
        "title": "From Paris With Love",
        "runtime": 94,
        "release_year": 2010,
        "director": "Pierre Morel"
        }
      ]);
    });
};
