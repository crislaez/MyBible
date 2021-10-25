import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { checkObject, gotToTop } from '@bible/shared/shared/utils/utils';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-discipleship',
  template:`
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container">

        <ng-container>
        </ng-container>


        <!-- REFRESH -->
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!-- IS ERROR -->
        <ng-template #serverError>
          <div class="error-serve">
            <div>
              <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
              <br>
              <span class="text-second-color">{{'COMMON.ERROR' | translate}}</span>
            </div>
          </div>
        </ng-template>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <div class="error-serve">
            <span class="text-second-color">{{'COMMON.NO_DATA' | translate}}</span>
          </div>
        </ng-template>

        <ng-template #loader>
          <ion-spinner class="color-component"></ion-spinner>
        </ng-template>
      </div>

      <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="background-component text-color-white" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styleUrls: ['./discipleship.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscipleshipPage {

  @ViewChild(IonContent, {static: true}) content: IonContent;
  checkObject = checkObject;
  gotToTop = gotToTop;
  showButton: boolean = false;
  reload$ = new EventEmitter<string>();


  constructor() { }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  doRefresh(event) {
    setTimeout(() => {
      this.reload$.next('')

      event.target.complete();
    }, 500);
  }

}
