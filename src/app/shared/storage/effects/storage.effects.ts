import { Injectable } from '@angular/core';
import { NotificationActions } from '@bible/shared/notification';
import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as StorageActions from '../actions/storage.actions';
import { StorageService } from '../services/storage.service';


@Injectable()
export class StorageEffects {

  readonly storageKeyLast = 'myBibleLastVerse';
  readonly storageKeyVerse = 'myBibleVerses';

  loadLastVerse$ = createEffect( () =>
    this.actions$.pipe(
      ofType(
        StorageActions.loadLastVerse,
        StorageActions.insertLastVerseSuccess,
      ),
      switchMap( () =>
        this._storage.getLastVerse(this.storageKeyLast).pipe(
          map( (lastVerse) => StorageActions.saveLastVerse({ lastVerse, error:undefined, status: EntityStatus.Loaded})),
          catchError((error) => of(StorageActions.saveLastVerse({ lastVerse: '', error, status: EntityStatus.Loaded}))),
        )
      )
    )
  );

  insertStorage$ = createEffect( () =>
    this.actions$.pipe(
      ofType(StorageActions.insertLastVerse),
      switchMap( ({lastVerse}) =>
        this._storage.savelastVerse(lastVerse).pipe(
          map( () => StorageActions.insertLastVerseSuccess()),
          catchError((error) => of(StorageActions.insertLastVerseFailure({ error}) )),
        )
      )
    )
  );

  loadVerses$ = createEffect( () =>
    this.actions$.pipe(
      ofType(
        StorageActions.loadVerses,
        StorageActions.insertVerseSuccess,
        StorageActions.deleteVerseSuccess
      ),
      switchMap( () =>
        this._storage.getAllVerse(this.storageKeyVerse).pipe(
          map( (verses) => StorageActions.saveVerses({ verses, error:undefined, status: EntityStatus.Loaded})),
          catchError((error) => of(StorageActions.saveVerses({ verses: [], error, status: EntityStatus.Loaded}))),
        )
      )
    )
  );

  insertVerse$ = createEffect( () =>
    this.actions$.pipe(
      ofType(StorageActions.insertVerse),
      switchMap( ({verse}) =>
        this._storage.insetVerse(verse).pipe(
          switchMap( () => of(
            StorageActions.insertVerseSuccess(),
            NotificationActions.notificationSuccess({message:'COMMON.SAVE_VERSE_SUCCESS'})
          )),
          catchError((error) => of(
            StorageActions.insertVerseFailure({ error }),
            NotificationActions.notificationFailure({message:'COMMON.VERSE_FAILURE'})
          )),
        )
      )
    )
  );

  deleteVerse$ = createEffect( () =>
    this.actions$.pipe(
      ofType(StorageActions.deleteVerse),
      switchMap( ({verse}) =>
        this._storage.deleteVerse(verse).pipe(
          switchMap( () => of(
            StorageActions.deleteVerseSuccess(),
            NotificationActions.notificationSuccess({message:'COMMON.DELETE_VERSE_SUCCESS'})
          )),
          catchError((error) => of(
            StorageActions.deleteVerseFailure({ error }),
            NotificationActions.notificationFailure({message:'COMMON.VERSE_FAILURE'})
          )),
        )
      )
    )
  );

  loadBibleInit$ = createEffect(() =>
    of(
      StorageActions.loadLastVerse(),
      StorageActions.loadVerses()
    )
  );


  constructor(
    private actions$: Actions,
    private _storage: StorageService,
    public toastController: ToastController,
  ){ }


}
