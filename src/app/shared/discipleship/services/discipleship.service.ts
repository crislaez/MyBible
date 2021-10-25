import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@bible/core/service/core-config.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DiscipleshipService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig:CoreConfigService) { }


  getDiscipleship(name:string): Observable<any>{
    return of([])
  }


}
