import { FaqService } from './../../../shared/services/faq.service';
import { FaqCategory, CategoryField } from './../../../shared/models/faq-category.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {

  categoryTitle: string;
  category: CategoryField;

  list;
  constructor(
    private route: ActivatedRoute,
    private faqService: FaqService,
  ) { }

  ngOnInit(): void {
     this.categoryTitle =  this.route.snapshot.params.category;
     this.category = FaqCategory.find(category => category.slug ===  this.categoryTitle);
     this.getList();
  }



  getList(){
    this.list = this.faqService.getList({category: this.category.category});
  }
}
