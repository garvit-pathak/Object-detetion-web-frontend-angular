import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionCollection } from './../../../../shared/models/subscription-collection.model';
import { MatDialog } from '@angular/material/dialog';
import { BaseLabelGraphComponent } from './../../labels/base-label-graph/base-label-graph.component';
import { TrainingImageListComponent } from './../training-image-list/training-image-list.component';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { ImageType, Model, MyCanvas, Project } from '../../../../shared/models';
import { ImageService, ModelService, ProjectService } from '../../../../shared/services';

import { browserRefresh } from 'src/app/app.component';


@Component({
  selector: 'app-tagging-base',
  templateUrl: './tagging-base.component.html',
  styleUrls: ['./tagging-base.component.scss']
})
export class TaggingBaseComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: SubscriptionCollection = new SubscriptionCollection();
  project: Project;
  model: Model;
  subs: Subscription[] = [];
  currentImage: any;
  canvas: MyCanvas;
  // checkName: boolean;
  
  buffer: any[] = [];
  lastKeyPressedTime;
  selectedImageType: ImageType;
  resizeEvent;
  imageNotFound = false;
  isImageTagged = null;
  modelId;
  // modelName;
  projectId;
  isPageLoading=true
  hideChartButton = false;
  allTagged=true;
  @ViewChild(TrainingImageListComponent, { static: true }) taggingImageList: TrainingImageListComponent;
  @ViewChild('canvasContainer', { read: ElementRef, static: true }) canvasContainer: ElementRef;
  private destroy$ = new Subject();
  

  @HostListener('window:beforeunload', ['$event'])
  ononbeforeunload(event): string {
    var e = e || window.event;
    let data = this.canvas.getImageDataToSave()
    var key = event.keyCode;
    alert(data.allTagged)
    if (!data.allTagged) {

      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = 'Any string';
      }

      // For Safari
      return 'Any string';
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent): void {

    if (!this.canvas.rectSelected) { return; }
    const currentTime = Date.now();
    if ((currentTime - this.lastKeyPressedTime) > 1000) {
      this.buffer = [];
    }
    this.buffer.push(event.key); 
    // this.keyCode.getKey(event.keyCode)
    this.lastKeyPressedTime = currentTime;
    if ((event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 48 && event.keyCode <= 57)) {
      this.canvas.setLabelByKey(this.buffer);
      return;
    }

    if (event.ctrlKey && (event.key === 'c' || event.key === 'C')) {
      this.canvas.copySelectedObject();
      return;
    }
    if (event.ctrlKey && (event.key === 'v' || event.key === 'V')) {
      this.canvas.pasteSelectedObject();

      return;
    }
    if (event.key === 'Delete' || event.keyCode === 46) {
      this.canvas.deleteRectFromCanvas();
      return;
    }

  }


  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    clearTimeout(this.resizeEvent);
    this.resizeEvent = setTimeout(() => {
      // call your function
      location.reload();
      // this.canvas.resetCanvas();
      // this.canvas.loadCanvas(this.currentImage);
    }, 750);


  }
  constructor(
    private projectService: ProjectService,
    private modelService: ModelService,
    private imageService: ImageService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
   console.log('taggind base');
   
    this.modelId =  this.route.snapshot.params.modelId;
    this.projectId =  this.route.snapshot.params.projectId;
    this.hideChartButton =  this.route.snapshot.queryParams.isFeedback;
   

    this.canvas = new MyCanvas('canvas', this.canvasContainer);
    if (browserRefresh) {


      setTimeout(() => {
        this.getProject();
        this.getModel();
      
      }, 1000);
    }
    else {
      
      this.getProject();
      this.getModel();
      if(!this.model){
       
        window.location.reload();
      }
    }
  }
  ngOnDestroy(): void {
    this.subs.forEach(element => element.unsubscribe());
    this.subscriptions.unsubscriber();
    this.destroy$.next();  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
    this.canvas.dispose()
    this.canvas = null;
  }
  ngAfterViewInit(): void {
    this.isPageLoading=false
  }

  onSelectedImageType(event): void {
    this.selectedImageType = event;
  }

  onImageSelected(event): void {
    this.imageNotFound = event ? false : true;
    if (this.imageNotFound) {
      return;
    }

    const idKey = 'image_id' in event ? 'image_id' : 'id';

    this.saveImageData();
    if(this.allTagged){
      if (!this.model) {
        setTimeout(() => {
          this.getImageForTagging(event[idKey]);
        }, 1000);
      }
      else {

        this.getImageForTagging(event[idKey]);
      }
    }

  }
  saveImageData(): void {
    if (!this.canvas) { return; }
    const data = this.canvas.getImageDataToSave();
    if (!data.canvasChanged) { return; }

    this.imageService.doesImageTagged = data.allTagged
    this.allTagged = data.allTagged ? true : false;
    if(!data.allTagged){
      alert('please tag all box')
      this.allTagged = false;
      // this.taggingImageList.currentImage = this.currentImageItem;
    }
    else{
      this.saveImage(data.imageType, data.image);
    }
  }



  onLableDeleted(event){
    this.taggingImageList.updateList()
  }

  resetAndLoadCanvas(image, imageType: ImageType): void {


    this.canvas.resetCanvas();
    this.canvas.loadCanvas(image, imageType);
  }

  deleteRect(): void {
    this.canvas.deleteRectFromCanvas();
  }


  // tslint:disable-next-line: typedef
  async saveImage(imageType: ImageType, data) {
    await this.imageService.saveTaggedImage(this.project.project_id, this.model.id, data.id,
      // tslint:disable-next-line: no-shadowed-variable
      imageType, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (imageType === ImageType.TRAINING) {
          if (data.coordinates.length > 0) {
            this.isImageTagged = true;
            this.taggingImageList.isTagged =true ;
          }
          else {
            this.taggingImageList.isTagged = false;

          }
        }


      });
  }

  // tslint:disable-next-line: typedef
  async getImageForTagging(imageId) {

    this.currentImage = await this.imageService.getImageForTagging(this.projectId, this.modelId,
      imageId, this.selectedImageType).toPromise();


    if (this.selectedImageType === ImageType.TRAINING) {
      this.isImageTagged = this.currentImage.is_tagged;
    }

    if(this.isPageLoading){
      setTimeout(()=>{
        this.resetAndLoadCanvas(this.currentImage, this.selectedImageType);

      },1000)
    }
    else{
      this.resetAndLoadCanvas(this.currentImage, this.selectedImageType);

    }
  }

  getProject(): void {
    this.subs.push(
      this.projectService.currentProject.subscribe((project: Project) => {
        console.log('project',project);
        
        this.project = project;        
      })
    );
  }
  // tslint:disable-next-line: typedef
  async getModel() {
    this.modelService.currentModel.subscribe((model: Model) => {
      this.model = model;
      if(this.model){
        this.canvas.model = this.model;
      }
      
    });
  }
  
  onLabelClicked(event): void {
    this.canvas.setLabelToSelectedRect(event);
  }

  openDialog(): void {
    this.dialog.open(BaseLabelGraphComponent, {
      data: {
        project: this.project,
        model: this.model,
        deletePermission: this.project.hasProjectPermission()
      },
      width: 'fit-content',
      height: 'fit-content'
    });
  }

}
