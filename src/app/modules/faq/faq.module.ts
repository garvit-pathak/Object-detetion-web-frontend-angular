import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqHomeComponent } from './faq-home/faq-home.component';
import { FaqOverviewComponent } from './faq-overview/faq-overview.component';
import { FaqCategoryComponent } from './faq-category/faq-category.component';
import { FaqCategoryItemComponent } from './faq-category-item/faq-category-item.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqDetailComponent } from './faq-detail/faq-detail.component';
import { FaqHeaderComponent } from './faq-header/faq-header.component';
import { FaqSearchComponent } from './faq-search/faq-search.component';


@NgModule({
  declarations: [FaqHomeComponent, FaqOverviewComponent, FaqCategoryComponent,
    FaqCategoryItemComponent, FaqListComponent, FaqDetailComponent, FaqHeaderComponent,
    FaqSearchComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class FaqModule { }
