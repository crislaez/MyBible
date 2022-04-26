import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chapter',
    loadChildren: () => import('./chapters/chapters.module').then( m => m.ChaperPageModule)
  },
  // {
  //   path: 'how-is-he',
  //   loadChildren: () => import('./how-is-he/how-is-he.module').then( m => m.HowIsHePageModule)
  // },
  {
    path: 'saved',
    loadChildren: () => import('./saved/saved.module').then( m => m.SavedPageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./favourite/favourite.module').then( m => m.FavouritePageModule)
  },
  {
    path: 'discipleship',
    loadChildren: () => import('./discipleship/discipleship.module').then( m => m.DiscipleshipPageModule)
  },
  {
    path: 'guide',
    loadChildren: () => import('./guide/guide.module').then( m => m.GuidePageModule)
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
