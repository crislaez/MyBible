import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericsModule } from '@bible/shared-ui/generics/generics.module';
import { BibleModule } from '@bible/shared/bible/bible.module';
import { StorageModule } from '@bible/shared/storage/storage.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LongPressModule } from 'ionic-long-press';
import { SavedPage } from './containers/saved.page';
import { SavedPageRoutingModule } from './saved-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorageModule,
    GenericsModule,
    LongPressModule,
    BibleModule,
    TranslateModule.forChild(),
    SavedPageRoutingModule
  ],
  declarations: [SavedPage]
})
export class SavedPageModule {}
