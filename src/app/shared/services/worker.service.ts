import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class WorkerService {
  public worker: Worker;

  public createWorker(): void {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('../../shared/web-workers/stream.worker', import.meta.url));
      this.worker = worker;
    }
  }

  public terminateWorker(): void {
    this.worker?.terminate();
  }
}
