import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createReducer, on } from '@ngrx/store';
import * as DiscipleshipActions from '../actions/discipleship.actions';


export const discipleshipFeatureKey = 'discipleship';

export interface State{
  status?: EntityStatus;
  discipleship?: any[];
  error?: unknown;
}

const initialState: State = {
  status: EntityStatus.Initial,
  discipleship:[],
  error:undefined
}


export const reducer = createReducer(
  initialState,
  on(DiscipleshipActions.loadDiscipleship, (state) => ({...state, status: EntityStatus.Pending})),
  on(DiscipleshipActions.saveDiscipleship, (state, { discipleship, error, status }) => ({...state, discipleship, error, status })),

);
