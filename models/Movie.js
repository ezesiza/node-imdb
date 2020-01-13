const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema to retrieve by Movies

const MovieSchema = new Schema({
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

    imdbID: {
        type: String
    },
    type: {
        type: String
    },
    poster: {
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

module.exports = Movie = mongoose.model("Movie", MovieSchema);