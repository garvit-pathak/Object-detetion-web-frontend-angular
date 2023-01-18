import { ConfirmDeleteComponent } from './../../../../shared/components/confirm-delete/confirm-delete.component';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { ModelService, ProjectService, SnackbarService } from '../../../../shared/services';
import { ModelFormComponent } from '../model-form/model-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../../../shared/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  @Input() model: any;
  // modelList=[];
  @Input() project: Project;
  @Input() modelList :any;
  checkSequential: boolean;
  noImages: boolean;
  readyModel: boolean;
  gotoModel: boolean;
  constructor(
    public dialog: MatDialog,
    private modelService: ModelService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {    
      this.getList();
  }

  getList(): void{
      this.modelService.getAllByProjectId(this.project.project_id).subscribe((data: any) => {
        this.modelList = data.results;

        
          if(this.modelList[0].name !== 'cropping_model'){
            this.checkSequential = false;  
          }

          if(this.modelList[0].name == 'cropping_model'){
            this.checkSequential = true;  
          }
  
          if(this.modelList[0].name=='cropping_model' && this.modelList[0].status =='Ready To Use'){           
            this.readyModel = true;
            
          }
  
          if (this.modelList[1].name=='digit_model' && this.modelList[1].status =='Ready To Use'){    
            this.gotoModel = true;
            
            
          }
          else{
            this.snackbar.open('Train the model to use', 'info', '', {horizontalPosition: 'center'});
          }
        
        


      });
  }

  deleteModel(modelId){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(modelId)
      }
    });
  }
  private delete(modelId){
    this.modelService.delete(this.project.project_id, modelId).subscribe((data:any)=>{
      this.snackbarService.open('Model deleted successfully.','success')
      this.getList();
    },
    error => {
      this.snackbarService.open(error.error.detail,'danger')
    });
  }

  newModel(){
    
    let dialogRef =  this.dialog.open(ModelFormComponent, {
      data: {
        modelList: this.modelList,
        projectId: this.project.project_id
      },
      autoFocus: true,
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getList();
     
      
    });
  }

  goToModel(){
    this.snackbar.open('Upload some image to model for training', 'info', '', {horizontalPosition: 'center'});
  }
}