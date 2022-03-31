import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericsModule } from '@bible/shared-ui/generics/generics.module';
import { DiscipleshipModule } from '@bible/shared/discipleship/discipleship.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DiscipleshipPage } from './containers/discipleship.page';
import { DiscipleshipPageRoutingModule } from './discipleship-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscipleshipModule,
    GenericsModule,
    TranslateModule.forChild(),
    DiscipleshipPageRoutingModule
  ],
  declarations: [DiscipleshipPage]
})
export class DiscipleshipPageModule {}
