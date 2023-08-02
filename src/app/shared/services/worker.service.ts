import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { toData, WebWorker } from '@ng-web-apis/workers';
import { generateItems } from '../helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private readonly worker: WebWorker<number, IItem[]> = WebWorker.fromFunction<number, IItem[]>(generateItems);
  public readonly workerData$: Observable<IItem[]> = this.worker.pipe(toData());

  constructor() { }

  public generateItems(arrSize: number): void {
    this.worker.postMessage(arrSize);
  }
}
