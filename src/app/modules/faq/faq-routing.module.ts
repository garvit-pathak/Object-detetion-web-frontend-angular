import { FaqDetailComponent } from './faq-detail/faq-detail.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqOverviewComponent } from './faq-overview/faq-overview.component';
import { FaqHomeComponent } from './faq-home/faq-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FaqHomeComponent,
    children: [
      {path: '', component: FaqOverviewComponent},

  ]},
  {
    path:':category',
    component: FaqListComponent,
  },
  {
    path:':category/:faqId',
    component: FaqDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
