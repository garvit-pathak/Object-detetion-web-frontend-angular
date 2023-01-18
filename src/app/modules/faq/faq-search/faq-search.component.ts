import { FaqCategory } from './../../../shared/models/faq-category.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, switchMap, finalize, tap } from 'rxjs/operators';
import { FaqService } from '../../../shared/services';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-faq-search',
  templateUrl: './faq-search.component.html',
  styleUrls: ['./faq-search.component.scss']
})
export class FaqSearchComponent implements OnInit {

  searchMoviesCtrl = new FormControl();
  filteredMovies: any = [];
  isLoading = false;
  errorMsg: string;
  dialogRef = null;
  constructor(
    private faqService: FaqService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getResult();
  }


  getResult(){
    this.searchMoviesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap((value) => {
          this.errorMsg = '';
          this.filteredMovies = [];
          this.isLoading = true;

        }),
        switchMap((value: string) =>  {
          if (!value){
            return of(0);
          }
          return this.faqService.getList({word: value}).pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          );
        } )
        ).subscribe(data => {
        if (data){
          this.errorMsg = '';
          this.filteredMovies = data;

        }
      });
  }

  displayFn(item: any): string {
    return item ? item.question : item;
  }

  onOptionSelection(event){
    const c = FaqCategory.find(category => category.category ===  event.category);
    this.router.navigate(['/faq', c.slug, event.id]);
    this.searchMoviesCtrl.patchValue('');
  }
}
