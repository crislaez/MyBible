import { Menu } from '@bible/shared/bible/models';
import { IonContent } from "@ionic/angular";


export const checkObject = (object: any): any => {
  return Object.keys(object || {})?.length > 0 ? true : false
}

export const gotToTop = (content: IonContent): void => {
  content.scrollToTop(500);
}

export const trackById = (_: number, item: any): number => {
  return item?.id;
}

export const getChaptersNumber = (englisChapter: string, menu:Menu): string => {
  const [ chapterNumber = null, ...rest ] = englisChapter?.split(' ')?.reverse();
  const bookChapter = englisChapter?.includes('Psalm') ? 'Psalms' : rest?.reverse()?.join(' ');

  return ['Jude', 'Philemon', '2 John', '3 John', 'Obadiah']?.includes(englisChapter)
          ? menu[englisChapter]
          :`${menu[bookChapter] } ${chapterNumber}`;
}

export const reverseText = (text: string) => {
  return text?.split('')?.reverse()?.join('')
}

export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};
