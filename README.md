# NETGURU RESTUL API: MOVIE-DATABASE



## Running the program in docker.
navigate to `${DOCKERHOST}`:5006/routes/movies/all  (for example if you want to GET all movies)

This is a simple REST API for us - a basic movie database interacting with external API. Here’s full specification of endpoints contained in this project.

## POST /movies:
Based on passed data, other movie details should be fetched from http://www.omdbapi.com/ (or other similar, public movie database) - and saved to application database (MONGODB).

# //@route                POST /routes/movie/result/:movie query
# //@description          Make a POST request to retrieve movies by search query
# //@access               Public route
# //@example              http://localhost:5006/routes/movie/sing/APIKEY
# where APIKEY=d493df64 (for example )

The POST request automatically saves the response to the database. 
Controller logic for the post request ensures that multiple request for the same "movie query"('sing' in this case),
does not result in duplicate data in the databse. 


## GET /movies:
Should fetch list of all movies already present in application database.

## //@Route               GET /routes/movie?pagesize=#&page=#
## //@description          Get all movies; with pagination
## //@access               Public
## //@example              http://localhost:5006/routes?pagesize=10&page=1
## //@example              http://localhost:5006/routes

This retrieves all movies in the database. Provisions where made for pagination. User can specify the number of 
movies to retrieve. 

Movies can also be retrieved by their imdbID 
## //@example              http://localhost:5006/routes/imdb/tt1346985
## //@route                GET /routes/movie/imdb/:imdb

or by thier mongodb id
## //@route                GET /routes/movie/:id
## //@example              http://localhost:5006/routes/5e1a902c475a63479063eb78




## POST /comments:
Comment should be saved to application database. 
Each movie has a comment property. User can post a comment on each movie using the _id property (as well as like a movie). 

## //@route                POST /routes/movie/comment/:id
## //@description          Add a comment to a movie
## //@access               Public route
## //@example              http://localhost:5006/routes/comment/5e1a902c475a63479063eb78




GET /comments:
Should fetch list of all comments present in application database.

User can retrieve movies that have been commented upon. 

## //@route                POST /routes/movie/comment/comment
## //@description          Add a comment to a movie
## //@access               Public route
## //@example              http://localhost:5006/routes/movies/comment/comment






## Running the mocha chai test.

Run `npm test` to execute the  tests. from the root folder. 
Before running the test, the following code section should be uncommented in the **movie.spec.js** file.
            

    /*******     beforeEach((done) => { //Before each test we empty the database
                    Movie.remove({}, (err) => {
                        done();
                    });
                  });                   ********/

However, this code snippet should remain commented as there would be no movies in the database with associated comments. 



## The utils folder 
Contains the the mongodb connection url configuration, to be used in production or development. 
it also contains a file (**queryIsEmpty**) for **null checks** in the event that a user enters an empty query. 



## ADDITIONAL FUNCTIONALITY. 
Similar functionalities where implemented to POST and GET (**Series**, **Seasons** and **Episodes**).
A front-end application in reactjs was designed but not included (for simplicity and brevity). 
Test cases for **season** and **series** endpoints, where exluded (for simplicity and brevity). 





