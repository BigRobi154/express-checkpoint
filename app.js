const express = require('express');
const knex = require('knex')(require('./knexfile.js')['development']);
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(cookieParser())

app.get('/', function(req, res) {
    res.status(200).send("This is the movie API please use /movies for a list of movies")
  });

app.get('/movies', function(req, res) {
  let title = req.query.title
  if (title === undefined){
    knex
      .select('*')
      .from('movies')
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
         message:
            'The data you are looking for could not be found. Please try again'
        })
      );
  }
  else {
    knex
     .select('*')
     .from('movies')
     .where('title', title)
     .then(results => {
      if(results.length === 0){
        res.status(404).send(`Movie not found with title of ${title}.`)
      }
      else {res.status(200).send(results)}
    })
  }
});

app.get('/movies/:id', function(req, res) {
  let id = parseInt(req.params.id);
  //console.log("type of id: ", typeof id, "type of number: ", typeof 0)

  if (isNaN(id) === true) {
    res.status(400).send("Not a valid id. Please use an integer.")
  }
  else {
    knex('movies').where('id', id).then(results => {
      if(results.length === 0){
        res.status(404).send(`Movie not found with id of ${id}.`)
      }
      else {res.status(200).send(results)}
    })
  }
});

app.post('/movies', function(req, res) {
  //console.log(req.body);
  knex('movies').insert(req.body)
  .then((results) => {
    console.log("I'm req.body: ", req.body)
    res.status(200).send(`${req.body.title} was sent`)}
    )
  .catch(err => {
    return res.status(500).send(err);
  });
});

app.delete('/movies/:id', function(req, res) {
  let id = parseInt(req.params.id);

  if (isNaN(id) === true) {
    res.status(400).send("Not a valid id. Please use an integer.")
  }
  else {

    knex('movies').where('id', id).then((results) => {
      if (results.length === 0) {
        res.status(400).send("Movie not found - nothing deleted");
      }
      else {
        let movieInfo = results[0]

        knex(`movies`).where('id', id).del()
        .then(() => res.status(200).send(`${movieInfo.title} was deleted.`))
        .catch(err => {
          return res.status(500).send(err);
        })
      }
    })
  }
});

app.get("/setCookie", function (req, res) {
    res.cookie("firstName", req.query.firstName)
    res.cookie("lastName", req.query.lastName)

    res.status(200).send("You've set your name cookie.")
})

app.get("/readCookie", function (req, res) {
  res.status(200).send(`Welcome ${req.cookies.firstName} ${req.cookies.lastName}`)
})
/*
const express('express')
    , cookieParser = require('cookie-parser'); // in order to read cookie sent from client

app.get('/', (req,res)=>{

    // read cookies
    console.log(req.cookies)

    let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    }

    // Set cookie
    res.cookie('cookieName', 'cookieValue', options) // options is optional
    res.send('')

})
*/


app.listen(3000, () => {
  console.log(`Yo dawg call me up on dat sweet port: ${port}`)
})