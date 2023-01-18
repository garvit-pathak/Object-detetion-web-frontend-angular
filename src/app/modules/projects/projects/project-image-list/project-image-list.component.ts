import { ProjectImageUploadComponent } from './../project-image-upload/project-image-upload.component';
import { Project } from './../../../../shared/models/project.model';
import { ImageListDialogComponent } from './../image-list-dialog/image-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ImageService, ModelService, } from '../../../../shared/services';


@Component({
  selector: 'app-project-image-list',
  templateUrl: './project-image-list.component.html',
  styleUrls: ['./project-image-list.component.scss']
})
export class ProjectImageListComponent implements OnInit,OnDestroy {
  @Output() modelUpdate = new EventEmitter();
  @Input() project: Project;
  imageList=[]
  imagesCount
  sub = new Subscription()
  modelList: any;

  
  constructor(
    private imageService: ImageService,
    private modelService: ModelService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getList()
    
    
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }


  openDialog() {
    let dialogRef = this.dialog.open(ImageListDialogComponent, {
      data: {
        project: this.project,
        deletePermission: this.project.hasProjectPermission()
      },
      width:'80vw',
      // height:'60vh'
    });

    dialogRef.afterClosed().subscribe(result => {


      if(result){
        this.getList()
      }
    });


  }
  openImageUpload(){
    let dialogRef =  this.dialog.open(ProjectImageUploadComponent, {
      data: {
        project: this.project,
      },
      width:'60vw',
      disableClose:true
      // height:'60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.modelUpdate.emit(this.project)

      if(result){
        this.getList();
        // this.getModelList();
      }
    });

  }

  getList(limit=10,offset=0){
    this.sub =  this.imageService.getProjectImageList(this.project.project_id,limit,offset).subscribe((data:any)=>{


      this.imageList= data.results
      this.imagesCount=data.count
      
    })
  }


  selectedImages(event){
  }

  // statusModel(){
  //   this.modelStatus.emit();
  // }
}
