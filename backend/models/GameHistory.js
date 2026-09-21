const mongoose = require("mongoose")

const gameHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        game: {
            type: String,
            enum: ["dice", "roulette", "blackjack", "slots"],
            required: true,
        },

        betAmount: {
            type: Number,
            required: true,
        },

        result: {
            type: String,
            required: true,
        },

        amountWon: {
            type: Number,
            default: 0,
        },

        creditsBefore: {
            type: Number,
            required: true,
        },

        creditsAfter: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("GameHistory", gameHistorySchema);