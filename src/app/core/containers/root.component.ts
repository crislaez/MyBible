import { Component, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { checkObject } from '@bible/shared/shared/utils/utils';
import { Keyboard } from '@capacitor/keyboard';
import { MenuController, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template:`
  <ion-app>
    <!-- HEDAER  -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="background-component">
         <ion-button  fill="clear" size="small" slot="start" (click)="open()">
            <ion-menu-button class="text-color-white"></ion-menu-button>
          </ion-button>
          <ion-title class="text-color-white">{{ 'COMMON.TITLE' | translate }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- MENU LATERAL  -->
    <ion-menu side="start" menuId="first" contentId="main">
      <ion-header>
        <ion-toolbar class="background-component">
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]="'COMMON.SEARCH_BY_BOOK' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list *ngIf="(menuList$ | async) as menuList; else noData">
          <ng-container *ngIf="menuList?.length > 0; else noData">
            <ng-container *ngIf="(menu$ | async) as menu; else noItem">
              <ng-container *ngIf="checkObject(menu); else noItem">

                <ion-item detail *ngFor="let item of menuList" class="ion-activatable ripple-parent" (click)="redirectTo(item?.passage)">{{menu[item?.passage]}}</ion-item>

                <ion-ripple-effect type="bounded"></ion-ripple-effect>
              </ng-container>
            </ng-container>
          </ng-container>
        </ion-list>

        <ng-template #noData>
          <ion-list>
            <ion-item>{{ 'COMMON.NO_SEARCH_DATA' | translate }}</ion-item>
          </ion-list>
        </ng-template>

        <ng-template #noItem>
            <ion-item >{{ 'COMMON.NO_SEARCH_DATA' | translate }}</ion-item>
        </ng-template>
      </ion-content>
    </ion-menu>

    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>

    <!-- TAB FOOTER  -->
    <ion-tabs  *ngIf="currentSection$ | async as currentSection">
      <ion-tab-bar class="background-component" slot="bottom">
        <ion-tab-button *ngFor="let item of footerList" [ngClass]="{'active-class': [item?.link]?.includes(currentSection?.route)}" class="text-color-light" [routerLink]="[item?.link]">
          <ion-icon [name]="item?.icon"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

  </ion-app>
  `,
  styleUrls: ['./root.components.scss'],
})
export class RootComponent {

  checkObject = checkObject;

  menu$ = this.store.pipe(select(fromBible.getMenu));

  triggerSearch = new EventEmitter<string>();
  menuList$ = this.triggerSearch.pipe(
    startWith(''),
    switchMap((search) =>
      this.store.select(fromBible.getBooks).pipe(
        map((books) => {
          return !search
            ? books
            : books?.filter(({spanishPassage}) => spanishPassage?.toLocaleLowerCase()?.includes(search))
        })
      )
    )
  );

  currentSection$: Observable<{route:string}> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {}
      const [, route = null ] = url?.split('/');
      return {route:route || 'home'};
    })
  );

  footerList = [
    {id:1, link:'saved', icon:'bookmark-outline'},
    {id:2, link:'favourite', icon:'heart-outline'},
    {id:3, link:'discipleship', icon:'reader-outline'},
    {id:4, link:'guide', icon:'search-outline'}
  ];

  search = new FormControl('');


  constructor(
    private menu: MenuController,
    private store: Store,
    private router: Router,
    public platform: Platform,
  ) { }


  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  redirectTo(passage: string): void{
    let verseNumber = '1';
    const oneChapterBook = ['Jude', '3 John', '2 John', 'Philemon', 'Obadiah'];
    if(oneChapterBook?.includes(passage)){
      verseNumber = '0'
    }

    this.router.navigate(['/chapter/'+passage], {queryParams:{verseNumber}});
    this.menu.close('first');
  }

  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.triggerSearch.next(this.search.value?.toLowerCase());
  }

  // CLEAR
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.triggerSearch.next('');
  }



}
