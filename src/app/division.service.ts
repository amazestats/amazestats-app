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
}
