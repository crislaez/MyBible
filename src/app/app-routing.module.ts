import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LangGuard } from './core/i18n/guards/lang.guard';

const routes: Routes = [
  {
    path: 'chapter',
    loadChildren: () => import('./chapters/chapters.module').then( m => m.ChaperPageModule),
    canActivate: [LangGuard],
  },
  {
    path: 'how-is-he',
    loadChildren: () => import('./how-is-he/how-is-he.module').then( m => m.HowIsHePageModule),
    canActivate: [LangGuard],
  },
  {
    path: 'favourite',
    loadChildren: () => import('./favourite/favourite.module').then( m => m.FavouritePageModule),
    canActivate: [LangGuard],
  },
  {
    path: 'guide',
    loadChildren: () => import('./guide/guide.module').then( m => m.GuidePageModule),
    canActivate: [LangGuard],
  },
  {
    path: '**',
    redirectTo: 'favourite',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
