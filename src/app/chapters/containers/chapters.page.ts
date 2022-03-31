import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoperComponent } from '@bible/shared-ui/generics/components/poper.component';
import * as BibleActions from '@bible/shared/bible/actions/bible.actions';
import { Menu } from '@bible/shared/bible/models';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { checkObject, gotToTop } from '@bible/shared/shared/utils/utils';
import { StorageActions } from '@bible/shared/storage';
import { Share } from '@capacitor/share';
import { IonContent, PopoverController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-chapter',
  template:`
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container">

        <ng-container *ngIf="(menu$ | async) as menu">
          <ng-container *ngIf="(chapter$ | async) as chapter">
            <ng-container *ngIf="(status$ | async) as status">

              <!-- HEADER  -->
              <ng-container *ngIf="(allPassages$ | async) as allPassages">
                <div class="header">
                  <div class="header-content" >
                    <ng-container *ngIf="allPassages?.length > 0; else noPassages">
                      <ion-button class="background-component text-color-white" size="small" slot="start" *ngFor="let passage of allPassages" (click)="getVerses(passage?.passage)" >{{ getChaptersNumber(passage?.passage, menu) }} </ion-button>
                    </ng-container>
<!--
                    <ion-segment>
                      <ng-container *ngIf="allPassages?.length > 0; else noPassages">
                        <ion-segment-button *ngFor="let passage of allPassages" (click)="getVerses(passage?.passage)" value="">
                        {{ getChaptersNumber(passage?.passage, menu) }}
                        </ion-segment-button>
                      </ng-container>
                    </ion-segment> -->

                    <ng-template #noPassages>

                    </ng-template>
                  </div>
                </div>

                <ng-container *ngIf="status !== 'pending'; else loader">
                  <ng-container *ngIf="status !== 'error'; else serverError">

                    <ng-container *ngIf="!!chapter?.text; else noData">

                      <ng-container *ngIf="checkObject(chapter?.text)">
                        <ion-card class="fade-in-card margin-top background-none align-text">
                          <ion-card-header class="flex-content">
                            <ion-button fill="clear" [disabled]="chapter?.passageNumber === 1 || chapter?.passageNumber === 0" (click)="nextVerse(false, chapter?.passageName, allPassages)"> <ion-icon class="medium-text" name="chevron-back-outline"></ion-icon> </ion-button>
                            <ion-card-title class="text-second-color">{{ getFilterName(getChaptersNumber(chapter?.passageName, menu)) }}</ion-card-title>
                            <ion-button fill="clear" [disabled]="chapter?.passageNumber === allPassages?.length || chapter?.passageNumber === 0" (click)="nextVerse(true, chapter?.passageName, allPassages)"> <ion-icon class="medium-text" name="chevron-forward-outline"></ion-icon> </ion-button>
                          </ion-card-header>
                        </ion-card>

                        <ng-container *ngFor="let numberVerse of getNumberOfVerses(chapter?.text)">
                          <!-- <ion-card class="fade-in-card ion-activatable ripple-parent" ion-long-press [interval]="400" (pressed)="presentPopover($event, getChaptersNumber(chapter?.passageName, menu), numberVerse, chapter?.text[numberVerse] )">
                            <ion-card-content class="text-second-color"><span class="span">{{ numberVerse }}.</span> {{ chapter?.text[numberVerse] }}</ion-card-content>

                            <ion-ripple-effect></ion-ripple-effect>
                          </ion-card> -->
                          <ion-card class="fade-in-card ion-activatable ripple-parent components-color-ligth">
                            <ion-card-content class="text-second-color"><span class="span">{{ numberVerse }}.</span> {{ chapter?.text[numberVerse] }}</ion-card-content>

                            <ion-ripple-effect></ion-ripple-effect>
                          </ion-card>
                        </ng-container>
                      </ng-container>

                    </ng-container>
                  </ng-container>
                </ng-container>
              </ng-container>

            </ng-container>
          </ng-container>

        </ng-container>


        <!-- REFRESH -->
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!-- IS ERROR -->
        <ng-template #serverError>
          <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'0vh'"></app-no-data>
        </ng-template>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <app-no-data [title]="'COMMON.NO_DATA'" [image]="'assets/images/empty.png'" [top]="'0vh'"></app-no-data>
        </ng-template>

        <ng-template #loader>
          <app-spinner ></app-spinner>
        </ng-template>
      </div>

      <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="background-component text-color-white" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styleUrls: ['./chapters.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChaptersPage {

  @ViewChild(IonContent, {static: true}) content: IonContent;
  checkObject = checkObject;
  gotToTop = gotToTop;
  showButton: boolean = false;

  passageName = new EventEmitter();
  status$ = this.store.select(fromBible.getChapterStatus);
  menu$ = this.store.select(fromBible.getMenu);
  reload$ = new EventEmitter<string>();

  chapter$: Observable<{text:any, passageName:string, passageNumber:number}> = combineLatest([
    this.route.params,
    this.route.queryParams,
    this.reload$.pipe(startWith(''))
  ]).pipe(
    filter(([{passage}, {verseNumber}]) => !!passage && !!verseNumber),
    tap(([{passage}, {verseNumber}]) => {
      const passaAndVersename = passage+' '+verseNumber;
      this.store.dispatch(BibleActions.loadChapter({passage: passaAndVersename}));
      this.store.dispatch(StorageActions.insertStorage({storage:passaAndVersename}));
    }),
    switchMap(([{passage}, {verseNumber}]) =>
      this.store.pipe(select(fromBible.getChapter),
        map(text => {
          const passaAndVersename = passage+' '+verseNumber;
          return {text, passageName: passaAndVersename, passageNumber:Number(verseNumber)}
        })
      )
    )
  );

  allPassages$: Observable<any> = this.route.params.pipe(
    switchMap(({passage}) => this.store.pipe(select(fromBible.getChaptersByBook(passage))))
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    public popoverController: PopoverController
  ) { }


  getChaptersNumber(englisChapter: string, menu:Menu): string{
    const chapterSplited = (englisChapter || '')?.split(' ');
    const firstChapterNumber = chapterSplited[chapterSplited?.length -3] || '';
    const chapter: any = chapterSplited[chapterSplited?.length -2] || '';
    const number = chapterSplited[chapterSplited?.length -1] || '';

    let property = !!firstChapterNumber ? firstChapterNumber+' '+chapter: chapter
    return !chapter || !isNaN(chapter)
          ? chapter +' '+ menu[number] || englisChapter
          : (menu[property] || chapter) +' '+ number
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  doRefresh(event) {
    setTimeout(() => {
      this.reload$.next('')

      event.target.complete();
    }, 500);
  }

  getVerses(passage: string): void{
    let passageFilter = passage;
    const oneChapterBook = ['Jude', '3 John', '2 John', 'Philemon', 'Obadiah'];

    if(oneChapterBook?.includes(passage)){
      passageFilter = passageFilter+' 0'
    }

    const splitedPassage = passageFilter?.split(' ')
    let passageName = splitedPassage?.slice(0, -1)?.join(' ')
    const passageNumber = splitedPassage?.slice(-1)?.join(' ') || '1';

    if(passageName?.includes('Psalm')){
      passageName = passageName?.includes('Psalms') ? passageName : passageName?.replace('Psalm','Psalms')
    }

    this.router.navigate( ['/chapter/'+ passageName], { queryParams: {verseNumber: passageNumber}});
  }

  getNumberOfVerses(allverses: any): string[]{
    return Object.keys(allverses || {})
  }

  getFilterName(passageChange:string): string{
    const oneChapterBook = ['Judas 0', '3 Juan 0', '2 Juan 0', 'Filemón 0', 'Abdías 0'];
    return oneChapterBook?.includes(passageChange) ? (passageChange || '')?.slice(0,-1) : passageChange;
  }

  nextVerse(bool: boolean, actualPassage: string, allPassages: {passage: string}[]): void{
    const splitedPassage = actualPassage?.split(' ');
    const passageName = splitedPassage?.slice(0, -1)?.join(' ');
    const passageNumber = Number(splitedPassage?.slice(-1)?.join('') ||'');
    const nextPageNumber = !!bool ? passageNumber + 1 : passageNumber - 1;

    if(nextPageNumber > 0 && nextPageNumber <= allPassages?.length){
      this.router.navigate( ['/chapter/'+ passageName], { queryParams: {verseNumber: nextPageNumber}});
    }
  }

  async presentPopover(ev: any, bookName: string, numberVerse: string, verse: string) {
    const popover = await this.popoverController.create({
      component: PoperComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps:{
        button:'save'
      }
    });
    await popover.present();

    const { role, data } = await popover.onDidDismiss();

    if(data){
      await this.sharedContent(bookName, `${numberVerse}. ${verse}`)
    }
  }

  async sharedContent(title: string, text: string){
    await Share.share({
      title,
      text,
      url:'',
      dialogTitle: title,
    });
   }


}
