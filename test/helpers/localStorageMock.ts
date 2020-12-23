type StoreType = {
  [name: string]: string;
};

export class LocalStorageMock {
  store: StoreType = {};

  constructor() {}

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}