import React from "react";
import Column from "../Column";
import { useColumnContext } from "../../contexts/ColumnContext";
import styles from "./styles.module.css";
import AddColumnForm from "./AddColumnForm";
import AddColumnButton from "./AddColumnButton";

const Board: React.FC = () => {
  const { state, dispatch } = useColumnContext();

  const handleAddColumn = (title: string) => {
    if (title.trim() === "") {
      // If the title is empty, do nothing
      return;
    }
    
    dispatch({
      type: "ADD_COLUMN",
      payload: { id: Date.now().toString(), title },
    });
    dispatch({ type: "SHOW_ADD_COLUMN_FORM", payload: false });
  };

  const handleClose = () => {
    dispatch({ type: "SHOW_ADD_COLUMN_FORM", payload: false });
  };

  return (
    <div className={styles.board}>
      <div className={styles.columnsWrapper}>
        {state.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onEdit={(editedColumn) =>
              dispatch({ type: "EDIT_COLUMN", payload: editedColumn })
            }
            onDelete={(columnId) =>
              dispatch({ type: "DELETE_COLUMN", payload: columnId })
            }
          />
        ))}
        {state.showAddColumnForm ? (
          <AddColumnForm onSubmit={handleAddColumn} onClose={handleClose} />
        ) : (
          <div className={styles.addColumnButtonWrapper}>
            <AddColumnButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
