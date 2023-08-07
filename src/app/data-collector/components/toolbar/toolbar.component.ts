import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BASE_ARRAY_SIZE } from '../../../shared/consts/base-array-size.const';
import { Subscription } from "rxjs";
import { BASE_TIMER } from '../../../shared/consts/base-timer.const';
import { WorkerService } from '../../../shared/services/worker.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() idsChanged: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() clearFilters: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup;
  public arraySize: number = BASE_ARRAY_SIZE;
  public newId: number = null;
  public idsView: string = '';

  private intervalSubscription$ = new Subscription();
  private formSubscription$ = new Subscription();

  public get idsFormControl(): AbstractControl | null {
    return this.form.get('ids');
  }

  constructor(
    private fb: FormBuilder,
    private workerService: WorkerService) {
    this.form = this.fb.group({
      timer: [BASE_TIMER, Validators.required],
      size: [BASE_ARRAY_SIZE, Validators.required],
      id: [null],
      ids: [[]],
    });
  }

  public ngOnInit(): void {
    this.workerService.createInterval();
    this.workerService.createWorker();
    this.subscribeOnStream();
    this.formSubscription$.add(
      this.form.valueChanges.subscribe(() => {
        this.idsView = this.idsFormControl.value.join(' ');
        this.refreshWorker();
        this.updateStream();
      })
    );
  }

  public ngOnDestroy(): void {
    this.intervalSubscription$.unsubscribe();
    this.formSubscription$.unsubscribe();
    this.workerService.terminateWorker();
    this.workerService.destroyInterval();
  }

  public updateStream(): void {
    this.intervalSubscription$.unsubscribe();
    this.workerService.destroyInterval();
    this.workerService.createInterval(this.form.getRawValue().timer);
    this.arraySize = this.form.getRawValue().size;
    this.subscribeOnStream();
  }

  public refreshWorker(): void {
    this.workerService.terminateWorker();
    this.workerService.createWorker();
  }

  public addId(): void {
    if (this.newId) {
      const ids = [...this.form.value.ids];
      if (!ids.includes(`${this.newId}`)) {
        if (ids.length === 10 || ids.length === this.form.value.size) {
          const updatedIds = ids.slice(1);
          updatedIds.push(this.newId);
          this.idsFormControl.patchValue(updatedIds);
          this.resetIdInputAndEmitEvent(updatedIds);
          return;
        }

        const updatedIds = [...ids, `${this.newId}`]
        this.idsFormControl.patchValue(updatedIds);
        this.resetIdInputAndEmitEvent(updatedIds);
      }
    }
  }

  public resetIdInputAndEmitEvent(data: string[]): void {
    this.idsChanged.emit(data);
    this.newId = null;
  }

  public resetForm($event: MouseEvent): void {
    $event.preventDefault();
    this.form.patchValue({
      timer: BASE_TIMER,
      size: BASE_ARRAY_SIZE,
      id: null,
      ids: [],
    });
    this.clearFilters.emit();
  }

  private subscribeOnStream(): void {
    if (this.workerService.worker) {
      this.intervalSubscription$ = new Subscription();
      this.intervalSubscription$.add(this.workerService.interval$.subscribe(() => {
        this.workerService.pushDataToWorker(this.arraySize);
      }));
    } else {
      alert('Web Workers are not supported in this environment.');
    }
  }
}
