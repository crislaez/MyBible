import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createReducer, on } from '@ngrx/store';
import * as StorageActions from '../actions/storage.atcions';


export const storageFeatureKey = 'storage';

export interface State{
  status?: EntityStatus;
  storage?: string;
  error?: unknown;
}

const initialState: State = {
  status: EntityStatus.Initial,
  storage: '',
  error: undefined
}


export const reducer = createReducer(
  initialState,
  on(StorageActions.loadStorage, (state) => ({...state, error: undefined, status: EntityStatus.Pending})),
  on(StorageActions.saveStorage, (state, { storage, error, status }) => ({...state, storage, error, status: status })),

  on(StorageActions.insertStorage, (state) => ({...state, status: EntityStatus.Pending})),
  on(StorageActions.insertStorageSuccess, (state ) => ({...state, error: undefined, status: EntityStatus.Loaded })),
  on(StorageActions.insertStorageFailure, (state, { error }) => ({...state, error, status: EntityStatus.Loaded })),
);
