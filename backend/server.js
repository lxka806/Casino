const express = require("express")
const dotnev = require("dotenv")
dotnev.config()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRhouter = require("./routers/auth.route")
const gameRouter = require("./routers/game.route")
const userRouters = require("./routers/user.route")

const app = express()

app.use(cors({
    origin: "https://casino-luka.netlify.app",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRhouter)
app.use("/api/game", gameRouter)
app.use("/api/users", userRouters);

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MONGODB is connected")
        app.listen(PORT, ()  => {
            console.log("server is running on Port:", PORT)
        })
    })