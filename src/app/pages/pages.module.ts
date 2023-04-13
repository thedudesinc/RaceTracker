import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../layout/header/header.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
