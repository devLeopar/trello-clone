import React, { createContext, useReducer } from "react";

type Column = {
  id: string;
  title: string;
};

type ColumnState = {
  columns: Column[];
};

type ColumnAction =
  | { type: "ADD_COLUMN"; payload: Column }
  | { type: "DELETE_COLUMN"; payload: string }
  | { type: "EDIT_COLUMN"; payload: Column };

type ColumnContextValue = {
  state: ColumnState;
  dispatch: React.Dispatch<ColumnAction>;
};

const ColumnContext = createContext<ColumnContextValue | undefined>(undefined);

const columnReducer = (
  state: ColumnState,
  action: ColumnAction
): ColumnState => {
  switch (action.type) {
    case "ADD_COLUMN":
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };
    case "DELETE_COLUMN":
      return {
        ...state,
        columns: state.columns.filter((column) => column.id !== action.payload),
      };
    case "EDIT_COLUMN":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.id ? action.payload : column
        ),
      };
    default:
      return state;
  }
};

const ColumnProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(columnReducer, { columns: [] });

  return (
    <ColumnContext.Provider value={{ state, dispatch }}>
      {children}
    </ColumnContext.Provider>
  );
};

const useColumnContext = (): ColumnContextValue => {
  const context = React.useContext(ColumnContext);

  if (!context) {
    throw new Error("useColumnContext must be used within a ColumnProvider");
  }

  return context;
};

export { ColumnProvider, useColumnContext };