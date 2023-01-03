import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorViewComponent } from './calculator-view/calculator-view.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CalculatorViewComponent],
  imports: [CommonModule, SharedModule],
  exports: [CalculatorViewComponent],
})
export class CalculatorModule {}
