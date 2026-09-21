const express = require("express")
const authRouter = express.Router()
const {
    protect
} = require("../middleware/auth.middleware")

const {
    register,
    login,
    logout,
    profile,
} = require("../controllers/auth.controller")

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/profile", protect, profile)

module.exports = authRouter