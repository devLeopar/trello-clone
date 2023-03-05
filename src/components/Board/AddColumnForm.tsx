import React, { useState } from "react";
import styles from "./styles.module.css";

interface AddColumnFormProps {
  onClose: () => void;
  onSubmit: (title: string) => void;
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title);
    setTitle("");
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter column title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <button className={styles.submitButton} type="submit">
            Add Column
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddColumnForm;
