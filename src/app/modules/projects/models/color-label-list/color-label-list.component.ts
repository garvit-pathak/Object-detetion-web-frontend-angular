import { ConfirmDeleteComponent } from './../../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import {  Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { LabelService, ModelService, ProjectService, SnackbarService } from '../../../../shared/services';
import { MatListOption } from '@angular/material/list';
import { Model, Project } from '../../../../shared/models';

@Component({
  selector: 'app-color-label-list',
  templateUrl: './color-label-list.component.html',
  styleUrls: ['./color-label-list.component.scss']
})
export class ColorLabelListComponent implements OnInit, OnDestroy {
  @Output() labelSelected = new EventEmitter<any>();
  @Input() selectable: boolean;
  @Input() model: Model;
  @Input() project: Project;
  @Input() modelId;
  @Input() projectId;
  // model: Model;
  // project: Project;
  @Input() isPublicModel = false;
  // project: Project;
  @Output() labelClicked = new EventEmitter();
  @Output() labelDeleted = new EventEmitter();
  subs: Subscription[] = [];
  modelLabelForm: Model;
  disableDelete: boolean;
  constructor(
    private modelService: ModelService,
    private labelService: LabelService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    if (!this.isPublicModel && !this.model && !this.project){

      this.getModel();
      this.getProject();
    }
    if ( !this.model){
      this.getModel();
      this.getProject();
    }

    if(this.projectId && this.modelId){
      this.getModelByID();
    }


  }
  ngOnDestroy(){
    this.subs.forEach(e => e.unsubscribe());
  }
  getProject(){
    this.subs.push(this.projectService.currentProject.subscribe((data: Project) => {
      this.project = data;
    }));
  }
  getModel(){
     this.subs.push(
      this.modelService.currentModel.subscribe((data: Model) => {
        this.model = data;
        
       })
     );
  }

  getModelByID() {
    this.modelService.getModelFromServer(this.projectId, this.modelId).subscribe((model: Model) => {
      this.modelLabelForm = model;
      if(this.modelLabelForm.name =='cropping_model'){                //enable or disable new lable button in tagging page.
        this.disableDelete=true;  
      }
      else{
        this.disableDelete=false;
      }
      
    })
  }
  
  onLabelClick(label): void{
    this.labelClicked.emit(label);
  }

  openDeleteDialog(labelId): void{


    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {


      if (result){
        this.deleteLabel(labelId);
      }
    });
  }

  deleteLabel(labelId): void{
    this.labelService.delete(labelId).subscribe((data: any) => {
      this.snackbarService.open('Label deleted successfully', 'success');
      this.modelService.setModel(this.project.project_id, this.model.id, true);
      this.labelDeleted.emit(true);
    });
  }
  selectedlabelsChanged(options: MatListOption[]) {

    this.labelSelected.emit(options);
  }
}
