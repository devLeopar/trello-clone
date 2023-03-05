import React from "react";
import { useColumnContext } from "../../contexts/ColumnContext";
import styles from "./styles.module.css";

const AddColumnButton: React.FC = () => {
  const { dispatch } = useColumnContext();

  const handleClick = () => {
    dispatch({ type: "SHOW_ADD_COLUMN_FORM", payload: true });
  };

  return (
    <div className={styles.addColumnButton} onClick={handleClick}>
      <div className={styles.addColumnButtonPlus}>+</div>
      <div className={styles.addColumnButtonText}>Add column</div>
    </div>
  );
};

export default AddColumnButton;
