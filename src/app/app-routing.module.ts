import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    data: { preload: true },
    loadChildren: () =>
      import('@features/main/main.module').then((m) => m.MainModule),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
