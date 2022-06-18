import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StorageActions } from '@bible/shared/storage';
import { Share } from '@capacitor/share';
import { NavParams, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-poper',
  template: `
    <ion-list lines="none">
      <ion-item detail (click)="sharedContent()">{{ 'COMMON.SEND' | translate }}</ion-item>
      <ion-item detail *ngIf="isSave" (click)="saveVerse()">{{ 'COMMON.SAVE' | translate }}</ion-item>
      <ion-item detail *ngIf="!isSave" (click)="deleteVerse()">{{ 'COMMON.DELETE' | translate }}</ion-item>
      <ion-item detail="false" (click)="close()">{{ 'COMMON.CLOSE' | translate }}</ion-item>
    </ion-list>
  `,
  styleUrls: ['popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {

  verse: {title:string, number:string, body:string}
  isSave:boolean = true;

  constructor(
    public popoverController: PopoverController,
    private navParams: NavParams,
    private store: Store
  ) {
    this.verse = this.navParams.get('verse');
    this.isSave = this.navParams.get('isSave');
  }


  close(): void {
    this.popoverController.dismiss(false)
  }

  saveVerse(): void{
    const verse = {
      title: this.isSave ? this.verseTitle : this.verse?.title,
      body: this.verse?.body
    };

    this.store.dispatch(StorageActions.insertVerse({verse}));
    this.close();
  }

  deleteVerse(): void{
    this.store.dispatch(StorageActions.deleteVerse({verse: this.verse}))
    this.close();
  }

  async sharedContent(){
    await Share.share({
      title: this.isSave ? this.verseTitle : this.verse?.title,
      text: this.verse.body,
      url:`https://www.biblegateway.com/passage/?search=${this.verseTitle?.replace(/ /g,'')}&version=RVR1960`,
      dialogTitle: this.verse?.title
    });

    this.popoverController.dismiss(null)
  }

  get verseTitle(): string{
    const splitTitle = this.verse?.title?.split(' ');
    const lastIndex = (splitTitle || [])?.[splitTitle?.length -1] || '0';

    return [
      ...(lastIndex === '0' ? splitTitle?.slice(0, -1) : splitTitle ),
      ...(lastIndex !== '0' ? [':'] : []),
      ...(this.verse?.number ? [this.verse?.number] : [])
    ].join(' ');
  }

}
