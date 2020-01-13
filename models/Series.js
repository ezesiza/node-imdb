const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema. To retrieve by Series.

const SeriesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    title: {
        type: String,
    },
    year: {
        type: String,
    },
    rated: {
        type: String,
    },

    released: {
        type: String,
    },
    runtime: {
        type: String,
    },
    genre: {
        type: String,
    },
    director: {
        type: String,
    },
    writer: {
        type: String,
    },
    actors: {
        type: String,
    },
    plot: {
        type: String,
    },
    language: {
        type: String,
    },
    country: {
        type: String,
    },
    awards: {
        type: String,
    },
    poster: {
        type: String,
    },
    ratings: [{
        source: {
            type: String
        },
        value: {
            type: String
        }
    }],

    metascore: {
        type: String
    },
    imdbID: {
        type: String
    },
    imdbrating: {
        type: String
    },
    imdbvotes: {
        type: String
    },
    type: {
        type: String
    },
    totalseasons: {
        type: String
    },

    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],

    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },

        date: {
            type: Date,
            default: Date.now
        }
    }],

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Series = mongoose.model("Series", SeriesSchema);