import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { DiscipleshipActions, fromDiscipleship } from '@bible/shared/discipleship';
import { checkObject, gotToTop, trackById } from '@bible/shared/shared/utils/utils';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
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
              <ion-card class="fade-in-card margin-top align-text components-color-ligth" (click)="searchVerses(item?.text)" >
                <ion-card-header class="flex-content span text-second-color">
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
                        <ion-card class="margin-top summary-items components-color-ligth">
                          <ion-card-header class="span text-second-color">
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

        <!-- IS ERROR -->
        <ng-template #serverError>
          <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'0vh'"></app-no-data>
        </ng-template>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <app-no-data [title]="'COMMON.NO_DATA'" [image]="'assets/images/empty.png'" [top]="'0vh'"></app-no-data>
        </ng-template>

        <!-- LOADER  -->
        <ng-template #loader>
          <app-spinner ></app-spinner>
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
