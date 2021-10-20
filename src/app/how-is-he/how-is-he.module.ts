import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HowIsHePage } from './container/how-is-he.page';
import { HowIsHePageRoutingModule } from './how-is-he-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    HowIsHePageRoutingModule
  ],
  declarations: [HowIsHePage]
})
export class HowIsHePageModule {}
