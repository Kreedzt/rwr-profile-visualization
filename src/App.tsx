// SPDX-License-Identifier: GPL-3.0-only
import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { VERSION } from "./constants";
import RefreshArea from "./pages/refreshArea/RefreshArea";
import XP from "./pages/xp/XP";
import TimePlayed from "./pages/timePlayed/TimePlayed";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>RWR存档数据可视化</h1>
      </header>
      <main>
        <RefreshArea />
        <XP />
        <TimePlayed />
      </main>
      <footer>RWR 存档数据可视化, 版本: v {VERSION}</footer>
    </div>
  );
}

export default App;
