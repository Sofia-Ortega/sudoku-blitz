import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainGame from "./MainGame";
import { InputProvider } from "./components/MainGame/InputContext";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header/Header";
import DailyChallenge from "./routes/DailyChallenge";
import Practice from "./routes/Practice";
import BattleRoyal from "./routes/BattleRoyal";
import Setting from "./routes/Setting";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter basename="/sudoku-blitz">
        <Routes>
          <Route path="/" element={<DailyChallenge />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/battle-royal" element={<BattleRoyal />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
