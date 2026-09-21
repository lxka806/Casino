import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import History from "./pages/History";
import Leaderboard from "./pages/Leaderboard";

import Dice from "./pages/Dice";
import Roulette from "./pages/Roulette";
import Blackjack from "./pages/Blackjack";
import Slots from "./pages/Slots";

import NavBar from "./components/NavBar";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/games" element={<Games />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/games/dice" element={<Dice />} />
                <Route path="/games/roulette" element={<Roulette />} />
                <Route path="/games/blackjack" element={<Blackjack />} />
                <Route path="/games/slots" element={<Slots />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;