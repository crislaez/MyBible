import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-poper',
  template: `
  <ion-list>
    <ion-item button (click)="send(true)">{{ 'COMMON.SEND' | translate }}</ion-item>
    <ion-item lines="none" detail="false" button (click)="send(false)">{{ 'COMMON.CLOSE' | translate }}</ion-item>
  </ion-list>
  `,
  styleUrls: ['poper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoperComponent {

  option: string = '';


  constructor(public popoverController: PopoverController) { }


  send(bool:boolean): void{
    this.popoverController.dismiss(bool)
  }


}
