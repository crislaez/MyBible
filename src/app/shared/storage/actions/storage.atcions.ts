import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createAction, props } from '@ngrx/store';
import { Verse } from '../models';

export const loadLastVerse = createAction(
  '[Storage] Load Last Verse'
);

export const saveLastVerse = createAction(
  '[Storage] Save Last Verse',
   props<{lastVerse: string, error: unknown, status: EntityStatus}>()
);



export const insertLastVerse = createAction(
  '[Storage] Insert Last Verse',
  props<{lastVerse: string}>()
);

export const insertLastVerseSuccess = createAction(
  '[Storage] Insert Last Verse Success',
);

export const insertLastVerseFailure = createAction(
  '[Storage] Insert Last Verse Failure',
   props<{error: unknown}>()
);



export const loadVerses = createAction(
  '[Storage] Load Verses'
);

export const saveVerses = createAction(
  '[Storage] Save Verses',
   props<{verses: Verse[], error: unknown, status: EntityStatus}>()
);



export const insertVerse = createAction(
  '[Storage] Insert Verse',
  props<{verse: Verse}>()
);

export const insertVerseSuccess = createAction(
  '[Storage] Insert Verse Success',
);

export const insertVerseFailure = createAction(
  '[Storage] Insert Verses Failure',
   props<{error: unknown}>()
);



export const deleteVerse = createAction(
  '[Storage] Delete Verse',
  props<{verse: Verse}>()
);

export const deleteVerseSuccess = createAction(
  '[Storage] Delete Verse Success',
);

export const deleteVerseFailure = createAction(
  '[Storage] Delete Verses Failure',
   props<{error: unknown}>()
);
