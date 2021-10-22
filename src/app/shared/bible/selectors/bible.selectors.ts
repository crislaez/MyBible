import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBible from '../reducers/bible.reducer';

export const selectBibleState = createFeatureSelector<fromBible.State>(
  fromBible.bibleFeatureKey
);


export const getBooks = createSelector(
  selectBibleState,
  (state) => state.books
);

export const getMenu = createSelector(
  selectBibleState,
  (state) => state.menu
);

export const getBookMenuStatus = createSelector(
  selectBibleState,
  (state) => state.bookMenuStatus
);

export const getResult = createSelector(
  selectBibleState,
  (state) => state.result
);

export const getSearchStatus = createSelector(
  selectBibleState,
  (state) => state.searchStatus
);

export const getVersesOfDay = createSelector(
  selectBibleState,
  (state) => state.versesOfDay
);

export const getVerseOfDay = createSelector(
  selectBibleState,
  (state) => state.verseOfDay
);

export const getChapter = createSelector(
  selectBibleState,
  (state) => state.chapter
);

export const getChapterStatus = createSelector(
  selectBibleState,
  (state) => state.chapterStatus
);


export const getChaptersByBook = (passageName: string) => createSelector(
  getBooks,
  (getBooks) => {
    // console.log(passageName)
    // console.log(getBooks)
    console.log(getBooks?.find( ({passage}) => passage == passageName)?.chapters)
    return getBooks?.find( ({passage}) => passage == passageName)?.chapters || []
  }
);

export const getVerseStatus = createSelector(
  selectBibleState,
  (state) => state?.verseStatus
);
