import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BASE_ARRAY_SIZE} from "../../../shared/consts/base-array-size.const";
import {interval, Observable, Subscription} from "rxjs";
import {BASE_TIMER} from "../../../shared/consts/base-timer.const";
import {WorkerService} from "../../../shared/services/worker.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  public form: FormGroup;
  public isStartBtnDisabled: boolean = true;
  public arraySize: number = BASE_ARRAY_SIZE;

  private subscription$ = new Subscription();
  private stream$: Observable<number> = interval(BASE_TIMER);

  public get idFormControl(): AbstractControl | null {
    return this.form.get('id');
  }

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
    this.subscribeOnStream();
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public submitForm(): void {
    this.subscription$.unsubscribe();
    this.isStartBtnDisabled = true;
    this.arraySize = this.form.getRawValue().size;
    this.stream$ = interval(this.form.getRawValue().timer);
    this.subscribeOnStream();
  }

  public stopStream($event: MouseEvent): void {
    $event.preventDefault();
    this.isStartBtnDisabled = false;
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
    this.subscription$ = new Subscription();
    this.subscription$.add(this.stream$.subscribe(() => {
      this.workerService.generateItems(this.arraySize);
    }));
  }
}
