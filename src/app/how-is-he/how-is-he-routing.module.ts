import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowIsHePage } from './container/how-is-he.page';

const routes: Routes = [
  {
    path: '',
    component: HowIsHePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowIsHePageRoutingModule {}
