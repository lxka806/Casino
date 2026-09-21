const User = require("../models/Auth");
const GameHistory = require("../models/GameHistory");

// =========================
// DICE
// =========================
const getHistory = async (req, res) => {
    try {
        const { game, result, minBet, maxBet, startDate, endDate, limit } = req.query;

        const validGames = ["dice", "roulette", "blackjack", "slots"];
        const validResults = ["win", "loss"];

        if (game && !validGames.includes(game)) {
            return res.status(400).json({
                message: "Invalid game filter. Use dice, roulette, blackjack, or slots.",
            });
        }

        if (result && !validResults.includes(result)) {
            return res.status(400).json({
                message: "Invalid result filter. Use win or loss.",
            });
        }

        const filters = { user: req.user._id };

        if (game) {
            filters.game = game;
        }

        if (result) {
            filters.result = result;
        }

        if (minBet !== undefined || maxBet !== undefined) {
            filters.betAmount = {};

            if (minBet !== undefined) {
                const min = Number(minBet);

                if (!Number.isFinite(min) || min < 0) {
                    return res.status(400).json({
                        message: "Minimum bet must be a valid number.",
                    });
                }

                filters.betAmount.$gte = min;
            }

            if (maxBet !== undefined) {
                const max = Number(maxBet);

                if (!Number.isFinite(max) || max < 0) {
                    return res.status(400).json({
                        message: "Maximum bet must be a valid number.",
                    });
                }

                filters.betAmount.$lte = max;
            }
        }

        if (startDate || endDate) {
            filters.createdAt = {};

            if (startDate) {
                const start = new Date(startDate);

                if (Number.isNaN(start.getTime())) {
                    return res.status(400).json({
                        message: "startDate must be a valid date.",
                    });
                }

                filters.createdAt.$gte = start;
            }

            if (endDate) {
                const end = new Date(endDate);

                if (Number.isNaN(end.getTime())) {
                    return res.status(400).json({
                        message: "endDate must be a valid date.",
                    });
                }

                filters.createdAt.$lte = end;
            }
        }

        let query = GameHistory.find(filters).sort({ createdAt: -1 });

        if (limit !== undefined) {
            const parsedLimit = Number(limit);

            if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
                return res.status(400).json({
                    message: "Limit must be a positive integer.",
                });
            }

            query = query.limit(parsedLimit);
        }

        const history = await query;

        return res.status(200).json({
            count: history.length,
            history,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const playDice = async (req, res) => {
    try {
        const { betAmount, chosenNumber } = req.body;

        // Check inputs
        if (!betAmount || !chosenNumber) {
            return res.status(400).json({
                message: "Bet amount and chosen number are required.",
            });
        }

        // Validate numbers
        if (chosenNumber < 1 || chosenNumber > 6) {
            return res.status(400).json({
                message: "Chosen number must be between 1 and 6.",
            });
        }

        if (betAmount <= 0) {
            return res.status(400).json({
                message: "Bet amount must be greater than 0.",
            });
        }

        // Find user
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // Check credits
        if (user.credits < betAmount) {
            return res.status(400).json({
                message: "Not enough credits.",
            });
        }

        const creditsBefore = user.credits;

        // Generate dice result
        const diceResult = Math.floor(Math.random() * 6) + 1;

        let amountWon = 0;
        let result;

        // Win
        if (diceResult === Number(chosenNumber)) {
            amountWon = betAmount * 5;

            user.credits += amountWon;
            user.wins += 1;

            result = "win";
        }

        // Lose
        else {
            user.credits -= betAmount * 1.5;
            user.losses += 1;

            result = "loss";
        }

        // Increase games played
        user.gamesPlayed += 1;

        // Save user
        await user.save();

        // Save game history
        const game = await GameHistory.create({
            user: user._id,
            game: "dice",
            betAmount,
            result,
            amountWon,
            creditsBefore,
            creditsAfter: user.credits,
        });

        return res.status(200).json({
            message: result === "win"
                ? "You won!"
                : "You lost!",

            game: {
                id: game._id,
                diceResult,
                chosenNumber,
                betAmount,
                result,
                amountWon,
            },

            user: {
                credits: user.credits,
                gamesPlayed: user.gamesPlayed,
                wins: user.wins,
                losses: user.losses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const playRoulette = async (req, res) => {
    try {
        const { betAmount, chosenNumber } = req.body;

        // Check inputs
        if (betAmount === undefined || chosenNumber === undefined) {
            return res.status(400).json({
                message: "Bet amount and chosen number are required.",
            });
        }

        // Convert to numbers
        const bet = Number(betAmount);
        const number = Number(chosenNumber);

        // Validate bet
        if (!Number.isInteger(bet) || bet <= 0) {
            return res.status(400).json({
                message: "Bet amount must be a positive whole number.",
            });
        }

        // Validate roulette number
        if (!Number.isInteger(number) || number < 0 || number > 36) {
            return res.status(400).json({
                message: "Roulette number must be between 0 and 36.",
            });
        }

        // Find user
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // Check credits
        if (user.credits < bet) {
            return res.status(400).json({
                message: "Not enough credits.",
            });
        }

        const creditsBefore = user.credits;

        // Generate roulette result
        const rouletteResult = Math.floor(Math.random() * 37);

        let result;
        let amountWon = 0;

        // Win
        if (rouletteResult === number) {
            amountWon = bet * 35;

            user.credits += amountWon;
            user.wins += 1;

            result = "win";
        }

        // Lose
        else {
            user.credits -= bet;
            user.losses += 1;

            result = "loss";
        }

        user.gamesPlayed += 1;

        // Save user
        await user.save();

        // Save game history
        const game = await GameHistory.create({
            user: user._id,
            game: "roulette",
            betAmount: bet,
            result,
            amountWon,
            creditsBefore,
            creditsAfter: user.credits,
        });

        return res.status(200).json({
            message: result === "win"
                ? "You won!"
                : "You lost!",

            game: {
                id: game._id,
                rouletteResult,
                chosenNumber: number,
                betAmount: bet,
                result,
                amountWon,
            },

            user: {
                credits: user.credits,
                gamesPlayed: user.gamesPlayed,
                wins: user.wins,
                losses: user.losses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const playBlackjack = async (req, res) => {
    try {
        const { betAmount } = req.body;

        const bet = Number(betAmount);

        if (!Number.isInteger(bet) || bet <= 0) {
            return res.status(400).json({
                message: "Bet amount must be a positive whole number.",
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        if (user.credits < bet) {
            return res.status(400).json({
                message: "Not enough credits.",
            });
        }

        const createDeck = () => {
            const suits = ["hearts", "diamonds", "clubs", "spades"];
            const ranks = [
                "2", "3", "4", "5", "6", "7", "8", "9", "10",
                "J", "Q", "K", "A"
            ];

            const deck = [];

            for (const suit of suits) {
                for (const rank of ranks) {
                    deck.push({ rank, suit });
                }
            }

            return deck;
        };

        const shuffleDeck = (deck) => {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                [deck[i], deck[j]] = [deck[j], deck[i]];
            }

            return deck;
        };

        const getCardValue = (card) => {
            if (["J", "Q", "K"].includes(card.rank)) {
                return 10;
            }

            if (card.rank === "A") {
                return 11;
            }

            return Number(card.rank);
        };

        const calculateHandValue = (hand) => {
            let value = 0;
            let aces = 0;

            for (const card of hand) {
                value += getCardValue(card);

                if (card.rank === "A") {
                    aces++;
                }
            }

            while (value > 21 && aces > 0) {
                value -= 10;
                aces--;
            }

            return value;
        };

        const deck = shuffleDeck(createDeck());

        const playerHand = [
            deck.pop(),
            deck.pop(),
        ];

        const dealerHand = [
            deck.pop(),
            deck.pop(),
        ];

        const playerValue = calculateHandValue(playerHand);
        const dealerValue = calculateHandValue(dealerHand);

        let result;
        let amountWon = 0;

        if (playerValue === 21 && dealerValue === 21) {
            result = "loss";
            amountWon = 0;
        } else if (playerValue === 21) {
            result = "win";
            amountWon = bet * 2;
        } else if (dealerValue === 21) {
            result = "loss";
            amountWon = 0;
        } else if (playerValue > 21) {
            result = "loss";
            amountWon = 0;
        } else if (dealerValue > 21) {
            result = "win";
            amountWon = bet * 2;
        } else if (playerValue > dealerValue) {
            result = "win";
            amountWon = bet * 2;
        } else if (playerValue < dealerValue) {
            result = "loss";
            amountWon = 0;
        } else {
            result = "loss";
            amountWon = 0;
        }

        const creditsBefore = user.credits;

        if (result === "win") {
            user.credits += amountWon;
            user.wins += 1;
        } else {
            user.credits -= bet;
            user.losses += 1;
        }

        user.gamesPlayed += 1;

        await user.save();

        const game = await GameHistory.create({
            user: user._id,
            game: "blackjack",
            betAmount: bet,
            result,
            amountWon,
            creditsBefore,
            creditsAfter: user.credits,
        });

        return res.status(200).json({
            message: result === "win" ? "You won!" : "You lost!",
            game: {
                id: game._id,
                playerHand,
                dealerHand,
                playerValue,
                dealerValue,
                betAmount: bet,
                result,
                amountWon,
            },
            user: {
                credits: user.credits,
                gamesPlayed: user.gamesPlayed,
                wins: user.wins,
                losses: user.losses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const playSlots = async (req, res) => {
    try {
        const { betAmount } = req.body;

        const bet = Number(betAmount);

        if (!Number.isInteger(bet) || bet <= 0) {
            return res.status(400).json({
                message: "Bet amount must be a positive whole number.",
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        if (user.credits < bet) {
            return res.status(400).json({
                message: "Not enough credits.",
            });
        }

        const symbols = [
            "cherry",
            "lemon",
            "orange",
            "bell",
            "star",
            "seven",
        ];

        const spin = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
        ];

        let result = "loss";
        let amountWon = 0;

        // Three 7s = 10x
        if (
            spin[0] === "seven" &&
            spin[1] === "seven" &&
            spin[2] === "seven"
        ) {
            result = "win";
            amountWon = bet * 10;
        }

        // Any three identical symbols = 5x
        else if (
            spin[0] === spin[1] &&
            spin[1] === spin[2]
        ) {
            result = "win";
            amountWon = bet * 5;
        }

        // Two identical symbols = 2x
        else if (
            spin[0] === spin[1] ||
            spin[1] === spin[2] ||
            spin[0] === spin[2]
        ) {
            result = "win";
            amountWon = bet * 2;
        }

        const creditsBefore = user.credits;

        if (result === "win") {
            user.credits += amountWon;
            user.wins += 1;
        } else {
            user.credits -= bet;
            user.losses += 1;
        }

        user.gamesPlayed += 1;

        await user.save();

        const game = await GameHistory.create({
            user: user._id,
            game: "slots",
            betAmount: bet,
            result,
            amountWon,
            creditsBefore,
            creditsAfter: user.credits,
        });

        return res.status(200).json({
            message: result === "win" ? "You won!" : "You lost!",
            game: {
                id: game._id,
                spin,
                betAmount: bet,
                result,
                amountWon,
            },
            user: {
                credits: user.credits,
                gamesPlayed: user.gamesPlayed,
                wins: user.wins,
                losses: user.losses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getHistory,
    playDice,
    playRoulette,
    playBlackjack,
    playSlots
};