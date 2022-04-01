import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from './components/no-data.component';
import { PopoverComponent } from './components/popover.component';
import { SpinnerComponent } from './components/spinner.component';

const COMPONENTS = [
  SpinnerComponent,
  PopoverComponent,
  NoDataComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class GenericsModule { }
