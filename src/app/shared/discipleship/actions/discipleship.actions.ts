import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createAction, props } from '@ngrx/store';
// import { Book, Menu, Verse } from '../models';


export const loadDiscipleship = createAction(
  '[Discipleship] Load Discipleship',
  props<{name: string}>()
);

export const saveDiscipleship = createAction(
  '[Discipleship] Save Discipleship',
   props<{discipleship: any[], error: unknown, status: EntityStatus}>()
);
