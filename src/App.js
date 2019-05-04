import React from "react";
import Main from "./components/Main";

import logo from "./assets/tempo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="row m-0">
          <img className="logo" src={logo} />
        </div>
      </header>
      <Main />
    </div>
  );
}

export default App;
