import React from "react";
import Main from "./components/Main";

import logo from "./assets/tempo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row m-0">
          <img alt="Tempo Software Montreal logo" className="logo" src={logo} />
        </div>
      </header>
      <Main />
    </div>
  );
}

export default App;
