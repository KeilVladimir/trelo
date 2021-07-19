class LocalStorage {
  private keyColumn = 'nameBoard';
  private keyAuthor = 'AuthorName';
  getFromLocalAuthor() {
    return localStorage.getItem(this.keyAuthor);
  }
  getFromLocalColumn() {
    return localStorage.getItem(this.keyColumn);
  }
  setInLocalAuthor(state: string) {
    localStorage.setItem(this.keyAuthor, state);
  }
  setInLocalColumn(state: string) {
    localStorage.setItem(this.keyColumn, state);
  }
}
export const Local = new LocalStorage();
