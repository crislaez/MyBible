import { Injectable } from '@angular/core';
import * as NotificationActions from '@bible/shared/notification/actions/notification.actions';
import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as BibleActions from '../actions/bible.actions';
import { BibleService } from '../services/bible.service';


@Injectable()
export class BibleEffects {

  loadBooks$ = createEffect( () =>
    this.actions$.pipe(
      ofType(BibleActions.loadBooks),
      switchMap( () =>
        this._bible.getBible().pipe(
          map((books) => BibleActions.saveBooks({ books, error:undefined, status: EntityStatus.Loaded})),
          catchError((error) => of(
            BibleActions.saveBooks({ books: [], error, status: EntityStatus.Loaded}),
            NotificationActions.notificationFailure({message:'ERRORS.ERROR_LOADING'})
          )),
        )
      )
    )
  );

  loadMenu$ = createEffect( () =>
    this.actions$.pipe(
      ofType(BibleActions.loadMenu),
      switchMap( () =>
        this._bible.getSpanishMenu().pipe(
          map( (menu): any => BibleActions.saveMenu({ menu, error:undefined, status: EntityStatus.Loaded })),
          catchError((error) => of(
            BibleActions.saveMenu({ menu: {}, error, status: EntityStatus.Loaded }),
            NotificationActions.notificationFailure({message:'ERRORS.ERROR_LOADING'})
          )),
        )
      )
    )
  );

  loadSearch$ = createEffect( () =>
    this.actions$.pipe(
      ofType(BibleActions.loadSearch ),
      switchMap( ({search}) =>
        this._bible.getBibleSearch(search).pipe(
          map((text) => BibleActions.saveSearch({ result: text, error:undefined, status: EntityStatus.Loaded }) ),
          catchError((error) => of( BibleActions.saveSearch({ result:'', error, status: EntityStatus.Loaded}))
          ),
        )
      )
    )
  );

  loadChapter$ = createEffect( () =>
    this.actions$.pipe(
      ofType(BibleActions.loadChapter ),
      switchMap( ({passage}) =>
        this._bible.getVerses(passage).pipe(
          map( ({text}) => {
            const verses = text?.split(/\r\n|\r|\n/);
            const versesObject = (verses || []).reduce((acc, el, index ) => {
              if(index !== 0){
                const splitEl = el?.split(' ');
                const numberVerse = splitEl[0];
                const verse = splitEl?.slice(1)?.join(' ')
                return {
                  ...acc,
                  [numberVerse]:verse
                }
              }
              return {...acc}
            },{});
            // or text
            return BibleActions.saveChapter({ chapter: versesObject, error:undefined, status: EntityStatus.Loaded})
          }),
          catchError( (error) => of(
            BibleActions.saveChapter({ chapter:{}, error, status: EntityStatus.Error}),
            NotificationActions.notificationFailure({message:'ERRORS.ERROR_LOADING'})
          )),
        )
      )
    )
  );

  loadAllVerseOfDay$ = createEffect( () =>
    this.actions$.pipe(
      ofType(BibleActions.loadAllVerseOfDay ),
      switchMap( () =>
        this._bible.getAllVersesOfDay().pipe(
          map( (versesOfDay): any => BibleActions.saveAllVerseOfDay({ versesOfDay, error:undefined, status: EntityStatus.Loaded })),
          catchError( (error) => of(
            BibleActions.saveAllVerseOfDay({ versesOfDay: [], error, status: EntityStatus.Error}),
            NotificationActions.notificationFailure({message:'ERRORS.ERROR_LOADING'})
          )),
        )
      )
    )
  );

  loadVerseOfDay$ = createEffect( () =>
    this.actions$.pipe(
      ofType(BibleActions.loadVerseOfDay ),
      switchMap( ({passage}) =>
        this._bible.getVersesOfDay(passage).pipe(
          map( ({text}): any => BibleActions.saveVerseOfDay({ verseOfDay: text, error:undefined, status:EntityStatus.Loaded })),
          catchError((error) => of(
            BibleActions.saveVerseOfDay({ verseOfDay:{}, error, status:EntityStatus.Error}),
            NotificationActions.notificationFailure({message:'ERRORS.ERROR_LOADING'})
          )),
        )
      )
    )
  );

  loadBibleInit$ = createEffect(() =>
    of(
      BibleActions.loadBooks(),
      BibleActions.loadMenu(),
      BibleActions.loadAllVerseOfDay()
    )
  );


  constructor(
    private actions$: Actions,
    private _bible: BibleService,
    public toastController: ToastController,
  ){ }


}
