import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly verse = 'myBibleCl';


  constructor() { }


  getVerse(): Observable<any>{
    return from(this.loadVerse()).pipe(
      map(verse => {
        let response = verse
        if(response?.length === 0) response = '';
        return (response || '');
      })
    )
  }

  saveVerse(verse: string): Observable<any>{
    return from(this.loadVerse()).pipe(
      map(data => {
        this.saveLocalVerse(verse)
        return {code:200}
      })
    )
  }

  async loadVerse(){
    const verse = await Storage.get({key: this.verse})
    return await JSON.parse(verse?.value) || []
  }

  async saveLocalVerse(verse: string){
    await Storage.set({key: this.verse, value: JSON.stringify(verse)})
  }
}
