import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavouritePageRoutingModule } from './favourite-routing.module';
import { FavouritePage } from './container/favourite.page';
import { BibleModule } from '@bible/shared/bible/bible.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    BibleModule,
    FavouritePageRoutingModule
  ],
  declarations: [FavouritePage]
})
export class FavouritePageModule {}
