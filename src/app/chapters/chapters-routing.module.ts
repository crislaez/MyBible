import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaptersPage } from './containers/chapters.page';

const routes: Routes = [
  {
    path: '',
   children:[
     {
       path:':passage',
       component: ChaptersPage
     }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChaptersPageRoutingModule {}
