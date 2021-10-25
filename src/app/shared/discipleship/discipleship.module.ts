import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationModule } from '@bible/shared/notification/notification.module';
import { DiscipleshipEffects } from './effects/discipleship.effects';
import * as fromDiscipleship from './reducers/discipleship.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NotificationModule,
    StoreModule.forFeature(fromDiscipleship.discipleshipFeatureKey, fromDiscipleship.reducer),
    EffectsModule.forFeature([DiscipleshipEffects]),
  ]
})
export class DiscipleshipModule { }
