import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { DiscipleshipActions, fromDiscipleship } from '@bible/shared/discipleship';
import { checkObject, gotToTop, trackById } from '@bible/shared/shared/utils/utils';
import { IonContent } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-discipleship',
  template:`
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container">

        <div class="header fade-in-card">
          <h1>{{ 'COMMON.DISCIPLESHIPS' | translate }}</h1>
        </div>


        <ng-container *ngFor="let item of menu; let i = index; trackBy: trackById">
          <details>
            <summary>
              <ion-card class="fade-in-card margin-top  align-text" (click)="searchVerses(item?.text)" >
                <ion-card-header class="flex-content span">
                  {{ item?.label | translate }}
                </ion-card-header>
              </ion-card>
            </summary>

            <div>
              <ng-container *ngIf="(verses$ | async) as verses">
                <ng-container *ngIf="(status$ | async) as status">
                  <ng-container *ngIf="status !== 'pending'; else loader">
                    <ng-container *ngIf="status !== 'error'">

                      <ng-container *ngFor="let verse of verses">
                      <!-- fade-in-card -->
                        <ion-card class="margin-top align-text summary-items">
                          <ion-card-header class="span">
                            {{ verse?.split('|')[0] }}
                          </ion-card-header>

                          <ion-card-content>
                          {{ verse?.split('|')[1] }}
                          </ion-card-content>
                        </ion-card>
                      </ng-container>

                    </ng-container>
                  </ng-container>
                </ng-container>
              </ng-container>
            </div>
          </details>

        </ng-container>

        <!--  -->

        <!-- REFRESH -->
        <!-- <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher> -->

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
  trackById = trackById;
  showButton: boolean = false;
  search$ = new EventEmitter<string>();

  menu:{id:number, label:string, text:string}[] = [
    {
      id:1,
      label: 'COMMON.FOLLOW_LORD',
      text: 'follow'
    },
    {
      id:2,
      label: 'COMMON.HOPE',
      text: 'hope'
    },
    {
      id:3,
      label: 'COMMON.LOVE',
      text: 'love'
    },
    {
      id:4,
      label: 'COMMON.SORRY',
      text: 'sorry'
    },
    {
      id:5,
      label: 'COMMON.FAMILY',
      text: 'family'
    },
    {
      id:6,
      label: 'COMMON.MARRIAGE',
      text: 'marriage'
    },
    {
      id:7,
      label: 'COMMON.SALVATION',
      text: 'salvation'
    },
    {
      id:8,
      label: 'COMMON.FINANCE',
      text: 'finanzas'
    }
  ];

  status$ = this.store.select(fromDiscipleship.getStatus);

  verses$ = this.search$.pipe(
    startWith(this.menu[0]?.text),
    tap((name) => {
      this.store.dispatch(DiscipleshipActions.loadDiscipleship({name}))
    }),
    switchMap(() =>
      this.store.select(fromDiscipleship.getDiscipleship)
    )
    // ,tap(data => console.log(data))
  );


  constructor (
    private store: Store
  ) { }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  doRefresh(event) {
    setTimeout(() => {
      this.search$.next('')

      event.target.complete();
    }, 500);
  }

  searchVerses(verse): void{
    this.search$.next(verse)
  }

}
