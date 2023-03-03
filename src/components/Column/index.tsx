import React from "react";
import { Card as CardType } from "../../types";
import Card from "../Card";
import styles from "./styles.module.css";

type ColumnProps = {
  title: string;
  cards?: CardType[];
};

const Column: React.FC<ColumnProps> = ({ title, cards = [] }) => {
  return (
    <div className={styles.column}>
      <h3>{title}</h3>
      <div className={styles.cards}>
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
