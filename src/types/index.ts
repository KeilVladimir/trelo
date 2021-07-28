
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
export interface CardAll extends Card {
  deleteCard: (id: number) => void;
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
  about: string;
  name: string;
}
export interface InfoCardAll extends InfoCard {
  open: (state: boolean) => void;
  comments: Comment[];
  isOpen: boolean;
  nameColumns: string;
  renameCard: (newName: string, id: number) => void;
  addDescription: (newDescription: string, id: number) => void;
  deleteDescription: (id: number) => void;
  addComment: (body: string, cardId: number) => void;
}
