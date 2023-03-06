import React, { useState } from "react";
import styles from "./styles.module.css";

interface AddCardFormProps {
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }

    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form className={styles.addCardForm} onSubmit={handleSubmit}>
      <input
        className={styles.addCardFormInput}
        type="text"
        name="title"
        placeholder="Enter card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={styles.addCardFormInput}
        type="text"
        name="description"
        placeholder="Enter card description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.addCardFormBtnWrapper}>
        <button className={styles.addCardFormSubmitBtn} type="submit">
          Add
        </button>
        <button
          className={styles.addCardFormCancelBtn}
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddCardForm;
