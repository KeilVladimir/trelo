class LocalStorage {
  private keyColumn = 'nameBoard';
  private keyAuthor = 'AuthorName';

  getAuthor() {
    return localStorage.getItem(this.keyAuthor);
  }

  getColumn() {
    return JSON.parse(localStorage.getItem(this.keyColumn) || '[]');
  }

  setAuthor(state: string) {
    localStorage.setItem(this.keyAuthor, state);
  }

  setColumn(state) {
    localStorage.setItem(this.keyColumn, JSON.stringify(state));
  }
}

export const Local = new LocalStorage();
