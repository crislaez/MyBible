import { EntityStatus } from '@bible/shared/shared/utils/utils';
import { createReducer, on } from '@ngrx/store';
import * as BibleActions from '../actions/bible.actions';
import { Book, Menu, Verse } from '../models';

export const bibleFeatureKey = 'bible';

export interface State{
  bookMenuStatus?: EntityStatus;
  books?: Book[];
  menu?: Menu;

  searchStatus?: EntityStatus;
  search?: string;
  result?: string;

  chapterStatus?: EntityStatus;
  chapter?: {[key:string]:string};

  verseStatus?: EntityStatus;
  versesOfDay?: Verse[];
  verseOfDay?: any;
  error?: unknown;
}

const initialState: State = {
  bookMenuStatus: EntityStatus.Initial,
  books:[],
  menu:{},

  searchStatus: EntityStatus.Initial,
  search: '',
  result: '',

  chapterStatus: EntityStatus.Initial,
  chapter:{},

  verseStatus: EntityStatus.Initial,
  versesOfDay:[],
  verseOfDay:{},

  error:undefined
}


export const reducer = createReducer(
  initialState,
  on(BibleActions.loadBooks, (state) => ({...state, bookMenuStatus: EntityStatus.Pending})),
  on(BibleActions.saveBooks, (state, { books, error, status }) => ({...state, books, error, bookMenuStatus: status })),

  on(BibleActions.loadMenu, (state) => ({...state, bookMenuStatus: EntityStatus.Pending})),
  on(BibleActions.saveMenu, (state, { menu, error, status }) => ({...state, menu, error, bookMenuStatus: status })),

  on(BibleActions.loadSearch, (state, {search}) => ({...state, search, error:undefined, searchStatus: EntityStatus.Pending})),
  on(BibleActions.saveSearch, (state, { result, error, status }) => ({...state, result, error, searchStatus: status})),

  on(BibleActions.loadChapter, (state) => ({...state, error:undefined, chapterStatus: EntityStatus.Pending})),
  on(BibleActions.saveChapter, (state, { chapter, status, error }) => ({...state, chapter, error, chapterStatus: status })),

  on(BibleActions.loadAllVerseOfDay, (state) => ({...state,error:undefined, verseStatus: EntityStatus.Pending })),
  on(BibleActions.saveAllVerseOfDay, (state, { versesOfDay, error, status }) => ({...state, versesOfDay, error, verseStatus: status })),

  on(BibleActions.loadVerseOfDay, (state) => ({...state,error:undefined, verseStatus: EntityStatus.Pending })),
  on(BibleActions.saveVerseOfDay, (state, { verseOfDay, error, status }) => ({...state, verseOfDay, error, verseStatus: status })),
);
