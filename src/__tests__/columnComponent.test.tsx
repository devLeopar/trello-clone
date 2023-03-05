import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { ColumnData } from "../types";
import Column from "../components/Column";

const column: ColumnData = {
  id: "1",
  title: "Column 1",
};

const onDelete = jest.fn();
const onEdit = jest.fn();

describe("<Column />", () => {
  beforeEach(() => {
    onDelete.mockClear();
    onEdit.mockClear();
  });

  test("renders column component with title and buttons", () => {
    render(<Column column={column} onDelete={onDelete} onEdit={onEdit} />);
    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByTestId("edit-button-1")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button-1")).toBeInTheDocument();
  });

  test("clicking delete button calls onDelete prop with column id", () => {
    render(<Column column={column} onDelete={onDelete} onEdit={onEdit} />);
    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  test("clicking edit button changes title to input field", () => {
    render(<Column column={column} onDelete={onDelete} onEdit={onEdit} />);
    const editButton = screen.getByTestId("edit-button-1");
    fireEvent.click(editButton);
    expect(screen.getByTestId(/editInput-1/)).toBeInTheDocument();
    expect(screen.getByText(/Save/)).toBeInTheDocument();
  });

  test("clicking save button calls onEdit prop with new column title", () => {
    render(<Column column={column} onDelete={onDelete} onEdit={onEdit} />);
    debugger;
    const editButton = screen.getByTestId("edit-button-1");
    fireEvent.click(editButton);
    const input = screen.getByTestId("editInput-1");
    fireEvent.change(input, { target: { value: "Edited Column" } });
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(onEdit).toHaveBeenCalledWith({
      id: "1",
      title: "Edited Column",
    });
  });

  test("clicking cancel button restores original column title", () => {
    render(<Column column={column} onDelete={onDelete} onEdit={onEdit} />);
    const editButton = screen.getByTestId("edit-button-1");
    fireEvent.click(editButton);
    const input = screen.getByTestId("editInput-1");
    fireEvent.change(input, { target: { value: "Edited Column" } });
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(screen.getByText("Column 1")).toBeInTheDocument();
  });
});
