import React, { useState } from "react";
import Card from "../Card";
import { ColumnData } from "../../types";
import styles from "./styles.module.css";
import { useCardContext } from "../../contexts/CardContext";
import AddCardForm from "./AddCardForm";
import AddCardButton from "./AddCardButton";

type ColumnProps = {
  column: ColumnData;
  onDelete: (columnId: string) => void;
  onEdit: (column: ColumnData) => void;
};

const Column: React.FC<ColumnProps> = ({ column, onDelete, onEdit }) => {
  const { state, dispatch } = useCardContext();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(column.title);

  const handleAddCard = (title: string, description: string) => {
    if (title.trim() === "") {
      // If the title is empty, do nothing
      return;
    }

    dispatch({
      type: "ADD_CARD",
      payload: {
        id: Date.now().toString(),
        columnId: column.id,
        title,
        description,
      },
    });
    dispatch({
      type: "SHOW_ADD_CARD_FORM",
      payload: { visible: false, columnId: column.id },
    });
  };

  const handleClose = () => {
    dispatch({
      type: "SHOW_ADD_CARD_FORM",
      payload: { visible: false, columnId: column.id },
    });
  };

  const handleDelete = () => {
    onDelete(column.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit({ ...column, title });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(column.title);
    setIsEditing(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div data-testid={`column-${column.id}`} className={styles.column}>
      {isEditing ? (
        <>
          <div className={styles.editPaneWrapper}>
            <input
              data-testid={`editInput-${column.id}`}
              type="text"
              value={title}
              onChange={handleTitleChange}
              className={styles.titleInput}
            />
            <div className={styles.editPaneButtons}>
              <button onClick={handleSave} className={styles.saveButton}>
                Save
              </button>
              <button onClick={handleCancel} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <h3 className={styles.title}>{column.title}</h3>
            <div>
              <span
                data-testid={`edit-button-${column.id}`}
                className={styles.editButton}
                onClick={handleEdit}
              >
                Edit
              </span>
              <span
                data-testid={`delete-button-${column.id}`}
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                Delete
              </span>
            </div>
          </div>
          <div className={styles.cardList}>
            {state.cards
              .filter((card) => card.columnId === column.id)
              .map((card) => (
                <Card
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  columnId={column.id}
                  cardId={card.id}
                  onEdit={(editedCard) =>
                    dispatch({
                      type: "EDIT_CARD",
                      payload: {
                        id: card.id,
                        columnId: column.id,
                        ...editedCard,
                      },
                    })
                  }
                  onDelete={(cardId) =>
                    dispatch({ type: "DELETE_CARD", payload: cardId })
                  }
                />
              ))}
            {state.showAddCardForm.columnId === column.id &&
            state.showAddCardForm.visible ? (
              <AddCardForm onSubmit={handleAddCard} onClose={handleClose} />
            ) : (
              <div className={styles.addColumnButtonWrapper}>
                <AddCardButton columnId={column.id} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Column;
