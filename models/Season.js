const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema. To retrieve by seasons

const SeasonSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    title: {
        type: String,
    },
    seasons: {
        type: String,
    },
    totalseasons: {
        type: String,
    },
    episodes: [{
        title: {
            type: String
        },
        released: {
            type: String
        },
        episodes: {
            type: String
        },
        imdbrating: {
            type: String
        },
        imdbID: {
            type: String
        }
    }],



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

module.exports = Season = mongoose.model("Season", SeasonSchema);