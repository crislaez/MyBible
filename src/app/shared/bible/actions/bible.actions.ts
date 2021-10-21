import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createAction, props } from '@ngrx/store';
import { Book, Menu, Verse } from '../models';


export const loadBooks = createAction(
  '[Bible] Load Bible'
);

export const saveBooks = createAction(
  '[Bible] Save Bible',
   props<{books: Book[], error: unknown, status: EntityStatus}>()
);



export const loadMenu = createAction(
  '[Bible] Load Menu'
);

export const saveMenu = createAction(
  '[Bible] Save Menu',
   props<{menu: Menu, error: unknown, status: EntityStatus}>()
);




export const loadSearch = createAction(
  '[Bible] Load Search',
  props<{search: string}>()
);

export const saveSearch = createAction(
  '[Bible] Save Search',
   props<{result: string,  error: unknown, status: EntityStatus}>()
);



export const loadChapter = createAction(
  '[Bible] Load Chapter',
  props<{passage: string}>()
);

export const saveChapter = createAction(
  '[Bible] Save Chapter',
   props<{chapter: {[key:string]:string}, status:EntityStatus, error:unknown}>()
);



export const loadVerseOfDay = createAction(
  '[Bible] Load Verse Of Day',
  props<{passage: string}>()
);

export const saveVerseOfDay = createAction(
  '[Bible] Save Verse Of Day',
   props<{verseOfDay: Verse, status:EntityStatus, error:unknown}>()
);



export const loadAllVerseOfDay = createAction(
  '[Bible] Load all Verse Of Day'
);

export const saveAllVerseOfDay = createAction(
  '[Bible] Save all Verse Of Day',
   props<{versesOfDay: Verse[], status:EntityStatus, error:unknown}>()
);
