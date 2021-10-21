import { Injectable } from '@angular/core';
import * as NotificationActions from '@bible/shared/notification/actions/notification.actions';
import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as StorageActions from '../actions/storage.atcions';
import { StorageService } from '../services/storage.service';


@Injectable()
export class StorageEffects {

  loadStorage$ = createEffect( () =>
    this.actions$.pipe(
      ofType(
        StorageActions.loadStorage,
        StorageActions.insertStorageSuccess
      ),
      switchMap( () =>
        this._storage.getVerse().pipe(
          map( (storage): any => StorageActions.saveStorage({ storage, error:undefined, status: EntityStatus.Loaded})),
          catchError((error) => of(
            StorageActions.saveStorage({ storage: '', error, status: EntityStatus.Loaded}),
            // NotificationActions.notificationFailure({message:'ERRORS.ERROR_LOADING'})
          )),
        )
      )
    )
  );

  saveStorage$ = createEffect( () =>
    this.actions$.pipe(
      ofType(StorageActions.insertStorage),
      switchMap( ({storage}) =>
        this._storage.saveVerse(storage).pipe(
          map( () => StorageActions.insertStorageSuccess({ message: '' })),
          catchError((error) => of(
            StorageActions.insertStorageFailure({ message: '', error}),
            // NotificationActions.notificationFailure({message:'ERRORS.ERROR_LOADING'})
          )),
        )
      )
    )
  );

  loadBibleInit$ = createEffect(() =>
    of(
      StorageActions.loadStorage(),
    )
  );


  constructor(
    private actions$: Actions,
    private _storage: StorageService,
    public toastController: ToastController,
  ){ }


}
