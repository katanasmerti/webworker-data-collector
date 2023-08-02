import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BASE_ARRAY_SIZE} from "../../../shared/consts/base-array-size.const";
import {interval, Observable, Subscription} from "rxjs";
import {BASE_TIMER} from "../../../shared/consts/base-timer.const";
import {DataService} from "../../../shared/services/data.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {
  public form: FormGroup;
  public arraySize: number = BASE_ARRAY_SIZE;

  private subscription$ = new Subscription();
  private interval$: Observable<number> = interval(BASE_TIMER);
  private worker: Worker = new Worker(new URL('../../../shared/web-workers/stream.worker', import.meta.url));

  public get idFormControl(): AbstractControl | null {
    return this.form.get('id');
  }

  public get idsFormControl(): AbstractControl | null {
    return this.form.get('ids');
  }

  constructor(
    private fb: FormBuilder,
    private workerService: DataService) {
    this.form = this.fb.group({
      timer: [BASE_TIMER, Validators.required],
      size: [BASE_ARRAY_SIZE, Validators.required],
      id: [null],
      ids: [[]],
    });
  }

  public ngOnInit(): void {
    this.subscribeOnStream();
    this.form.valueChanges.subscribe((data) => {
      this.stopStream();
      this.updateStream();
    })
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public updateStream(): void {
    this.subscription$.unsubscribe();
    this.arraySize = this.form.getRawValue().size;
    this.interval$ = interval(this.form.getRawValue().timer);
    this.subscribeOnStream();
  }

  public stopStream(): void {
    this.worker.terminate();
    this.worker = new Worker(new URL('../../../shared/web-workers/stream.worker', import.meta.url));
    this.subscription$.unsubscribe();
  }

  public addId($event: number): void {
    if ($event) {
      const ids = this.idsFormControl?.getRawValue();
      if (!ids.includes(` ${$event}`)) {
        this.form.patchValue({ ids: [...ids, ` ${$event}`] });
      }
    }
    this.idFormControl?.reset();
  }

  public resetForm($event: MouseEvent): void {
    $event.preventDefault();
    this.form.patchValue({
      timer: BASE_TIMER,
      size: BASE_ARRAY_SIZE,
      id: null,
      ids: [],
    });
  }

  private subscribeOnStream(): void {
    if (typeof Worker !== 'undefined') {
      this.worker.onmessage = ({ data }) => {
        this.workerService.stream$.next(data);
      };
      this.subscription$ = new Subscription();
      this.subscription$.add(this.interval$.subscribe(() => {
        this.worker.postMessage(this.arraySize);
      }));
    } else {
      alert('Web Workers are not supported in this environment.');
    }

  }
}
