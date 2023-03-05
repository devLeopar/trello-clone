import React, { useState } from "react";
import Card from "../Card";
import { ColumnData } from "../../types";
import styles from "./styles.module.css";

type ColumnProps = {
  column: ColumnData;
  onDelete: (columnId: string) => void;
  onEdit: (column: ColumnData) => void;
};

const Column: React.FC<ColumnProps> = ({ column, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(column.title);

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
    <div className={styles.column}>
      {isEditing ? (
        <>
          <div className={styles.editPaneWrapper}>
            <input
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
              <span className={styles.editButton} onClick={handleEdit}>
                Edit
              </span>
              <span className={styles.deleteButton} onClick={handleDelete}>
                Delete
              </span>
            </div>
          </div>
          <div className={styles.cardList}>
            <Card title="Default Card" description="This is a default card." />
            <Card
              title="Default Card 2"
              description="This is a default card 2."
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Column;
