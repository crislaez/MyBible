import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { Book } from '@bible/shared/bible/models';
import { checkObject } from '@bible/shared/shared/utils/utils';
import { MenuController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  template:`
  <ion-app>
    <!-- HEDAER  -->
    <ion-header >
      <ion-toolbar class="background-component">
         <ion-button fill="clear" size="small" color="ligth" slot="start" (click)="open()">
            <ion-menu-button color="light"></ion-menu-button>
          </ion-button>
          <ion-title class="text-color-white">{{ 'COMMON.TITLE' | translate }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- MENU LATERAL  -->
    <ion-menu side="start" menuId="first" contentId="main">
      <ion-header>
        <ion-toolbar class="background-component">
          <ion-title class="text-color-white">{{ 'COMMON.MENU' | translate }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list *ngIf="(menuList$ | async) as menuList; else noData">
          <ng-container *ngIf="menuList?.length > 0; else noData">
            <ng-container *ngIf="(menu$ | async) as menu; else noItem">
              <ng-container *ngIf="checkObject(menu); else noItem">
                <ion-item *ngFor="let item of menuList" class="ion-activatable ripple-parent" (click)="redirectTo(item?.passage)">{{menu[item?.passage]}}</ion-item>

                <ion-ripple-effect></ion-ripple-effect>
              </ng-container>
            </ng-container>
          </ng-container>
        </ion-list>

        <ng-template #noData>
          <ion-list>
            <ion-item>{{ 'COMMON.NO_DATA' | translate }}</ion-item>
          </ion-list>
        </ng-template>

        <ng-template #noItem>
            <ion-item >{{ 'COMMON.NO_DATA' | translate }}</ion-item>
        </ng-template>

      </ion-content>
    </ion-menu>

    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>

    <!-- TAB FOOTER  -->
    <ion-tabs >
      <ion-tab-bar class="background-component" slot="bottom">
        <ion-tab-button [routerLink]="['how-is-he']">
          <ion-icon class="text-color-white" name="heart-outline"></ion-icon>
          <!-- <ion-label>Quien es El</ion-label> -->
        </ion-tab-button>

        <!-- <ion-tab-button [routerLink]="['video']">
          <ion-icon name="videocam-outline"></ion-icon>
          <ion-label>Inicio</ion-label>
        </ion-tab-button> -->

        <ion-tab-button [routerLink]="['favourite']">
          <ion-icon class="text-color-white" name="bookmark-outline"></ion-icon>
          <!-- <ion-label>Favorito</ion-label> -->
        </ion-tab-button>

        <ion-tab-button [routerLink]="['guide']">
          <ion-icon class="text-color-white" name="search-outline"></ion-icon>
          <!-- <ion-label>Buscar</ion-label> -->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

  </ion-app>
  `,
  styleUrls: ['./root.components.scss'],
})
export class RootComponent {

  checkObject = checkObject;
  menuList$: Observable<Book[]> = this.store.pipe(select(fromBible.getBooks));
  menu$: Observable<any> = this.store.pipe(select(fromBible.getMenu))

  constructor(private menu: MenuController, private store: Store, private router: Router) {
    // this.menu$.subscribe(data => console.log(data))
  }

  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  redirectTo(passage: string): void{
    this.router.navigate(['/chapter/'+passage])
    this.menu.close('first')
  }

}
