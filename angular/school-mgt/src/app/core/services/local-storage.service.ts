import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(list: { key: string, value: string }[]) {
    list.forEach((l) => {
      localStorage.setItem(l.key, l.value);
    })
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  clearAll() {
    localStorage.clear();
  }


}
