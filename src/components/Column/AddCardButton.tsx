import React from "react";
import { useCardContext } from "../../contexts/CardContext";

interface AddCardButtonProps {
  columnId: string;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ columnId }) => {
  const { dispatch } = useCardContext();

  const handleClick = () => {
    dispatch({
      type: "SHOW_ADD_CARD_FORM",
      payload: { visible: true, columnId },
    });
  };

  return <button onClick={handleClick}>Add Card</button>;
};

export default AddCardButton;
