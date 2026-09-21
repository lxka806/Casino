const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        // Role
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        // Virtual casino credits
        credits: {
            type: Number,
            default: 10000,
        },

        // Game statistics
        gamesPlayed: {
            type: Number,
            default: 0,
        },

        wins: {
            type: Number,
            default: 0,
        },

        losses: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);