import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
import * as BibleActions from '@bible/shared/bible/actions/bible.actions';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { checkObject } from '@bible/shared/shared/utils/utils';
import { Store } from '@ngrx/store';
import { map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';


@Component({
  selector: 'app-favourite',
  template:`
    <ion-content [fullscreen]="true">
      <div class="container">

        <!-- HEADER  -->
        <div class="header fade-in-card">
          <h1>{{ 'COMMON.DAILY_DEVOTIONAL' | translate }}</h1>
        </div>

        <ng-container *ngIf="(verseOfDay$ | async) as verseOfDay">
          <ng-container *ngIf="(status$ | async) as status">
            <ng-container *ngIf="status !== 'pending'; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">
                <ng-container *ngIf="checkObject(verseOfDay); else noData">

                  <ion-card class="fade-in-card">
                    <ion-card-header>
                      <ion-card-title class="text-second-color">{{verseOfDay?.title}}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content class="text-second-color">{{verseOfDay?.verse}}</ion-card-content>
                  </ion-card>

                </ng-container>
              </ng-container>
            </ng-container>
          </ng-container>
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

        <!-- LOADER  -->
        <ng-template #loader>
          <ion-spinner class="color-component"></ion-spinner>
        </ng-template>

      </div>

      <!-- <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="background-component text-color-white" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab> -->
    </ion-content>
  `,
  styleUrls: ['./favourite.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritePage  {

  checkObject = checkObject;
  reload$ = new EventEmitter<string>();
  status$ = this.store.select(fromBible.getVerseStatus);

  verseOfDay$ = this.reload$.pipe(
    startWith(''),
    withLatestFrom(
      this.store.select(fromBible.getVersesOfDay),
    ),
    tap(([,verses]) => {
      this.store.dispatch(BibleActions.loadVerseOfDay({passage: (verses[this.getNow()] as any)?.verse}))
    }),
    switchMap(([,verses]) =>
      this.store.select(fromBible.getVerseOfDay).pipe(
        map(verse => ({title: verses[this.getNow()]?.title ||'', verse}))
      )
    )
  );


  constructor(
    private store: Store
  ) { }


  getNow(): number {
    const now = new Date()
    const day = now.getDate()
    return day
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.reload$.next('')

      event.target.complete();
    }, 500);
  }


}
