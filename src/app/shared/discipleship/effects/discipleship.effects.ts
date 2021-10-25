import { Injectable } from '@angular/core';
import * as NotificationActions from '@bible/shared/notification/actions/notification.actions';
import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as DiscipleshipActions from '../actions/discipleship.actions';
import { DiscipleshipService } from '../services/discipleship.service';


@Injectable()
export class DiscipleshipEffects {

  loadBooks$ = createEffect( () =>
    this.actions$.pipe(
      ofType(DiscipleshipActions.loadDiscipleship),
      switchMap( ({name}) =>
        this._discipleship.getDiscipleship(name).pipe(
          map( ({discipleship}): any => DiscipleshipActions.saveDiscipleship({ discipleship, error:undefined, status: EntityStatus.Loaded})),
          catchError((error) => of(
            DiscipleshipActions.saveDiscipleship({ discipleship: [], error, status: EntityStatus.Loaded}),
            NotificationActions.notificationFailure({message:'ERRORS.ERROR_LOADING'})
          )),
        )
      )
    )
  );



  constructor(
    private actions$: Actions,
    private _discipleship: DiscipleshipService,
    public toastController: ToastController,
  ){ }


}
