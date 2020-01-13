const express = require("express");
const router = express.Router();
const request = require('request');
const Movie = require('../models/Movie');
const queryIsEmpty = require('../utils/queryIsEmpty');



//@route                GET /routes/movie/imdb/:imdb
//@description          Get movie by movieId
//@access               Public
//@example              http://localhost:5006/routes/imdb/tt1346985

router.get("/imdb/:imdb", (req, res) => {
    Movie.findOne({ imdbID: req.params.imdb })
        .then(movie => res.json({
            movie,
            retrieveImdbID: "movie with imdbID retrieved"
        }))
        .catch(error =>
            res.status(404).json({ nomoviefound: "No movie found with that imdbID" })
        );
});



//@Route               GET /routes/movie?pagesize=#&page=#
//@description          Get all movies; with pagination
//@access               Public
//@example              http://localhost:5006/routes?pagesize=10&page=1
//@example              http://localhost:5006/routes

router.get('/all', (req, res, next) => {

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const movieQuery = Movie.find();

    let moviesRetrieved;

    if (pageSize && currentPage) {
        movieQuery.skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    movieQuery.then(movies => {
        moviesRetrieved = movies;

        return Movie.count();
    }).then(
        count => {
            res.json({
                message: 'Movie fetched successfully',
                movies: moviesRetrieved,
                totalMovies: count,
                retrieved: pageSize
            });

        }).catch(err => res.json(err));
});



//@route                GET /routes/movie/:id
//@description          Get movie by id
//@access               Public
//@example              http://localhost:5006/routes/5e1a902c475a63479063eb78


router.get("/:id", (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => res.json({
            movie,
            retrieveID: "movie with id retrieved"
        }))
        .catch(error =>
            res.status(404).json({ nomoviefound: "No movie found with that ID" })
        );
});



//@route                POST /routes/movie/comment/:id
//@description          Add a comment to a movie
//@access               Public route
//@example              http://localhost:5006/routes/comment/5e1a902c475a63479063eb78

router.post(
    "/comment/:movieId", (req, res) => {


        Movie.findById(req.params.movieId)
            .then(movie => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                };

                //Add to comments array, latest comments should be seen first. 
                movie.comments.unshift(newComment);

                //Save
                movie
                    .save()
                    .then(movie => res.json(movie))
                    .catch(err => console.log(err));
            })
            .catch(err => res.status(404).json({ movienotfound: "No movie found" }));
    }
);



//@route                POST /routes/movie/result/:movie query
//@description          Make a POST request to retrieve movies by search query
//@access               Public route
//@example              http://localhost:5006/routes/movies/sing/d493df64




router.post('/:query/:apikey', function(req, res) {

    if (!req.params.query) {
        res.json("empty query fields1!");
        return;
    }

    const query = req.params.query;
    const apikey = req.params.apikey;


    const apiMovieUrl = 'https://www.omdbapi.com/?s=' + query + '&apikey=' + apikey;


    request(apiMovieUrl, function(error, response, body) {


        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);

            const newData = data.Search;


            //check if user enters an empty query
            if (queryIsEmpty(newData)) {

                res.status(400).json({ errors: "Too many results for this query: you should have atleast 3 characters" });
            } else {

                const movieData = []
                newData.forEach(item => {

                    movieData.push(item);

                    const newMovie = new Movie({
                        title: item.Title,
                        year: item.Year,
                        imdbID: item.imdbID,
                        type: item.Type,
                        poster: item.Poster
                    });

                    const movieId = newMovie._id;
                    const imdbID = newMovie.imdbID;

                    Movie.findOne({ id: movieId }).then(result => {
                        if (result) {

                            res.status(204).json()

                        } else {
                            //Create

                            // Check if movieID exists
                            Movie.findOne({ imdbID })
                                .then(newImdb => {
                                    if (newImdb) {

                                        res.status(401);
                                        return;
                                    } else {
                                        //Save new Movie

                                        new Movie(newMovie)
                                            .save()
                                            .then()
                                            .catch(err => console.log(err));
                                    }

                                })
                                .catch(err => console.log(err));
                        }

                    })


                });
                res.json(movieData);
            }
        }
    });
});


//@route                POST /routes/movie/comment/:id
//@description          Add a comment to a movie
//@access               Public route
//@example              http://localhost:5006/routes/comment/5e1a902c475a63479063eb78
router.get("/comment/comment", (req, res) => {

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const movieQuery = Movie.find();

    let movieItem = [];

    if (pageSize && currentPage) {
        movieQuery.skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    movieQuery.then(movies => {

        movies.forEach((item) => {
            if (item.comments.length > 0) {
                movieItem.push(item)
            }
        });

        res.json(movieItem);
        return Movie.count();
    }).catch(err => res.status(404).json({ success: false }));


});




module.exports = router;