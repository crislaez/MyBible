import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DiscipleshipModule } from '@bible/shared/discipleship/discipleship.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DiscipleshipPageRoutingModule } from './discipleship-routing.module';
import { DiscipleshipPage } from './containers/discipleship.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscipleshipModule,
    TranslateModule.forChild(),
    DiscipleshipPageRoutingModule
  ],
  declarations: [DiscipleshipPage]
})
export class DiscipleshipPageModule {}
