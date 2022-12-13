import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/upload', },
  { path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(x => x.CursosModule) },
  { path: 'upload', loadChildren: () => import('./upload-file/upload-file.module').then(x => x.UploadFileModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
