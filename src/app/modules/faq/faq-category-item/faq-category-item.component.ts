import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-category-item',
  templateUrl: './faq-category-item.component.html',
  styleUrls: ['./faq-category-item.component.scss']
})
export class FaqCategoryItemComponent implements OnInit {
  @Input() item:any;

  constructor() { }

  ngOnInit(): void {
  }

}
