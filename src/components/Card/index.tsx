import React from 'react';
import styles from './styles.module.css';

interface Props {
  title: string;
  description: string;
}

const Card: React.FC<Props> = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;