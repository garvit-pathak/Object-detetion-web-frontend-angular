import { ProjectImageUploadComponent } from './../../projects/project-image-upload/project-image-upload.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ImageService, ModelService, ProjectService, SnackbarService } from '../../../../shared/services';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Project } from '../../../../shared/models';

@Component({
  selector: 'app-model-image-selection',
  templateUrl: './model-image-selection.component.html',
  styleUrls: ['./model-image-selection.component.scss']
})
export class ModelImageSelectionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sourceimages: any[]=[];
  targetimages: any[] = [];
  isAvailable=true
  subscriptions: Subscription[] = [];
  projectId;
  modelId;
  project: Project
  constructor(private imageService: ImageService,
              private projectService:ProjectService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
              private modelService: ModelService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.modelId = this.route.snapshot.paramMap.get('modelId');

    this.getAllImages();
    this.getProject()
  }


  getProject(){
    this.projectService.currentProject.subscribe((data:Project)=>{
      this.project = data
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

  }
  moveAllRight() {
    if (this.sourceimages) {
        let movedItems = [];

        for(let i = 0; i < this.sourceimages.length; i++) {
                let removedItem = this.sourceimages.splice(i, 1)[0];
                this.targetimages.push(removedItem);
                movedItems.push(removedItem);
                i--;
        }
    }
}
moveAllLeft() {
  if (this.targetimages) {
      let movedItems = [];

      for(let i = 0; i < this.targetimages.length; i++) {
              let removedItem = this.targetimages.splice(i, 1)[0];
              this.sourceimages.push(removedItem);
              movedItems.push(removedItem);
              i--;
      }
  }
}
  onSubmit(): void {
    let arr = []
    this.targetimages.forEach(element => {
      let obj = {
        image: element.id,
        model: Number(this.modelId),
      }
      arr.push(obj)
    });

    this.imageService.setImageToModel(this.projectId, arr).subscribe(data => {

      this.snackbarService.open('Images uploaded successfully.','success')
      this.modelService.setModel(this.projectId,this.modelId,true)
      this.router.navigate(['/projects/',this.projectId,'models',this.modelId])
    }, error => {
    })
  }
  getAllImages() {
    this.imageService.getAllByProjectId(this.projectId, this.modelId).subscribe((images: any) => {
      this.sourceimages = images.results;
      this.isAvailable=this.sourceimages.length ? true : false



    })
  }

  uploadImage(){
    let dialogRef =  this.dialog.open(ProjectImageUploadComponent, {
      data: {
        project: this.project,
      },
      width:'60vw',
      disableClose:true
      // height:'60vh'
    });

    dialogRef.afterClosed().subscribe(result => {


      if(result){
        this.getAllImages()
      }
    });

  }
}
