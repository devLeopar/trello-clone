import React from "react";
import Board from "./components/Board";
import { ColumnProvider, defaultState } from "./contexts/ColumnContext";

function App() {
  return (
    <ColumnProvider initialState={defaultState}>
      <Board />
    </ColumnProvider>
  );
}

export default App;
