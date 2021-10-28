import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDiscipleship from '../reducers/discipleship.reducer';

export const selectBibleState = createFeatureSelector<fromDiscipleship.State>(
  fromDiscipleship.discipleshipFeatureKey
);


export const getDiscipleship = createSelector(
  selectBibleState,
  (state) => state.discipleship
);

export const getStatus = createSelector(
  selectBibleState,
  (state) => state.status
);

export const getError = createSelector(
  selectBibleState,
  (state) => state.error
);
