import React, { createContext, useReducer } from "react";
import { Card } from "../types";

type CardState = {
  cards: Card[];
  showAddCardForm: {
    visible: boolean;
    columnId?: string;
  };
};

type CardAction =
  | { type: "ADD_CARD"; payload: Card }
  | { type: "DELETE_CARD"; payload: string }
  | { type: "EDIT_CARD"; payload: Card }
  | { type: "DRAG_CARD"; payload: { source: string; destination: string } }
  | { type: "SHOW_ADD_CARD_FORM"; payload: { visible: boolean; columnId?: string } };

type CardContextValue = {
  state: CardState;
  dispatch: React.Dispatch<CardAction>;
};

export const defaultState = {
  cards: [],
  showAddCardForm: {
    visible: false,
  },
};

export const CardContext = createContext<CardContextValue | undefined>(
  undefined
);

const cardReducer = (state: CardState, action: CardAction) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { payload: card } = action;
      return {
        ...state,
        cards: [...state.cards, card],
      };
    }
    case "DELETE_CARD": {
      const { payload: id } = action;
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== id),
      };
    }
    case "EDIT_CARD": {
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
    }
    case "DRAG_CARD": {
      const { source, destination } = action.payload;
      const sourceIndex = state.cards.findIndex((card) => card.id === source);
      const destinationIndex = state.cards.findIndex(
        (card) => card.id === destination
      );
      const [card] = state.cards.splice(sourceIndex, 1);
      state.cards.splice(destinationIndex, 0, card);
      return {
        ...state,
        cards: [...state.cards],
      };
    }
    case "SHOW_ADD_CARD_FORM": {
      const { visible, columnId } = action.payload;
      return {
        ...state,
        showAddCardForm: {
          visible,
          columnId,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const CardProvider: React.FC<{
  children: React.ReactNode;
  initialState: any;
}> = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};

const useCardContext = (): CardContextValue => {
  const context = React.useContext(CardContext);

  if (!context) {
    throw new Error("useColumnContext must be used within a ColumnProvider");
  }

  return context;
};

export { CardProvider, useCardContext };
