import { IonContent } from "@ionic/angular";

export const checkObject = (object: any): any => {
  return Object.keys(object || {})?.length > 0 ? true : false
}

export const gotToTop = (content: IonContent): void => {
  content.scrollToTop(500);
}


export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};
