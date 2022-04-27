import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverComponent } from '@bible/shared-ui/generics/components/popover.component';
import * as BibleActions from '@bible/shared/bible/actions/bible.actions';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { checkObject, getChaptersNumber, gotToTop } from '@bible/shared/shared/utils/utils';
import { StorageActions } from '@bible/shared/storage';
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
                    <ng-container *ngIf="allPassages?.length > 0">
                      <ion-segment scrollable (ionChange)="segmentChanged($any($event))" [(ngModel)]="selected">
                        <ion-segment-button *ngFor="let passage of allPassages; let i = index;" [id]="passage?.passage" [value]="passage?.passage" class="title-color-primary">
                          <ion-label>{{ getChaptersNumber(passage?.passage, menu) }}</ion-label>
                        </ion-segment-button>
                      </ion-segment>
                    </ng-container>
                  </div>
                </div>

                <ng-container *ngIf="status !== 'pending'; else loader">
                  <ng-container *ngIf="status !== 'error'; else serverError">
                    <ng-container *ngIf="!!chapter?.text; else noData">
                      <ng-container *ngIf="checkObject(chapter?.text)">
                        <app-chapter-body
                          [chapter]="chapter"
                          [menu]="menu"
                          [allPassages]="allPassages"
                          (presentPopover)="presentPopover($event)"
                          (nextVerse)="nextVerse($event)">
                        </app-chapter-body>
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
          <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'30vh'"></app-no-data>
        </ng-template>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <app-no-data [title]="'COMMON.NO_DATA'" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
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


  checkObject = checkObject;
  gotToTop = gotToTop;
  getChaptersNumber = getChaptersNumber;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;

  passageName = new EventEmitter();
  status$ = this.store.select(fromBible.getChapterStatus);
  menu$ = this.store.select(fromBible.getMenu);
  reload$ = new EventEmitter<string>();
  selected = '';
  chapter$: Observable<{text:any, passageName:string, passageNumber:number}> = combineLatest([
    this.route.params,
    this.route.queryParams,
    this.reload$.pipe(startWith(''))
  ]).pipe(
    filter(([{passage}, {verseNumber}]) => !!passage && !!verseNumber),
    tap(([{passage}, {verseNumber}]) => {
      const passaAndVersename = passage+' '+verseNumber;
      this.store.dispatch(BibleActions.loadChapter({passage: passaAndVersename}));
      this.store.dispatch(StorageActions.insertLastVerse({lastVerse:passaAndVersename}));
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
  ) {
    this.selected = this.getParamsData();
    console.log('selected -> ',this.selected)
  }



  ionViewWillEnter(): void{
    setTimeout(() => {
      this.slideChangedScroll(this.getParamsData())
    },1000)
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // REFRESH
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

  nextVerse({bool, actualPassage, allPassages}): void{
    const splitedPassage = actualPassage?.split(' ');
    const passageName = splitedPassage?.slice(0, -1)?.join(' ');
    const passageNumber = Number(splitedPassage?.slice(-1)?.join('') ||'');
    const nextPageNumber = !!bool ? passageNumber + 1 : passageNumber - 1;

    if(nextPageNumber > 0 && nextPageNumber <= allPassages?.length){
      this.router.navigate( ['/chapter/'+ passageName], { queryParams: {verseNumber: nextPageNumber}});
    }

    let passage = this.route.snapshot.params?.['passage']
    passage = passage?.includes('Psalms') ? passage?.replace('Psalms', 'Psalm') : passage;

    this.selected = `${passage} ${nextPageNumber.toString()}`;
    this.slideChangedScroll(`${passage} ${nextPageNumber.toString()}`)
  }

  segmentChanged({detail:{value}}): void{
    this.getVerses(value)
  }

  slideChangedScroll(passage: string) {
    passage = passage?.includes('Psalms') ? passage?.replace('Psalms', 'Psalm') : passage;
    document.getElementById(passage)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  getParamsData(): string{
    let passage = this.route.snapshot.params?.['passage'] || null;
    passage = passage?.includes('Psalms') ? passage?.replace('Psalms', 'Psalm') : passage;
    const verseNumber = this.route.snapshot.queryParams?.['verseNumber'] || null;
    return `${passage} ${verseNumber}`;
  }

  async presentPopover({ev, title, number, body}) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps:{
        verse:{ title, number, body },
        isSave:true
      }
    });
    await popover.present();

    const { role, data } = await popover.onDidDismiss();
  }



}
