import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createReducer, on } from '@ngrx/store';
import * as StorageActions from '../actions/storage.actions';


export const storageFeatureKey = 'storage';

export interface State{
  status?: EntityStatus;
  lastVerse?: string;
  verses: any;
  error?: unknown;
}

const initialState: State = {
  status: EntityStatus.Initial,
  lastVerse: '',
  verses:[],
  error: undefined
}


export const reducer = createReducer(
  initialState,
  on(StorageActions.loadLastVerse, (state) => ({...state, error: undefined, status: EntityStatus.Pending})),
  on(StorageActions.saveLastVerse, (state, { lastVerse, error, status }) => ({...state, lastVerse, error, status: status })),

  on(StorageActions.loadVerses, (state) => ({...state, error: undefined, status: EntityStatus.Pending})),
  on(StorageActions.saveVerses, (state, { verses, error, status }) => ({...state, verses, error, status: status })),

  on(
    StorageActions.insertLastVerse,
    StorageActions.insertVerse,
    StorageActions.deleteVerse,
    (state) => ({...state, status: EntityStatus.Pending})),

  on(
    StorageActions.insertLastVerseSuccess,
    StorageActions.insertVerseSuccess,
    StorageActions.deleteVerseSuccess,
    (state ) => ({...state, error: undefined, status: EntityStatus.Loaded })),

  on(
    StorageActions.insertLastVerseFailure,
    StorageActions.insertVerseFailure,
    StorageActions.deleteVerseFailure,
    (state, { error }) => ({...state, error, status: EntityStatus.Loaded })),

);
