import React from 'react';
import { cards } from '../../models/cards';
import Column from '../Column';
import styles from './styles.module.css';

const Board: React.FC = () => {
    return (
      <div className={styles.board}>
        <Column title='Backlog' cards={cards} />
        <Column title='Sprint' cards={cards} />
        <Column title='Done' cards={cards} />
      </div>
    );
  };

export default Board;