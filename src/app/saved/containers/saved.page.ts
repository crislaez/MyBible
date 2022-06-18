import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverComponent } from '@bible/shared-ui/generics/components/popover.component';
import { Book } from '@bible/shared/bible/models';
import * as fromBible from '@bible/shared/bible/selectors/bible.selectors';
import { checkObject, gotToTop } from '@bible/shared/shared/utils/utils';
import { fromStorage } from '@bible/shared/storage';
import { Verse } from '@bible/shared/storage/models';
import { IonContent, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-saved',
  template:`
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container">

        <!-- HEADER  -->
        <div class="header fade-in-card margin-bottom">
          <h1>{{ 'COMMON.SAVE_VERSE' | translate }}</h1>
        </div>

        <ng-container *ngIf="(verses$ | async) as verses">
          <ng-container *ngIf="(status$ | async) as status">
            <ng-container *ngIf="status !== 'pending'; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">
                <ng-container *ngIf="verses?.length > 0; else noData">

                  <ng-container *ngFor="let verse of verses">
                    <ion-card *ngIf="(books$ | async) as books" class="fade-in-card components-color-ligth" (click)="redirect(verse, books)">
                      <ion-card-content class="text-second-color">
                        <ion-icon (click)="presentPopover($event,  verse)" name="ellipsis-vertical-outline"></ion-icon>
                        <ion-label class="span">{{ verse?.title }}</ion-label>
                        <br>
                        {{ verse?.body }}
                      </ion-card-content>

                      <ion-ripple-effect></ion-ripple-effect>
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
  styleUrls: ['./saved.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedPage {

  @ViewChild(IonContent, {static: true}) content: IonContent;
  checkObject = checkObject;
  gotToTop = gotToTop;
  showButton: boolean = false;

  books$ = this.store.select(fromBible.getBooks)
  status$ = this.store.select(fromStorage.getStatus);
  reload = new EventEmitter<void>();
  verses$ = this.reload.pipe(
    startWith({}),
    switchMap(() =>
      this.store.select(fromStorage.getVerses)
    )
  );


  constructor(
    private store: Store,
    public popoverController: PopoverController,
    private router: Router
  ) { }



  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.reload.next()
      event.target.complete();
    }, 500);
  }

  redirect({title}:{title:string}, books: Book[]): void{
    const [ completeTitle = null ] = title?.split(':');
    const [ verseNumber = null, ...restTitle ] = [...(completeTitle?.split(' ') || [])?.filter(item => !!item)]?.reverse();
    const spanisTitle = [...restTitle]?.reverse()?.join(',')?.replace(',',' ');
    const englishTitle = (books || [])?.find(({spanishPassage}) => spanishPassage?.includes(spanisTitle) || spanishPassage === spanisTitle)
    const { passage = null } = englishTitle || {};
    this.router.navigate(['/chapter/'+passage], {queryParams:{verseNumber}})
  }

  async presentPopover(ev: any, verse: Verse) {
    ev.stopPropagation();
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps:{
        verse,
        isSave:false
      }
    });
    await popover.present();

    const { role, data } = await popover.onDidDismiss();
  }


}
