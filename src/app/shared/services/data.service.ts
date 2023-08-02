import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public stream$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);
}
