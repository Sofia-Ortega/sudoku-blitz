import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import DailyChallenge from "./routes/DailyChallenge";
import Practice from "./routes/Practice";
import BattleRoyale from "./routes/BattleRoyale";
import Setting from "./routes/Setting";
import Layout from "./Layout";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter basename="/sudoku-blitz">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DailyChallenge />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/battle-royale" element={<BattleRoyale />} />
            <Route path="/settings" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
