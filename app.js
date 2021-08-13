const express = require('express');
const movies = require('./movies.json');

const app = express();
const port = 3000;

app.get('/', function(req, res) {
    res.status(200).send("This is the movie API please use /movies for a list of movies")
  });

app.get('/movies', function(req, res) {
  let title = req.query.title
    console.log(title);

    if(title != undefined){
      res.status(200).send(title)
    }
    else {
      res.status(200).send(movies)
    }
  });

app.get('/movies/:id', function(req, res) {
  let id = parseInt(req.params.id);
  //console.log("type of id: ", typeof id, "type of number: ", typeof 0)

  const movieToReturn = movies.find(movie => movie.id === id);
  console.log("Movie to return: ", movieToReturn);

  if (isNaN(id) === true) {
    res.status(400).send("Not a valid id. Please use an integer.")
  }
  else if (movieToReturn === undefined) {
    res.status(404).send(`Movie not found with id of ${id}.`)
  }
  else {
    res.status(200).send(movieToReturn)
  }

  });

app.listen(3000, () => {
  console.log(`Yo dawg call me up on dat sweet port: ${port}`)
})