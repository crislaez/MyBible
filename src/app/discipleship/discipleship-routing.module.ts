import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscipleshipPage } from './containers/discipleship.page';

const routes: Routes = [
  {
    path: '',
    component: DiscipleshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscipleshipPageRoutingModule {}
