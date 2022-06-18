import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BibleModule } from '@bible/shared/bible/bible.module';
import { SharedModule } from '@bible/shared/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RootComponent } from './containers/root.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    BibleModule,
    SharedModule,
    RouterModule,
  ],
  declarations:[
    RootComponent
  ],
  providers: [
    { provide: "windowObject", useValue: window}
  ]
})
export class CorePageModule {}
