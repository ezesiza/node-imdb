const express = require("express");
const router = express.Router();
const request = require('request');
const Episode = require('../models/Episode');
const Season = require('../models/Season');
const queryIsEmpty = require('../utils/queryIsEmpty');




//Post by Season and Episode 
router.post('/:serie/:season/:episode/:apikey', function(req, res) {
    if (typeof req.query === "undefined" || typeof req.param === "undefined") {
        return;
    }

    const serieQuery = req.params.serie;
    const seasonQuery = req.params.season;
    const episodeQuery = req.params.episode;

    const apikey = req.params.apikey;

    const serieQuery2 = serieQuery.split("  ");


    const seasonEpisodeUrl = 'https://www.omdbapi.com/?t=' + serieQuery2 + '&Season=' + seasonQuery + '&Episode=' + episodeQuery + '&apikey=' + apikey;
    //http://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1&Episode=1
    console.log(seasonEpisodeUrl);

    request(seasonEpisodeUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));

            const episodeData = JSON.parse(body);

            //check if user enters an empty query
            if (queryIsEmpty(episodeData)) {

                res.status(400).json({ errors: "You should have atleast 3 characters" });
            } else {


                const newEpisode = new Episode({
                    title: episodeData.Title,
                    year: episodeData.Year,
                    rated: episodeData.Rated,
                    released: episodeData.Released,
                    season: episodeData.episode,
                    runtime: episodeData.Runtime,
                    episode: episodeData.episode,
                    genre: episodeData.Genre,
                    director: episodeData.Director,
                    writer: episodeData.Writer,
                    actors: episodeData.Actors,
                    plot: episodeData.Plot,
                    language: episodeData.Language,
                    country: episodeData.Country,
                    awards: episodeData.Awards,
                    poster: episodeData.Poster,
                    ratings: episodeData.Ratings,
                    metascore: episodeData.Metascore,
                    imdbrating: episodeData.imdbRating,
                    imdbvotes: episodeData.imdbVotes,
                    imdbID: episodeData.imdbID,
                    type: episodeData.Type,
                    seasonsID: episodeData.seriesID,
                });

                const movieId = newEpisode._id;
                const imdbID = newEpisode.imdbID;

                Episode.findOne({ id: movieId }).then(result => {
                    if (result) {

                        res.status(204).json()

                    } else {
                        //Create

                        // Check if EpisodeId exists
                        Episode.findOne({ imdbID })
                            .then(newImdb => {
                                if (newImdb) {

                                    res.status(401);
                                    return;
                                } else {
                                    //Save new Episode

                                    new Episode(newEpisode)
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


//Post by Season only
router.post('/:serie/:season/:apikey', function(req, res) {
    // if (typeof req.params.season === "undefined" || typeof req.params.apikey === "undefined") {
    //     return;
    // }

    const seasonQuery = req.params.season;
    const serieData = req.params.serie;
    const apikey = req.params.apikey;
    //https://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1&apikey=d493df64

    const serieQuery = serieData.split("  ");
    //For queries with multiple words, the api requires the query to be in this format


    const apiSeasonUrl = 'https://www.omdbapi.com/?t=' + serieQuery + '&Season=' + seasonQuery + '&apikey=' + apikey;


    request(apiSeasonUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            const reformedData = [];
            season = JSON.parse(body);
            Object.entries(season).forEach((key, value) => {

                reformedData.push(key);
            });

            const seasonArray = [];

            reformedData.forEach(item => {
                itemArray = [].concat.apply([], item);
                seasonArray.push(itemArray);
            });

            seasonRecords = {
                'Title': seasonArray[0][1],
                'Season': seasonArray[1][1],
                'TotalSeasons': seasonArray[2][1],
                'Episodes': seasonArray[3].slice(1)
            }

            if (queryIsEmpty(seasonRecords)) {

                res.status(400);
            } else {


                const newSeason = new Season({
                    title: seasonRecords.Title,
                    seasons: seasonRecords.Season,
                    totalseasons: seasonRecords.TotalSeasons,
                    episodes: seasonRecords.Episodes,

                });
                res.json(newSeason);

                Season.findOne({ seasons: seasonRecords.Season }).then(result => {
                    if (result) {

                        res.status(204).json();
                        return;

                    } else {

                        //Save new Season

                        new Season(newSeason)
                            .save()
                            .then()
                            .catch(err => console.log(err));

                    }

                })

            }
        }
    });
});


router.get('/all', (req, res, next) => {

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const seasonQuery = Season.find();

    let seasonRetrieved;

    if (pageSize && currentPage) {
        seasonQuery.skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    seasonQuery.then(seasons => {
        seasonRetrieved = seasons;

        return Season.count();
    }).then(
        count => {
            res.json({
                message: 'Seasons fetched successfully',
                season: seasonRetrieved,
                totalSeasons: count,
                retrieved: pageSize
            });

        }).catch(err => res.json(err));
});


module.exports = router;