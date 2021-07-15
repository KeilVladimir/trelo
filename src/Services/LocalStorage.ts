class LocalStorage {
  static keyColumn = 'nameBoard';
  static keyAuthor = 'AuthorName';
  static setInLocal(key: string, state: string) {
    localStorage.setItem(key, state);
  }
  static getFromLocal(key: string) {
    return localStorage.getItem(key);
  }
}
export default LocalStorage;
