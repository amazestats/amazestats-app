import { Injectable } from '@angular/core';
import { Division } from './division';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private divisions = [
    new Division("Division 1"),
    new Division("Division 2"),
  ]

  constructor() { }

  getDivisions(): Promise<Division[]> {
    return Promise.resolve(this.divisions)
  }

  getDivision(key: string): Promise<Division> {
    const division = this.divisions.find(division => division.name === key)

    if (division == null) return Promise.reject()
    return Promise.resolve(division)
  }
}
