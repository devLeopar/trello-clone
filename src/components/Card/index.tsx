import React, { useState } from "react";
import styles from "./styles.module.css";

interface Props {
  title: string;
  description: string;
  columnId: string;
  cardId: string;
  onEdit: (updatedCard: { title: string; description: string }) => void;
  onDelete: (cardId: string) => void;
}

const Card: React.FC<Props> = ({
  title,
  description,
  columnId,
  cardId,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>(title);
  const [cardDescription, setCardDescription] = useState<string>(description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit({ title: cardTitle, description: cardDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCardTitle(title);
    setCardDescription(description);
    setIsEditing(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCardDescription(event.target.value);
  };

  const handleDelete = () => {
    onDelete(cardId);
  };

  return (
    <div data-testid={`card-${columnId}`} className={styles.card}>
      {isEditing ? (
        <div className={styles.editPaneWrapper}>
          <input
            data-testid={`editInput-title-${columnId}`}
            type="text"
            value={cardTitle}
            onChange={handleTitleChange}
            className={styles.titleInput}
          />
          <textarea
            data-testid={`editInput-description-${columnId}`}
            value={cardDescription}
            onChange={handleDescriptionChange}
            className={styles.descriptionInput}
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
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className={styles.buttons}>
            <span className={styles.editButton} onClick={handleEdit}>
              Edit
            </span>
            <span className={styles.deleteButton} onClick={handleDelete}>
              Delete
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
