import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { gotToTop } from '@bible/shared/shared/utils/utils';


@Component({
  selector: 'app-how-is-he',
  template: `
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container">

        <!-- CABECERA  -->
        <div class="header fade-in-card">
          <h1>{{ 'COMMON.HOW_IS_HE' | translate }}</h1>
        </div>

        <ion-card class="fade-in-card" >
          <ion-card-content class="text-second-color components-color-ligth" [innerHTML]="'COMMON.HOW_IS_HE_BODY' | translate ">
          </ion-card-content>
        </ion-card>
      </div>

      <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="background-component text-color-white"  (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>

    </ion-content>
    `,
  styleUrls: ['./how-is-he.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowIsHePage {

  @ViewChild(IonContent, {static: true}) content: IonContent;
  gotToTop = gotToTop;
  showButton: boolean = false;


  constructor() { }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }
}
