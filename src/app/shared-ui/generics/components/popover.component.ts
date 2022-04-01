import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Share } from '@capacitor/share';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-poper',
  template: `
    <ion-list lines="none">
      <ion-item detail (click)="sharedContent()">{{ 'COMMON.SEND' | translate }}</ion-item>
      <ion-item detail="false" (click)="close()">{{ 'COMMON.CLOSE' | translate }}</ion-item>
    </ion-list>
  `,
  styleUrls: ['popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {

  bookName:string = '';
  numberVerse:string = '';
  verse:string = '';


  constructor(
    public popoverController: PopoverController,
    private navParams: NavParams
  ) {
    this.bookName = this.navParams.get('bookName')
    this.numberVerse = this.navParams.get('numberVerse')
    this.verse = this.navParams.get('verse')
  }


  close():void {
    this.popoverController.dismiss(false)
  }

  async sharedContent(){
    await Share.share({
      title: this.bookName,
      text: `${this.numberVerse}. ${this.verse}`,
      url:'',
      dialogTitle: this.bookName,
    });

    this.popoverController.dismiss(null)
  }


}
