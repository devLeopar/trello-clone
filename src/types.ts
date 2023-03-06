export type Card = {
  id: string;
  columnId: string;
  title: string;
  description: string;
};

export type ColumnData = {
  id: string;
  title: string;
  cards?: Card[];
};
