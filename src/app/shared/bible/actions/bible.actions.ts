import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createAction, props } from '@ngrx/store';
import { Book, Menu, Verse } from '../models';


export const loadBooks = createAction(
  '[Bible] Load bible'
);

export const saveBooks = createAction(
  '[Bible] Save bible',
   props<{books: Book[], error: unknown, status: EntityStatus}>()
);



export const loadMenu = createAction(
  '[Bible] Load menu'
);

export const saveMenu = createAction(
  '[Bible] Save menu',
   props<{menu: Menu, error: unknown, status: EntityStatus}>()
);




export const loadSearch = createAction(
  '[Bible] Load search',
  props<{search: string}>()
);

export const saveSearch = createAction(
  '[Bible] Save search',
   props<{result: string,  error: unknown, status: EntityStatus}>()
);



export const loadChapter = createAction(
  '[Bible] Load chapter',
  props<{passage: string}>()
);

export const saveChapter = createAction(
  '[Bible] Save chapter',
   props<{chapter: {[key:string]:string}, status:EntityStatus, error:unknown}>()
);



export const loadVerseOfDay = createAction(
  '[Bible] Load verse of day',
  props<{passage: string}>()
);

export const saveVerseOfDay = createAction(
  '[Bible] Save verse of day',
   props<{verseOfDay: Verse, status:EntityStatus, error:unknown}>()
);



export const loadAllVerseOfDay = createAction(
  '[Bible] Load all verse of day'
);

export const saveAllVerseOfDay = createAction(
  '[Bible] Save all verse of day',
   props<{versesOfDay: Verse[], status:EntityStatus, error:unknown}>()
);



// export const loadFailure = createAction(
//   '[Bible] Save bible',
//    props<{message: string}>()
// );
