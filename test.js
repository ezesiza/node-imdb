// const request = require('request');


// function getMovieById(id, callback) {
//     request.get(`http://www.omdbapi.com/?i=${id}&apikey=a381af98`, (err, raw, body) => {
//         console.log(raw);
//         return callback(err, JSON.parse(body))

//     });
// }

// // const getMovieByQuery = (query_term, callback) => {
// //     request.get(`http://www.omdbapi.com/?s=${query_term}&apikey=a381af98`)
// // }


// getMovieById((err, data) => {
//     if (err) throw err;
//     console.log(data)
// })




// router.get('/coinbase', (req, res) => {
//     request('https://api.coindesk.com/v1/bpi/historical/close.json', (error, response, body) => {
//         if (!error && response.statusCode == 200) {
//             var data = JSON.parse(body)
//                 //res.json('results', { data: data });
//                 //console.log(response)
//             res.status(200).json({ data: data });
//         }

//     });
// });


// // function fetchFromAPI(callback) {
// //     request('https://api.coindesk.com/v1/bpi/historical/close.json', (err, raw, body) => {
// //         return callback(err, JSON.parse(body));
// //     });
// // }

// // fetchFromAPI((err, data) => {
// //     if (err) throw err;
// //     console.log(data)
// // });