import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChaptersPageRoutingModule } from './chapters-routing.module';
import { ChaptersPage } from './containers/chapters.page';
import { BibleModule } from '@bible/shared/bible/bible.module';
import { TranslateModule } from '@ngx-translate/core';
import { LongPressModule } from 'ionic-long-press';
import { GenericsModule } from '@bible/shared/generics/generics.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    BibleModule,
    GenericsModule,
    LongPressModule,
    ChaptersPageRoutingModule
  ],
  declarations: [
    ChaptersPage
  ]
})
export class ChaperPageModule {}
