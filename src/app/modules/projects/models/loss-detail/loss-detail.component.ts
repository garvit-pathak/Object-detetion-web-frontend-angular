import { browserRefresh } from 'src/app/app.component';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit,  OnDestroy } from '@angular/core';
import { ModelService, SnackbarService, TrainingService } from '../../../../shared/services';
import { Model } from '../../../../shared/models';

@Component({
  selector: 'app-loss-detail',
  templateUrl: './loss-detail.component.html',
  styleUrls: ['./loss-detail.component.scss']
})
export class LossDetailComponent implements OnInit , OnDestroy{

  private modelId;
  private projectId;
  @Input() model: Model;
  timerSubscription = new Subscription();
  retrieveLoss= false;
  loss: number = null;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private modelService: ModelService,
    private snackbar: SnackbarService
  ) {

  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.modelId = this.route.snapshot.params.modelId;
    

    if (browserRefresh) {


      setTimeout(() => {
        this.getModel();
      }, 1000);
    }
    else {

      this.getModel();
    }




  }

  ngOnDestroy(): void{
    this.onDestroy$.next();  // trigger the unsubscribe
    this.onDestroy$.complete(); // finalize & clean up the subject stream
  }


  getModel(){
    this.modelService.currentModel
    .pipe(takeUntil(this.onDestroy$)).subscribe((data: Model) => {
      this.model = data;
      this.retrieveLoss =  this.model.status === 'Training Started' ? true : false;
      

      if (this.model.status === 'Ready To Use' || this.model.status === 'Training Failed' ||  this.model.status === 'Training Started'){
        this.getLoss();
      }
    });
  }
  getLoss(){
    this.trainingService.getLoss(this.projectId, this.model.id)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((data: any) => {

      this.loss = data[data.length - 1].loss;
      this.subscribeToData();
    }, err => {

      this.loss = err.error.loss;
      if (err.error.message !== 'The training has not yet started'){
      this.snackbar.open(err.error.message, 'danger');

      }
      else if (this.model.status === 'Training Started'){
        this.modelService.setModel(this.projectId, this.modelId, true);
      }
    });
  }

  private subscribeToData(): void {
    this.timerSubscription = timer(1000).pipe(takeUntil(this.onDestroy$)).subscribe(() => {


      if (this.retrieveLoss){
        this.getLoss();
      }
    });
}
}
