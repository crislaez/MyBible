import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as BibleActions from '@bible/shared/bible/actions/bible.actions';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { gotToTop } from '@bible/shared/shared/utils/utils';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map, startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-guide',
  template: `
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container">

        <!-- HEADER  -->
        <div class="header fade-in-card">
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]=" 'COMMON.SEARCH' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>
        </div>

        <!-- CARTA  -->
        <ng-container *ngIf="(searchData$ | async) as searchData">
          <ng-container *ngIf="(status$ | async) as  status">
            <ng-container *ngIf="status !== 'pending'; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">

                <ng-container *ngIf="searchData?.search !== '400' && searchData?.text !=='400' ; else noSearch">
                  <ng-container *ngIf="!!searchData?.text; else noData">

                    <ion-card class="fade-in-card components-color-ligth">
                      <ion-card-header>
                        <ion-card-title class="text-second-color">{{searchData?.search}}</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <ion-text class="text-second-color" >{{searchData?.text}}</ion-text>
                      </ion-card-content>
                    </ion-card>

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

        <!-- SEARCH  -->
        <ng-template #noSearch>
          <app-no-data [title]="'COMMON.SEARCH_ANY'" [showImage]="false" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
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
  styleUrls: ['./guide.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidePage{

  @ViewChild(IonContent, {static: true}) content: IonContent;
  gotToTop = gotToTop;
  showButton: boolean = false;

  search = new FormControl('');
  componentStautsObs$ = new EventEmitter<{reload: string, search: string}>();
  componentStatus: {reload: string, search: string} = {reload:'', search:''};

  status$ = this.store.select(fromBible.getSearchStatus);
  searchData$ = this.componentStautsObs$.pipe(
    startWith(this.componentStatus),
    tap(({search}) => {
      if(!!search) this.store.dispatch(BibleActions.loadSearch({search}))
    }),
    switchMap(({search}) =>
      this.store.select(fromBible.getResult).pipe(
        map((result) => {
          if(!search){
            return { search:'400', text:'400' }
          }
          return { search, text: result }
        })
      )
    )
  );


  constructor(
    private store: Store,
    public platform: Platform
  ) { }


 // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.componentStatus = {...this.componentStatus, search: this.search.value};
    this.componentStautsObs$.next(this.componentStatus)
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset()
    this.componentStatus = {...this.componentStatus, search: ''};
    this.componentStautsObs$.next(this.componentStatus)
  }


  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.componentStatus = {reload:'', search: ''};
      this.componentStautsObs$.next(this.componentStatus)
      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}
