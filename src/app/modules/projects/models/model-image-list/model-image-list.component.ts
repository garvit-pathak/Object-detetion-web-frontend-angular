import { ModelImageDialogComponent } from './../model-image-dialog/model-image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ImageService } from '../../../../shared/services';
import { Model, Project } from '../../../../shared/models';

@Component({
  selector: 'app-model-image-list',
  templateUrl: './model-image-list.component.html',
  styleUrls: ['./model-image-list.component.scss']
})
export class ModelImageListComponent implements OnInit, OnDestroy {

  @Input() project: Project;
  @Input() model: Model;
  imageList=[];
  imagesCount;
  sub = new Subscription();


  constructor(
    private imageService: ImageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getList();
  }
  ngOnDestroy(): void{
    if (this.sub){
      this.sub.unsubscribe();
    }
  }


  openDialog() {
    this.dialog.open(ModelImageDialogComponent, {
      data: {
        project: this.project,
        deletePermission: false,
        modelId: this.model.id
      },
      width: '80vw',
      // height:'60vh'
    });
  }


  getList(limit= 10, offset= 0){


    this.sub =  this.imageService.getModelImages(this.project.project_id, this.model.id, limit, offset).subscribe((images: any) => {
      this.imageList = images.results;

    });
  }

  imagesAvailable(){

  }


}
