export interface ColumnTypes {
  nameColumns: string;
  id: number;
}

interface PropsForColumn {
  nameColumns: string;
  id: number;
}

export interface Column {
  setCreatedColumn: (state: ColumnTypes[]) => void;
  setCards: (state: Card[]) => void;
  cards: Card[];
  propsForColumn: PropsForColumn;
}

export interface Card {
  name: string;
  about: string;
  id: number;
  idColumn: number;
  author: string;
  nameColumns: string;
}

export interface Test {
  state?: Card;
  setState: (state: Card[]) => void;
}

export interface CardAll extends Card {
  deleteCard: (id: number) => void;
}

export interface Comment {
  author: string;
  body: string;
  id: number;
  cardId: number;
}

export interface InfoCard {
  id: number;
  author: string;
  about: string;
  name: string;
}

export interface InfoCardAll extends InfoCard {
  comments: Comment[];
  nameColumns: string;
  renameCard: (newName: string) => void;
  addDescription: (newDescription: string) => void;
  deleteDescription: () => void;
  addComment: (body: string, cardId: number) => void;
  saveCard: () => void;
}
