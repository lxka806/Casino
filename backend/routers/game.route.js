const express = require("express");

const router = express.Router();

const { playDice, playRoulette, playBlackjack, playSlots, getHistory } = require("../controllers/game.controller");

const { protect } = require("../middleware/auth.middleware");

router.get("/history", protect, getHistory);
router.post("/dice", protect, playDice);
router.post("/roulette", protect, playRoulette);
router.post("/blackjack", protect, playBlackjack)
router.post("/slots", protect, playSlots)

module.exports = router;