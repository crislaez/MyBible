import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BibleEffects } from './effects/bible.effects';
import * as fromBible from './reducers/bible.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationModule } from '@bible/shared/notification/notification.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NotificationModule,
    StoreModule.forFeature(fromBible.bibleFeatureKey, fromBible.reducer),
    EffectsModule.forFeature([BibleEffects]),
  ]
})
export class BibleModule { }
