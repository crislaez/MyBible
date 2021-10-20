import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PoperComponent } from './components/poper.component';


@NgModule({
  declarations: [
    PoperComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports:[
    PoperComponent
  ]
})
export class GenericsModule { }
