import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsThreadPage } from './news-thread.page';

const routes: Routes = [
  {
    path: '',
    component: NewsThreadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsThreadPageRoutingModule {}
