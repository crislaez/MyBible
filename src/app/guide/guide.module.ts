import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@bible/shared/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GuidePage } from './container/guide.page';
import { GuidePageRoutingModule } from './guide-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedModule,
    GuidePageRoutingModule
  ],
  declarations: [
    GuidePage
  ]
})
export class GuidePageModule {}
