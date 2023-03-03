import React from "react";
import Board from "./components/Board";
import { ColumnProvider } from "./contexts/ColumnContext";

function App() {
  return (
    <ColumnProvider>
      <Board />
    </ColumnProvider>
  );
}

export default App;
