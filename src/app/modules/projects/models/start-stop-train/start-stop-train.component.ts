import { MatDialog } from '@angular/material/dialog';
import { browserRefresh } from 'src/app/app.component';
import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject, Observable } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DynamicOverlay, ModelService, OverlayService, ProjectService, SnackbarService, TrainingService } from '../../../../shared/services';
import { Model, MyOverlayRef, Project, SubscriptionCollection } from '../../../../shared/models';
import { StartTrainingOptDialogComponent } from '../start-training-opt-dialog/start-training-opt-dialog.component';

@Component({
  selector: 'app-start-stop-train',
  templateUrl: './start-stop-train.component.html',
  styleUrls: ['./start-stop-train.component.scss']
})
export class StartStopTrainComponent implements OnInit, OnDestroy {
  @Input() modelId:number
  @Input() projectId:number
  subs : SubscriptionCollection = new SubscriptionCollection()
  timerSubscription = new Subscription()
  model:Model
  canStartTraining: boolean = true;
  disableStopTraining: boolean = false;
  project: Project
  constructor(
    private trainingService: TrainingService,
    private snackbarService:SnackbarService,
    private modelService: ModelService,
    private dynamicOverlay: DynamicOverlay,
    private overlay:OverlayService,
    private projectService: ProjectService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    

    if (browserRefresh) {

      setTimeout(() => {
        this.getModel();
      }, 1000);
    }
    else {
      this.getModel();
    }


  }
  openDialog(){

    let dialogRef = this.dialog.open(StartTrainingOptDialogComponent);
    dialogRef.afterClosed().subscribe(
      (data) =>{
        if(data === true){
          
          this.startTraining(true)
        }else if(data === false){
          
          
          this.startTraining(false)
        }
      }
    )
  }

  getProject(){
    this.subs.subs['project'] = this.projectService.currentProject.subscribe((p:Project) => {
      this.project = p;
    })
  }
  getModel(){

    this.subs.subs['model'] = this.modelService.currentModel
    .pipe(takeUntil(this.subs.destroy$))
    .subscribe((data: Model)=>{
      this.model = data
      
      this.visible()
      
     })
   
    
  }

  visible(){
   
    if(this.model.status == 'Training In Queue' || this.model.status == 'Training Started')
    {
      
      this.canStartTraining = false
      this.disableStopTraining=false
    }else{
      this.canStartTraining = true
      this.disableStopTraining=true
    }


  }

  ngOnDestroy(){
    this.subs.unsubscriber()
  }

  startTraining(scratch: boolean) {
    this.subs.subs['startTraining'] = this.trainingService.startTraining(this.projectId,this.modelId, scratch)
    .pipe(takeUntil(this.subs.destroy$))
    .subscribe((d:any) => {
     

      this.snackbarService.open('Training started....','success')
      this.modelService.setModel(this.projectId,this.modelId,true)
    
      
    },
    err => {

      this.snackbarService.open(`Training Start Failed: ${err.error.detail}`,'danger')
    });
  }
  stopTraining() {
   
    let overlayRef : MyOverlayRef = this.overlay.open()

    this.subs.subs['stopTraining'] = this.trainingService.stopTraining(this.projectId, this.model.id)
    .pipe(takeUntil(this.subs.destroy$))
    .subscribe((d:any) => {

      this.snackbarService.open('Training Stopped','success')
      this.snackbarService.openCustom('Training will be stopped after 2 minutes','success')
      this.timerSubscription.unsubscribe()
      

      setTimeout(()=>{
        this.modelService.setModel(this.projectId,this.modelId,true)
      
        overlayRef.close()
      },3000)
    },
    err => {

      this.snackbarService.open(`Cannot stop training: ${err.error.detail}`,'danger')
      overlayRef.close()

    });
  }

}