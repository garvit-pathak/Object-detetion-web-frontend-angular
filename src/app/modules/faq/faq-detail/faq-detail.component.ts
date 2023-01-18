import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FaqService } from '../../../shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss']
})
export class FaqDetailComponent implements OnInit {

  faq$ : Observable<any>
  constructor(
    private faqService: FaqService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.faq$ =  this.route.params.pipe(
      switchMap((params: ParamMap)=>{
        let id = params['faqId']
      return this.getFaq(id)
      })
    )
  }
  getFaq(id): Observable<any>{
    return this.faqService.getOne(id)
  }
}
