import { ActivatedRoute } from '@angular/router';
import { Component, OnInit,  } from '@angular/core';
import { CategoryField, FaqCategory } from '../../../shared/models';

@Component({
  selector: 'app-faq-header',
  templateUrl: './faq-header.component.html',
  styleUrls: ['./faq-header.component.scss']
})
export class FaqHeaderComponent implements OnInit {

  categoryTitle: string;
  category: CategoryField;
  faqId: number = null;
  constructor(
    private route: ActivatedRoute,

  ) { }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.categoryTitle =  params.category;
      this.faqId =  params.faqId;

      this.category = FaqCategory.find(category => category.slug ===  this.categoryTitle);
    });

  }
}
