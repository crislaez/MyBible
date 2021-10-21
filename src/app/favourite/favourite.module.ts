import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BibleModule } from '@bible/shared/bible/bible.module';
import { StorageModule } from '@bible/shared/storage/storage.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FavouritePage } from './container/favourite.page';
import { FavouritePageRoutingModule } from './favourite-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    BibleModule,
    StorageModule,
    FavouritePageRoutingModule
  ],
  declarations: [FavouritePage]
})
export class FavouritePageModule {}
