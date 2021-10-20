import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@bible/core/service/core-config.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  spanisPassages: {[key:string]:string} = {
    'Genesis':'Gènesis',
    'Exodus':'Éxodo',
    'Leviticus': 'Levítico',
    'Numbers':'Números',
    'Deuteronomy':'Deuteronomio',
    'Joshua':'Josué',
    'Judges':'Jueces',
    'Ruth':'Rut',
    '1 Samuel':'1 Samuel',
    '2 Samuel':'2 Samuel',
    '1 Kings':'1 Reyes',
    '2 Kings':'2 Reyes',
    '1 Chronicles':'1 Crónicas',
    '2 Chronicles':'2 Crónicas',
    'Ezra':'Esdras',
    'Nehemiah':'Nehemías',
    'Esther':'Ester',
    'Job':'Job',
    'Psalms':'Salmos',
    'Proverbs':'Proverbios',
    'Ecclesiastes':'Eclesiastés',
    'Song of Solomon':'Cantar de los Cantares',
    'Isaiah':'Isaías',
    'Jeremiah':'Jeremías',
    'Lamentations':'Lamentaciones',
    'Ezekiel':'Ezequiel',
    'Daniel':'Daniel',
    'Hosea':'Oseas',
    'Joel':'Joel',
    'Amos':'Amós',
    'Obadiah':'Abdías',
    'Jonah':'Jonás',
    'Micah':'Miqueas',
    'Nahum':'Nahúm',
    'Habakkuk':'Habacuc',
    'Zephaniah':'Sofonías',
    'Haggai':'Hageo',
    'Zechariah':'Zacarías',
    'Malachi':'Malaquías',
    'Matthew':'Mateo',
    'Mark':'Marcos',
    'Luke':'Lucas',
    'John':'Juan',
    'Acts':'Hechos',
    'Romans':'Romanos',
    '1 Corinthians':'1 Corintios',
    '2 Corinthians':'2 Corintios',
    'Galatians':'Gálatas',
    'Ephesians':'Efesios',
    'Philippians':'Filipenses',
    'Colossians':'Colosenses',
    '1 Thessalonians':'1 Tesalonicenses',
    '2 Thessalonians':'2 Tesalonicenses',
    '1 Timothy':'1 Timoteo',
    '2 Timothy':'2 Timoteo',
    'Titus':'Tito',
    'Philemon':'Filemón',
    'Hebrews':'Hebreos',
    'James':'Santiago',
    '1 Peter':'1 Pedro',
    '2 Peter':'2 Pedro',
    '1 John':'1 Juan',
    '2 John':'2 Juan',
    '3 John':'3 Juan',
    'Jude':'Judas',
    'Revelation':'Apocalipsis'
  };

  versesOfDays: {title: string, verse: string}[] =
  [
    {title: 'Hambre de la palabra de Dios', verse:'Amos 8:4-14'},
    {title: 'A quién debemos temer', verse:'Lucas 12:4-7'},
    {title: 'El afán y la ansiedad', verse:'Lucas 12:22-31'},
    {title: 'Arréglate con tu adversario', verse:'Lucas 12:57-59'},
    {title: 'La puetra estrecha', verse:'Lucas 13:22-30'},
    {title: 'Diez leprosos son limpiados', verse:'Lucas 17:11-19'},
    {title: '¿De quién es hijo el Cristo?', verse:'Lucas 20:41-44'},
    {title: 'El Señor Jesús previene contra los escribas', verse:'Lucas 20:45-47'},
    {title: 'Palabras de vida eterna', verse:'Juan 6:60-71'},
    {title: 'De tal manera amó Dios al mundo', verse:'Juan 3:16-21'},
    {title: 'Jesús el Buen pastor', verse:'Juan 9:7-21'},
    {title: 'Jesucristo, la resurección y la vida', verse:'Juan 11:17-27'},
    {title: 'La sal y la tierra', verse:'Mateo 5:13'},
    {title: 'La luz del mundo', verse:'Mateo 5:14-16'},
    {title: 'Jesucristo y la ley', verse:'Mateo 5:17-20'},
    {title: 'Jesucristo y la ira', verse:'Mateo 5:21-26'},
    {title: 'Jesucristo y el adulterio', verse:'Mateo 5:27-30'},
    {title: 'Jesucristo y el divorcio', verse:'Mateo 5:31-32'},
    {title: 'Jesucristo y los juramentos', verse:'Mateo 5:33-37'},
    {title: 'El amor a los enemigos', verse:'Mateo 5:38-48'},
    {title: 'Jesucristo y la limosna', verse:'Mateo 6:1-4'},
    {title: 'Jesucristo y la oración', verse:'Mateo 6:5-15'},
    {title: 'Jesucristo y el ayuno', verse:'Mateo 6:16-18'},
    {title: 'Tesoros en el cielo', verse:'Mateo 6:19-21'},
    {title: 'La lámpara del cuerpo', verse:'Mateo 6:22-23'},
    {title: 'Jehová es mi pastor', verse:'Salmos 23:1-6'},
    {title: 'Súplica implorando el perdón', verse:'Salmos 38:1-22'},
    {title: 'Exhortación a la gratitud', verse:'Salmos 100:1-5'},
    {title: 'El sacerdocio del Mesías', verse:'Salmos 110:1-7'},
    {title: 'Jehová es tu guardador', verse:'Salmos 121:1-8'},
    {title: 'Confiando en Dios como un niño', verse:'Salmos 131:1-3'}
  ];


  constructor(private http: HttpClient, private _coreConfig:CoreConfigService) { }


  getBible(): Observable<any>{
    const headers =  new HttpHeaders({
      'Accept-Language': 'es',
    });

    return this.http.get<any>(`${this.baseURL}contents/RVR60.js?culture=es&key=${this._coreConfig.getKey()}`,{ headers }).pipe(
      map(response => (response || {})),
      catchError((error) => {
        return throwError(error)
      })
    )
  };

  getVerses(name: string): Observable<any>{
    const headers =  new HttpHeaders({
      'Accept-Language': 'es',
    });

    return this.http.get(`${this.baseURL}content/RVR60.js?passage=${name}&style=orationOneVersePerLine&key=${this._coreConfig.getKey()}`,{ headers }).pipe(
      map(response => (response || {})),
      catchError((error) => {
        return throwError(error)
      })
    )
  };

  getBibleSearch(search): Observable<any>{
    const headers =  new HttpHeaders({
      'Accept-Language': 'es',
    });

    return this.http.get<any>(`${this.baseURL}search/RVR60.js?query=${search}&key=${this._coreConfig.getKey()}`,{ headers }).pipe(
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
    const headers =  new HttpHeaders({
      'Accept-Language': 'es',
    });

    return this.http.get<any>(`${this.baseURL}content/RVR60.js?passage=${name}&style=orationOneVersePerLine&key=${this._coreConfig.getKey()}`,{ headers }).pipe(
      map((response) => (response || {}) ),
      catchError((error) => {
        return throwError(error)
      })
    )
  };

  getSpanishMenu(): Observable<any>{
    return of(this.spanisPassages || [])
  }

  getAllVersesOfDay(): Observable<{title: string, verse: string}[]>{
    return of(this.versesOfDays || [])
  }



}
