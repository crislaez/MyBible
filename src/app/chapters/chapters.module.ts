import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BibleModule } from '@bible/shared/bible/bible.module';
import { GenericsModule } from '@bible/shared-ui/generics/generics.module';
import { StorageModule } from '@bible/shared/storage/storage.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LongPressModule } from 'ionic-long-press';
import { ChaptersPageRoutingModule } from './chapters-routing.module';
import { ChaptersPage } from './containers/chapters.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    BibleModule,
    GenericsModule,
    StorageModule,
    LongPressModule,
    ChaptersPageRoutingModule
  ],
  declarations: [
    ChaptersPage
  ]
})
export class ChaperPageModule {}
