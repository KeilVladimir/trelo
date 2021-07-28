import {ColumnTypes , Card , Comment , } from "../types";

class LocalStorage {
  private keyColumn = 'Board';
  private keyAuthor = 'Author';
  private keyCard = 'Card';
  private keyComment = 'Comment';
  getAuthor() {
    return localStorage.getItem(this.keyAuthor) || '';
  }

  getColumn() {
    return JSON.parse(localStorage.getItem(this.keyColumn) || '[]');
  }
  getCard() {
    return JSON.parse(localStorage.getItem(this.keyCard) || '[]');
  }
  getComment() {
    return JSON.parse(localStorage.getItem(this.keyComment) || '[]');
  }
  setAuthor(state: string) {
    localStorage.setItem(this.keyAuthor, state);
  }

  setColumn(state:ColumnTypes[]) {
    localStorage.setItem(this.keyColumn, JSON.stringify(state));
  }
  setCard(state:Card[]){
    localStorage.setItem(this.keyCard, JSON.stringify(state));
  }
  setComment(state:Comment[]){
    localStorage.setItem(this.keyComment, JSON.stringify(state));
  }
}

export const Local = new LocalStorage();
