import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { BASE_TIMER } from '../consts/base-timer.const';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })

export class WorkerService {
  public worker: Worker;
  public interval$: Observable<number>;

  constructor(private dataService: DataService) {
  }

  public createWorker(): void {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('../../shared/web-workers/stream.worker', import.meta.url));
      this.worker = worker;
      this.handleWorkerEvent();
    }
  }

  public createInterval(data?: number): void {
    this.interval$ = interval(data || BASE_TIMER);
  }

  public destroyInterval(): void {
    this.interval$ = null;
  }

  public terminateWorker(): void {
    this.worker?.terminate();
  }

  public pushDataToWorker(data: number): void {
    this.worker.postMessage(data);
  }

  private handleWorkerEvent(): void {
    this.worker.onmessage = ({ data }) => {
      this.dataService.stream$.next(data);
    };
  }
}
