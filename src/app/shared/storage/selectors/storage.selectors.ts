import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStorage from '../reducers/storage.reducer';

export const selectStorageState = createFeatureSelector<fromStorage.State>(
  fromStorage.storageFeatureKey
);


export const getStorage = createSelector(
  selectStorageState,
  (state) => state.storage
);

export const getStatus = createSelector(
  selectStorageState,
  (state) => state.status
);

export const getError = createSelector(
  selectStorageState,
  (state) => state.error
);
