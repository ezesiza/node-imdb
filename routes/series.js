const express = require("express");
const router = express.Router();
const request = require('request');
const Series = require('../models/Series');
const queryIsEmpty = require('../utils/queryIsEmpty');



//Get by Series 
//@Route               GET /routes/serie?pagesize=#&page=#
//@description          Make a post request to get by series
//@access               Public
//@example              http://localhost:5006/routes/season/witcher/1/2/d493df64
//@example              http://localhost:5006/routes
router.post('/:series/:apikey', function(req, res) {

    const seriesQuery = req.params.series;

    const apikey = req.params.apikey;

    const seriesQuery2 = seriesQuery.split("  ");

    const apiSeriesUrl = 'https://www.omdbapi.com/?t=' + seriesQuery2 + '&apikey=' + apikey;

    request(apiSeriesUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));

            const seriesData = JSON.parse(body);

            //check if user enters an empty query
            if (queryIsEmpty(seriesData)) {

                res.status(400).json({ errors: "You should have atleast 3 characters" });
            } else {

                const newSeries = new Series({
                    title: seriesData.Title,
                    year: seriesData.Year,
                    rated: seriesData.Rated,
                    released: seriesData.Released,
                    runtime: seriesData.Runtime,
                    genre: seriesData.Genre,
                    director: seriesData.Director,
                    writer: seriesData.Writer,
                    actors: seriesData.Actors,
                    plot: seriesData.Plot,
                    language: seriesData.Language,
                    country: seriesData.Country,
                    awards: seriesData.Awards,
                    poster: seriesData.Poster,
                    ratings: seriesData.Ratings,
                    metascore: seriesData.Metascore,
                    imdbrating: seriesData.imdbRating,
                    imdbvotes: seriesData.imdbVotes,
                    imdbID: seriesData.imdbID,
                    type: seriesData.Type,
                    totalseasons: seriesData.totalseasons,
                });

                const movieId = newSeries._id;
                const imdbID = newSeries.imdbID;

                Series.findOne({ id: movieId }).then(result => {
                    if (result) {

                        res.status(204).json()

                    } else {
                        //Create

                        // Check if SeriesId exists
                        Series.findOne({ imdbID })
                            .then(newImdb => {
                                if (newImdb) {

                                    res.status(401);
                                    return;
                                } else {
                                    //Save new Series

                                    new Series(newSeries)
                                        .save()
                                        .then()
                                        .catch(err => console.log(err));
                                }

                            })
                            .catch(err => console.log(err));
                    }

                })

            }
        }
    });
});


//@Route               GET /routes/serie?pagesize=#&page=#
//@description          Get all series; with pagination
//@access               Public
//@example              http://localhost:5006/routes?pagesize=10&page=1
//@example              http://localhost:5006/routes

router.get('/all', (req, res, next) => {

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const seriesQuery = Series.find();

    let seriesRetrieved;

    if (pageSize && currentPage) {
        seriesQuery.skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    seriesQuery.then(series => {
        seriesRetrieved = series;

        return Movie.count();
    }).then(
        count => {
            res.json({
                message: 'Series fetched successfully',
                series: seriesRetrieved,
                totalSeries: count,
                retrieved: pageSize
            });

        }).catch(err => res.json(err));
});


module.exports = router;