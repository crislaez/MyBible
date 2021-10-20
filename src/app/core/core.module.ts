import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RootComponent } from './containers/root.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BibleModule } from '@bible/shared/bible/bible.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    BibleModule,
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
