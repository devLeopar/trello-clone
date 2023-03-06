import React, { createContext, useReducer } from "react";
import { Card } from "../types";

export type CardAction =
  | { type: "ADD_CARD"; payload: { card: Card; columnId: string } }
  | {
      type: "DRAG_CARD";
      payload: {
        cardId: string;
        sourceColumnId: string;
        destinationColumnId: string;
      };
    }
  | { type: "EDIT_CARD"; payload: { card: Card; columnId: string } }
  | { type: "DELETE_CARD"; payload: { cardId: string; columnId: string } };

export type CardState = {
  [columnId: string]: Card[];
};

export type CardContextValue = {
  state: CardState;
  dispatch: React.Dispatch<CardAction>;
};

export const defaultState: CardState = {};

export const CardContext = createContext<CardContextValue | undefined>(
  undefined
);

export const cardReducer = (
  state: CardState,
  action: CardAction
): CardState => {
  switch (action.type) {
    case "ADD_CARD": {
      const { card, columnId } = action.payload;
      return {
        ...state,
        [columnId]: [...(state[columnId] || []), card],
      };
    }
    case "DRAG_CARD": {
      const { cardId, sourceColumnId, destinationColumnId } = action.payload;
      const sourceCards = state[sourceColumnId];
      const destinationCards = state[destinationColumnId];
      const cardIndex = sourceCards.findIndex((card) => card.id === cardId);
      const card = sourceCards[cardIndex];
      const newSourceCards = [
        ...sourceCards.slice(0, cardIndex),
        ...sourceCards.slice(cardIndex + 1),
      ];
      const newDestinationCards = destinationCards
        ? [...destinationCards, card]
        : [card];
      return {
        ...state,
        [sourceColumnId]: newSourceCards,
        [destinationColumnId]: newDestinationCards,
      };
    }
    case "EDIT_CARD": {
      const { card, columnId } = action.payload;
      const cards = state[columnId] || [];
      const cardIndex = cards.findIndex((c) => c.id === card.id);
      if (cardIndex === -1) {
        throw new Error(
          `Card with id ${card.id} not found in column ${columnId}`
        );
      }
      const newCards = [
        ...cards.slice(0, cardIndex),
        card,
        ...cards.slice(cardIndex + 1),
      ];
      return {
        ...state,
        [columnId]: newCards,
      };
    }
    case "DELETE_CARD": {
      const { cardId, columnId } = action.payload;
      const cards = state[columnId] || [];
      const cardIndex = cards.findIndex((card) => card.id === cardId);
      if (cardIndex === -1) {
        throw new Error(
          `Card with id ${cardId} not found in column ${columnId}`
        );
      }
      const newCards = [
        ...cards.slice(0, cardIndex),
        ...cards.slice(cardIndex + 1),
      ];
      return {
        ...state,
        [columnId]: newCards,
      };
    }
    default:
      return state;
  }
};

const CardProvider: React.FC<{
  children: React.ReactNode;
  initialState: CardState;
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
    throw new Error("useCardContext must be used within a CardProvider");
  }

  return context;
};

export { CardProvider, useCardContext };
