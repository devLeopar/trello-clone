import React from "react";
import { useColumnContext } from "../../contexts/ColumnContext";
import Column from "../Column";
import ColumnForm from "./ColumnForm";
import styles from "./styles.module.css"

const Board = () => {
  const { state } = useColumnContext();

  return (
    <div className={styles.board}>
      <h2>Columns</h2>
      <ColumnForm />
      {state.columns.map((column) => (
        <Column key={column.id} {...column} />
      ))}
    </div>
  );
};

export default Board;
