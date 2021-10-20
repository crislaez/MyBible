import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './effects/notification.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([NotificationEffects]),
  ]
})
export class NotificationModule { }
