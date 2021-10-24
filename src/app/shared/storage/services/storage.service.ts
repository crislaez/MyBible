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
        let updateVerse = verse;

        if(verse?.includes('Psalm')){
          updateVerse = verse?.includes('Psalms') ? verse : verse?.replace('Psalm','Psalms')
        }

        const splitedUpdateVerse = updateVerse?.split(' ')
        const passageName =  splitedUpdateVerse.slice(0, -1)?.join(' ');
        let passageNumber = splitedUpdateVerse.slice(-1)?.join(' ');

        if(passageNumber?.length === 1 && passageNumber?.includes('0')){
          passageNumber = passageNumber?.replace('0', '')
        }
        const savePassage = passageName +' '+passageNumber

        this.saveLocalVerse(savePassage)
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
