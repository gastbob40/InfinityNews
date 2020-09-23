import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsListPage } from './news-list.page';

const routes: Routes = [
  {
    path: '',
    component: NewsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsListPageRoutingModule {}
