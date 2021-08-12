export interface ColumnTypes {
  nameColumns: string;
  id: number;
}

interface PropsForColumn {
  nameColumns: string;
  id: number;
}

export interface Column {
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
  saveCard: (newCard: RefactorCard) => void;
  setChangeableCard: (card?: Card) => void;
  addComment: (body: string, cardId: number) => void;
}
export interface RefactorCard {
  name: string;
  id: number;
  about: string;
}
