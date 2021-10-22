import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as BibleActions from '@bible/shared/bible/actions/bible.actions';
import { Menu } from '@bible/shared/bible/models';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { checkObject } from '@bible/shared/shared/utils/utils';
import { fromStorage } from '@bible/shared/storage';
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

        <ng-container *ngIf="(lastVerse$ | async) as lastVerse">
          <ng-container *ngIf="(menu$ | async) as menu">
            <ng-container *ngIf="!!lastVerse">
              <ion-card class="fade-in-card max-width ion-activatable ripple-parent" (click)="redirect(lastVerse)">

                <ion-card-content class="text-second-color small-text flex-content">
                  <div><span class="span">{{ 'COMMON.LAST_VERSE' | translate }}: </span> <span>{{ getChaptersNumber(lastVerse, menu)}}</span></div>
                  <div><ion-icon class="medium-text span" name="eye-outline"></ion-icon> </div>
                </ion-card-content>

                <ion-ripple-effect></ion-ripple-effect>
              </ion-card>
            </ng-container>
          </ng-container>
        </ng-container>

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
  menu$ = this.store.select(fromBible.getMenu);
  status$ = this.store.select(fromBible.getVerseStatus);
  lastVerse$ = this.store.select(fromStorage.getStorage);

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
    private store: Store,
    private router: Router
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

  redirect(verse: string): void{
    const splitedVerse = verse?.split(' ');
    const passageName = splitedVerse?.slice(0, -1)?.join(' ');
    const passageNumber = splitedVerse?.slice(-1)?.join(' ') || '0';

    this.router.navigate( ['/chapter/'+ passageName], { queryParams: {verseNumber: passageNumber}});
  }

  getChaptersNumber(englisChapter: string, menu:Menu): string{
    const chapterSplited = (englisChapter || '')?.split(' ');
    const firstChapterNumber = chapterSplited[chapterSplited?.length -3] || '';
    const chapter: any = chapterSplited[chapterSplited?.length -2] || '';
    const number = chapterSplited[chapterSplited?.length -1] || '';

    let property = !!firstChapterNumber ? firstChapterNumber+' '+chapter: chapter
    return !chapter || !isNaN(chapter)
          ? chapter +' '+ menu[number] || englisChapter
          : (menu[property] || chapter) +' '+ number
  }

}
