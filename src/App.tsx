import React from "react";
import Board from "./components/Board";
import {
  ColumnProvider,
  defaultState as columnDefaultState,
} from "./contexts/ColumnContext";
import {
  CardProvider,
  defaultState as cardDefaultState,
} from "./contexts/CardContext";

function App() {
  return (
    <ColumnProvider initialState={columnDefaultState}>
      <CardProvider initialState={cardDefaultState}>
        <Board />
      </CardProvider>
    </ColumnProvider>
  );
}

export default App;
