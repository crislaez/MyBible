import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createAction, props } from '@ngrx/store';

export const loadStorage = createAction(
  '[Storage] Load Storage'
);

export const saveStorage = createAction(
  '[Storage] Save Storage',
   props<{storage: string, error: unknown, status: EntityStatus}>()
);


export const insertStorage = createAction(
  '[Storage] Insert Storage',
  props<{storage: string}>()
);

export const insertStorageSuccess = createAction(
  '[Storage] Insert Storage Success',
   props<{message?:string}>()
);


export const insertStorageFailure = createAction(
  '[Storage] Insert Storage Failure',
   props<{message: string, error: unknown}>()
);
