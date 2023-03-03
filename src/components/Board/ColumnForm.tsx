import React, { useState } from "react";
import { useColumnContext } from "../../contexts/ColumnContext";

const ColumnForm = () => {
  const { dispatch } = useColumnContext();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = String(Math.floor(Math.random() * 100000));
    dispatch({ type: "ADD_COLUMN", payload: { id, title } });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter column title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Column</button>
    </form>
  );
};

export default ColumnForm;
