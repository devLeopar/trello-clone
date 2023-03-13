import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { ColumnProvider } from "../contexts/ColumnContext";
import {
  CardProvider,
  defaultState as cardDefaultState,
} from "../contexts/CardContext";
import Board from "../components/Board";

describe("<Column />", () => {
  const initialTestState = {
    columns: [
      { id: "1", title: "Column 1" },
      { id: "2", title: "Column 2" },
    ],
    showAddColumnForm: false,
  };

  test("renders column component with title and buttons", () => {
    render(
      <ColumnProvider initialState={initialTestState}>
        <CardProvider initialState={cardDefaultState}>
          <Board />
        </CardProvider>
      </ColumnProvider>
    );
    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByTestId("edit-button-1")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button-1")).toBeInTheDocument();
  });

  test("clicking delete button deletes corresponding column", () => {
    render(
      <ColumnProvider initialState={initialTestState}>
        <CardProvider initialState={cardDefaultState}>
          <Board />
        </CardProvider>
      </ColumnProvider>
    );
    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);
    expect(screen.queryByText("Column 1")).not.toBeInTheDocument();
  });

  test("clicking edit button changes title to input field", () => {
    render(
      <ColumnProvider initialState={initialTestState}>
        <CardProvider initialState={cardDefaultState}>
          <Board />
        </CardProvider>
      </ColumnProvider>
    );
    const editButton = screen.getByTestId("edit-button-1");
    fireEvent.click(editButton);
    expect(screen.getByTestId(/editInput-1/)).toBeInTheDocument();
    expect(screen.getByText(/Save/)).toBeInTheDocument();
  });

  test("clicking save button save corresponding column title", () => {
    render(
      <ColumnProvider initialState={initialTestState}>
        <CardProvider initialState={cardDefaultState}>
          <Board />
        </CardProvider>
      </ColumnProvider>
    );
    debugger;
    const editButton = screen.getByTestId("edit-button-1");
    fireEvent.click(editButton);
    const input = screen.getByTestId("editInput-1");
    fireEvent.change(input, { target: { value: "Edited Column" } });
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(screen.getByText("Edited Column")).toBeInTheDocument();
  });

  test("clicking cancel button restores original column title", () => {
    render(
      <ColumnProvider initialState={initialTestState}>
        <CardProvider initialState={cardDefaultState}>
          <Board />
        </CardProvider>
      </ColumnProvider>
    );
    const editButton = screen.getByTestId("edit-button-1");
    fireEvent.click(editButton);
    const input = screen.getByTestId("editInput-1");
    fireEvent.change(input, { target: { value: "Edited Column" } });
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(screen.getByText("Column 1")).toBeInTheDocument();
  });
});
