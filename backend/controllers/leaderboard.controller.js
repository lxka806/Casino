const User = require("../models/Auth");

const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({})
            .select("username credits wins gamesPlayed")
            .sort({
                credits: -1,
                wins: -1,
            })
            .limit(20);

        return res.status(200).json({
            leaderboard: users,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getLeaderboard,
};