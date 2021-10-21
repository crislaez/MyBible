import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as BibleActions from '@bible/shared/bible/actions/bible.actions';
import { Menu } from '@bible/shared/bible/models';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { checkObject, gotToTop } from '@bible/shared/shared/utils/utils';
import { IonContent, PopoverController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { PoperComponent } from '@bible/shared/generics/components/poper.component';
import { Share } from '@capacitor/share';
import { StorageActions } from '@bible/shared/storage';


@Component({
  selector: 'app-chapter',
  template:`
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container">

        <ng-container *ngIf="(menu$ | async) as menu">
          <ng-container *ngIf="(chapter$ | async) as chapter">
            <ng-container *ngIf="(status$ | async) as status">

              <!-- HEADER  -->
              <div class="header">
                <div class="header-content" *ngIf="(allPassages$ | async) as allPassages">
                  <ng-container *ngIf="allPassages?.length > 0; else noPassages">
                    <ion-button class="background-component text-color-white" size="small" slot="start" *ngFor="let passage of allPassages" (click)="getVerses(passage?.passage)" >{{ getChaptersNumber(passage?.passage, menu) }} </ion-button>
                  </ng-container>

                  <ng-template #noPassages>

                  </ng-template>
                </div>
              </div>

              <ng-container *ngIf="status !== 'pending'; else loader">
                <ng-container *ngIf="status !== 'error'; else serverError">

                  <ng-container *ngIf="!!chapter?.text; else noData">

                    <ng-container *ngIf="checkObject(chapter?.text)">
                      <ion-card class="fade-in-card margin-top background-none align-text">
                        <ion-card-header>
                          <!-- <div> <ion-icon class="medium-text" name="arrow-back-outline" (click)="nextVerse(false, chapter?.passageName)"></ion-icon> </div> -->
                          <ion-card-title class="text-second-color">{{ getFilterName(getChaptersNumber(chapter?.passageName, menu)) }}</ion-card-title>
                          <!-- <div> <ion-icon class="medium-text" name="arrow-forward-outline" (click)="nextVerse(true, chapter?.passageName)"></ion-icon> </div> -->
                        </ion-card-header>
                      </ion-card>

                      <ng-container *ngFor="let numberVerse of getNumberOfVerses(chapter?.text)">
                        <!-- <ion-card class="fade-in-card ion-activatable ripple-parent" ion-long-press [interval]="400" (pressed)="presentPopover($event, getChaptersNumber(chapter?.passageName, menu), numberVerse, chapter?.text[numberVerse] )">
                          <ion-card-content class="text-second-color"><span class="span">{{ numberVerse }}.</span> {{ chapter?.text[numberVerse] }}</ion-card-content>

                          <ion-ripple-effect></ion-ripple-effect>
                        </ion-card> -->
                        <ion-card class="fade-in-card ion-activatable ripple-parent">
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


        <!-- REFRESH -->
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!-- IS ERROR -->
        <ng-template #serverError>
          <div class="error-serve">
            <div>
              <span><ion-icon class="text-second-color big-size" name="cloud-offline-outline"></ion-icon></span>
              <br>
              <span class="text-second-color">{{'COMMON.ERROR' | translate}}</span>
            </div>
          </div>
        </ng-template>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <div class="error-serve">
            <span class="text-second-color">{{'COMMON.NO_DATA' | translate}}</span>
          </div>
        </ng-template>

        <ng-template #loader>
          <ion-spinner class="color-component"></ion-spinner>
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

  chapter$: Observable<{text:any, passageName:string}> = combineLatest([
    this.passageName.pipe(startWith(this.route.snapshot.params?.passage +' 1')),
    this.route.queryParams,
    this.reload$.pipe(startWith(''))
  ]).pipe(
    filter(([passageChange]) => !!passageChange),
    tap(([passageChange, {verseNumber = null}]) => {
      let passage = this.getPassage(passageChange, verseNumber);

      const oneChapterBook = ['Jude 1', '3 John 1', '2 John 1', 'Philemon 1', 'Obadiah 1'];

      if(oneChapterBook?.includes(passageChange))  passage = (passage || '')?.slice(0,-1);

      this.store.dispatch(BibleActions.loadChapter({passage: passage}));
      this.store.dispatch(StorageActions.insertStorage({storage:passage})); //guardar en el storage
    }),
    switchMap(([passageChange, {verseNumber = null}]) =>
      this.store.pipe(select(fromBible.getChapter),
        map(text => {
          let passage = this.getPassage(passageChange, verseNumber);
          return {text, passageName: passage}
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
    this.router.navigate( ['.'], { relativeTo: this.route });
    this.passageName.next(passage)
  }

  getNumberOfVerses(allverses: any): string[]{
    return Object.keys(allverses || {})
  }

  getFilterName(passageChange:string): string{
    const oneChapterBook = ['Judas 1', '3 Juan 1', '2 Juan 1', 'Filemón 1', 'Abdías 1'];
    return oneChapterBook?.includes(passageChange) ? (passageChange || '')?.slice(0,-1) : passageChange;
  }

  getPassage(passageChange: string, number: string): string {
    if(!!number){
      const splitedVerse = passageChange?.split(' ') || [];
      const [firstItem = '', secondItem = ''] = splitedVerse
      let verseText = firstItem;
      // let verseNumber = secondItem || '1'

      if(splitedVerse.length === 3){
        verseText = verseText+' '+secondItem
        // verseNumber = thirdItem || '1'
      }

      return verseText+' '+number;
    }

    return passageChange;
  }

  // nextVerse(bool: boolean, actualPassage: string): void{
  //   // this.router.navigate( ['.'], { relativeTo: this.route });
  //   let splitedActualPassage = (actualPassage || '')?.split('')
  //   let passage = splitedActualPassage.slice(0, -1)?.join('')
  //   let nextPage = !!bool ? Number(splitedActualPassage.slice(-1)) + 1 : Number(splitedActualPassage.slice(-1)) - 1

  //   console.log(bool)
  //   console.log(actualPassage)
  //   console.log(passage?.trim() +' '+ nextPage)
  // }

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
