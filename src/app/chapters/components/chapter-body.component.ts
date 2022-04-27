import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getChaptersNumber } from '@bible/shared/shared/utils/utils';


@Component({
  selector: 'app-chapter-body',
  template:`
  <ion-card class="fade-in-card background-none align-text">
    <ion-card-header class="flex-content">
      <ion-button fill="clear" [disabled]="chapter?.passageNumber === 1 || chapter?.passageNumber === 0" (click)="onNextVerse(false, chapter?.passageName, allPassages)"> <ion-icon class="medium-text" name="chevron-back-outline"></ion-icon> </ion-button>
      <ion-card-title class="text-second-color">{{ getFilterName(getChaptersNumber(chapter?.passageName, menu)) }}</ion-card-title>
      <ion-button fill="clear" [disabled]="chapter?.passageNumber === allPassages?.length || chapter?.passageNumber === 0" (click)="onNextVerse(true, chapter?.passageName, allPassages)"> <ion-icon class="medium-text" name="chevron-forward-outline"></ion-icon> </ion-button>
    </ion-card-header>
  </ion-card>

  <ng-container *ngFor="let numberVerse of getNumberOfVerses(chapter?.text)">
    <ion-card
      class="fade-in-card components-color-ligth"
      ion-long-press
      [interval]="400"
      (pressed)="onPresentPopover($event, getChaptersNumber(chapter?.passageName, menu), numberVerse, chapter?.text[numberVerse] )">
      <ion-card-content class="text-second-color">
        <span class="span">{{ numberVerse }}.</span> {{ chapter?.text[numberVerse] }}
      </ion-card-content>

      <ion-ripple-effect></ion-ripple-effect>
    </ion-card>
    </ng-container>
  `,
  styleUrls: ['./chapter-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChapterBodyComponent {

  getChaptersNumber = getChaptersNumber;
  @Input() chapter: any;
  @Input() menu: any;
  @Input() allPassages: {passage: string}[];
  @Output() presentPopover = new EventEmitter<{ev: Event, title:string, number:string, body:string}>();
  @Output() nextVerse = new EventEmitter<{bool: boolean, actualPassage: string, allPassages: {passage: string}[]}>();


  constructor() { }


  onPresentPopover(ev: Event, title:string, number:string, body:string): void{
    this.presentPopover.next({ev, title, number, body});
  }

  onNextVerse(bool, actualPassage, allPassages): void{
    this.nextVerse.next({bool, actualPassage, allPassages});
  }

  getNumberOfVerses(allverses: any): string[]{
    return Object.keys(allverses || {})
  }

  getFilterName(passageChange:string): string{
    const oneChapterBook = ['Judas 0', '3 Juan 0', '2 Juan 0', 'Filemón 0', 'Abdías 0'];
    return oneChapterBook?.includes(passageChange)
            ? (passageChange || '')?.slice(0,-1)
            : passageChange;
  }



}
