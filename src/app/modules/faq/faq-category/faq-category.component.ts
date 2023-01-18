import { FaqCategory } from './../../../shared/models/faq-category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-category',
  templateUrl: './faq-category.component.html',
  styleUrls: ['./faq-category.component.scss']
})
export class FaqCategoryComponent implements OnInit {
  list= FaqCategory
  constructor() { }

  ngOnInit(): void {
  }

}
