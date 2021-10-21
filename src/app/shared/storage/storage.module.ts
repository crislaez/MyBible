import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '@bible/shared/notification/notification.module';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StorageEffects } from './effects/storage.effects';
import * as fromStorage from './reducers/storage.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NotificationModule,
    StoreModule.forFeature(fromStorage.storageFeatureKey, fromStorage.reducer),
    EffectsModule.forFeature([StorageEffects]),
  ]
})
export class StorageModule { }
