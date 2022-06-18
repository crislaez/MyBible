import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@bible/core/service/core-config.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Book, ResponseBooks } from '../models';
import * as spanisPassages from './books.json';
import * as versesOfDays from './verse-days.json';


@Injectable({
  providedIn: 'root'
})
export class BibleService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig:CoreConfigService) { }


  getBible(): Observable<Book[]>{
    return this.http.get<ResponseBooks>(`${this.baseURL}contents/RVR60.js?culture=es&key=${this._coreConfig.getKey()}`,{ headers: this.headers }).pipe(
      switchMap(({books}) =>
        of(spanisPassages).pipe(
          map((spanisPassage) => {
            const {result:spanishBook = null} = spanisPassage || {};
            return books?.map(book => {
              return {
                ...book,
                spanishPassage: spanishBook?.[book?.passage]
              }
            }) || []
          })
        )
      ),
      catchError((error) => {
        return throwError(error)
      })
    )
  };

  getVerses(name: string): Observable<any>{
    return this.http.get(`${this.baseURL}content/RVR60.js?passage=${name}&style=orationOneVersePerLine&key=${this._coreConfig.getKey()}`,{ headers: this.headers }).pipe(
      map(response => (response || {})),
      catchError((error) => {
        return throwError(error)
      })
    )
  };

  getBibleSearch(search): Observable<any>{
    return this.http.get<any>(`${this.baseURL}search/RVR60.js?query=${search}&key=${this._coreConfig.getKey()}`,{ headers: this.headers }).pipe(
      map(response => {
        const {results = null} = response || {};
        const [{preview = ''}] = results || [];
        return preview || '';
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  };

  getVersesOfDay(name: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}content/RVR60.js?passage=${name}&style=orationOneVersePerLine&key=${this._coreConfig.getKey()}`,{ headers: this.headers }).pipe(
      map((response) => (response || {}) ),
      catchError((error) => {
        return throwError(error)
      })
    )
  };

  getSpanishMenu(): Observable<any>{
    return of(spanisPassages).pipe(
      map(response => (response?.result || {}))
    );
  }

  getAllVersesOfDay(): Observable<{title: string, verse: string}[]>{
    return of(versesOfDays).pipe(
      map(response => (response?.result || []))
    );
  }

  get headers():HttpHeaders{
    return new HttpHeaders({
      'Accept-Language': 'es',
    });
  }



}
