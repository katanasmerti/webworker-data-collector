import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InnerTableChildComponent } from './components/inner-table-child/inner-table-child.component';
import { TableComponent } from './components/table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DataCollectorRoutingModule } from './data-collector-routing.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    InnerTableChildComponent,
    TableComponent
  ],
  imports: [
    DataCollectorRoutingModule,
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzInputModule,
    NzToolTipModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
  ]
})

export class DataCollectorModule { }
