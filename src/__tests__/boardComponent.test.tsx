import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  ColumnProvider
} from "../contexts/ColumnContext";
import Board from "../components/Board";
import {
  CardProvider,
  defaultState as cardDefaultState,
} from "../contexts/CardContext";

describe("Board component", () => {
  const initialTestState = {
    columns: [
      { id: "1", title: "Column 1" },
      { id: "2", title: "Column 2" },
    ],
    showAddColumnForm: false,
  };

  test("renders board component with column", () => {
    render(
      <ColumnProvider initialState={initialTestState}>
        <CardProvider initialState={cardDefaultState}>
          <Board />
        </CardProvider>
      </ColumnProvider>
    );

    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByText("Column 2")).toBeInTheDocument();
  });

  test("adds a new column", () => {
    render(
      <ColumnProvider initialState={initialTestState}>
        <CardProvider initialState={cardDefaultState}>
          <Board />
        </CardProvider>
      </ColumnProvider>
    );

    // Verify that there are two columns initially
    expect(screen.queryAllByTestId(/column-/)).toHaveLength(2);

    // Click the "Add column" button to show the form
    const addButton = screen.getByText("Add column");
    fireEvent.click(addButton);

    // Verify that the Add Column Form is displayed
    expect(
      screen.getByPlaceholderText("Enter column title...")
    ).toBeInTheDocument();

    // Fill in the form and submit
    const input = screen.getByPlaceholderText("Enter column title...");
    fireEvent.change(input, { target: { value: "New Column" } });

    const submitButton = screen.getByText("Add Column");
    fireEvent.click(submitButton);

    // Verify that the new column is added
    expect(screen.queryAllByTestId(/column-/)).toHaveLength(3);
    expect(screen.getByText("New Column")).toBeInTheDocument();
  });

  test("does not add a new column with empty title", () => {
    render(
      <ColumnProvider initialState={initialTestState}>
        <CardProvider initialState={cardDefaultState}>
          <Board />
        </CardProvider>
      </ColumnProvider>
    );

    // Verify there is 2 columns rendered initially.
    expect(screen.queryAllByTestId(/column-/)).toHaveLength(2);

    const addButton = screen.getByText("Add column");
    fireEvent.click(addButton);

    // Click the button without inputting title
    const submitButton = screen.getByText("Add Column");
    fireEvent.click(submitButton);

    // There should be still two columns left
    expect(screen.queryAllByTestId(/column-/)).toHaveLength(2);
  });

  test("deletes a column", () => {
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
    expect(screen.getByText("Column 2")).toBeInTheDocument();
  });

  test("edits a column", () => {
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

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(screen.getByText("Edited Column")).toBeInTheDocument();
  });
});
