export interface ColumnTypes {
  nameColumns: string;
  id: number;
  cards: Card[];
}
export interface PropsForColumn {
  nameColumns: string;
  id: number;
}
export interface Card {
  name: string;
  about: string;
  id: number;
  author: string;
  comments: Comment[];
  nameColumn: string;
}

export interface Comment {
  author: string;
  body: string;
  id: number;
  cardId: number;
  index: number;
}
export interface InfoCard {
  id: number;
  author: string;
  nameColumn: string;
  index: number;
}
export interface InfoCardAll extends InfoCard {
  open: (state: boolean) => void;
  isOpen: boolean;
  state: ColumnTypes[];
}
