import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Verse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly storageKeyLast = 'myBibleLastVerse';
  readonly storageKeyVerse = 'myBibleVerses';


  constructor() { }


  getLastVerse(verse:string): Observable<any>{
    return from(this.loadVerse(verse)).pipe(
      map(verse => {
        let response = verse
        if(response?.length === 0) response = '';
        return (response || '');
      })
    )
  }

  savelastVerse(verse: string): Observable<any>{
    return from(this.loadVerse(this.storageKeyLast)).pipe(
      tap(() => {
        const updateVerse = verse?.includes('Psalm')
                          ? verse?.includes('Psalms') ? verse : verse?.replace('Psalm','Psalms')
                          : verse;

        const splitedVerse = updateVerse?.split(' ');
        const passageName =  splitedVerse.slice(0, -1)?.join(' ');
        let passageNumber = splitedVerse.slice(-1)?.join(' ');

        if(passageNumber?.length === 1 && passageNumber?.includes('0')){
          passageNumber = passageNumber?.replace('0', '')
        }

        const savePassage = passageName +' '+ passageNumber;
        this.saveLocalVerse(savePassage, this.storageKeyLast);
      })
    )
  }

  getAllVerse(verse:string): Observable<any>{
    return from(this.loadVerse(verse)).pipe(
      map(verse => (verse || []))
    )
  }

  insetVerse(verse:Verse): Observable<any>{
    return from(this.loadVerse(this.storageKeyVerse)).pipe(
      tap(storageVerses => {
        const notRepeatVerses = (storageVerses || [])?.filter(({title}) => title !== verse?.title);

        const body = [
          ...(notRepeatVerses?.length > 0 ? notRepeatVerses : []),
          ...(verse ? [verse] : [])
        ];

        this.saveLocalVerse(body, this.storageKeyVerse)
      })
    );
  }

  deleteVerse(verse:Verse): Observable<any>{
    return from(this.loadVerse(this.storageKeyVerse)).pipe(
      tap(storageVerses => {
        const filterVerses = (storageVerses || [])?.filter(({title}) => title !== verse?.title);
        this.saveLocalVerse(filterVerses, this.storageKeyVerse);
      })
    );
  }

  async loadVerse(key:string){
    const verse = await Storage.get({key})
    return await JSON.parse(verse?.value) || [];
  }

  async saveLocalVerse(verse: any, key:string){
    await Storage.set({key, value: JSON.stringify(verse)})
  }


}
