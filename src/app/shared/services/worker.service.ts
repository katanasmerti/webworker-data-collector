import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class WorkerService {
  public createWorker(): Worker {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('../../shared/web-workers/stream.worker', import.meta.url));
      return worker;
    }
    return undefined;
  }
}
