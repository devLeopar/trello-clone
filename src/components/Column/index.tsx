import React from "react";
import { useColumnContext } from "../../contexts/ColumnContext";
import styles from "./styles.module.css"

const Column = ({ id, title }: { id: string; title: string }) => {
  const { dispatch } = useColumnContext();

  const handleDelete = () => {
    dispatch({ type: "DELETE_COLUMN", payload: id });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EDIT_COLUMN", payload: { id, title: e.target.value } });
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={handleTitleChange}
        />
        <button onClick={handleDelete}>X</button>
      </div>
      <div className={styles.columnContent}></div>
    </div>
  );
};

export default Column;