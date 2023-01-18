import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ImageType, Model, MyCanvas, Project, SubscriptionCollection } from '../../../shared/models';
import { ImageService, ModelService, ProjectService, SnackbarService, TaskService } from '../../../shared/services';
import { browserRefresh } from 'src/app/app.component';
import { Subject, Subscription } from 'rxjs';
import { TaskImageListComponent } from '../task-image-list/task-image-list.component';
import { takeUntil } from 'rxjs/operators';
import { TaskProgressComponent } from '../task-progress/task-progress.component';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: SubscriptionCollection = new SubscriptionCollection();
  project: Project;
  model: Model;
  projectId: any;
  modelId: any;
  subs: Subscription[] = [];
  currentImage: any;
  canvas: MyCanvas;
  buffer: any[] = [];
  lastKeyPressedTime;
  resizeEvent;
  isPageLoading = true;
  imageNotFound = false;
  isImageTagged = null;
  selectedImageType = ImageType.TASK;
  @ViewChild(TaskImageListComponent, { static: true }) taggingImageList: TaskImageListComponent;
  @ViewChild('canvasContainer', { read: ElementRef, static: true }) canvasContainer: ElementRef;
  private destroy$ = new Subject();
  taskId: any;
  selectedTask: any;
  groupId: any;


  @HostListener('window:beforeunload', ['$event'])
  ononbeforeunload(event): string {
    var e = e || window.event;
    let data = this.canvas.getImageDataToSave()

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
    this.buffer.push(event.key); // this.keyCode.getKey(event.keyCode)
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
    private taskService: TaskService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params.taskId;;
    this.groupId = this.route.snapshot.queryParams["groupId"];
    this.modelId = this.route.snapshot.queryParams["modelId"];
    this.projectId = this.route.snapshot.queryParams["projectId"];
    this.canvas = new MyCanvas('canvas', this.canvasContainer);
    this.getModelByID();
    this.getProjectByID();
    this.getAssignTaskDetail();
  }
  ngOnDestroy(): void {
    this.subs.forEach(element => element.unsubscribe());
    this.subscriptions.unsubscriber();
    this.destroy$.next();  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }
  ngAfterViewInit(): void {
    this.isPageLoading = false
  }
  getProjectByID() {



    this.projectService.getProjectFromServer(this.projectId).subscribe((project: Project) => {
      this.project = project;

    })
  }
  getModelByID() {



    this.modelService.getModelFromServer(this.projectId, this.modelId).subscribe((model: Model) => {
      this.model = model;

      if (!this.canvas) {
        this.canvas = new MyCanvas('canvas', this.canvasContainer);
      }
      this.canvas.model = this.model;
    })
  }
  onLabelClicked(event): void {
    this.canvas.setLabelToSelectedRect(event);
  }
  onLableDeleted(event) {
    this.taggingImageList.updateList();
    this.getModelByID();
    this.getProjectByID();
  }
  resetAndLoadCanvas(image, imageType: ImageType): void {
    this.canvas.resetCanvas();
    this.canvas.loadCanvas(image, imageType);


  }
  onImageSelected(event): void {


    this.imageNotFound = event ? false : true;
    if (this.imageNotFound) {
      return;
    }
    const idKey = 'image_id' in event ? 'image_id' : 'id';

    this.saveImageData();

    if (!this.model) {
      setTimeout(() => {
        this.getImageForTagging(event[idKey]);
      }, 1000);
    }
    else {

      this.getImageForTagging(event[idKey]);
    }
  }
  deleteRect(): void {
    this.canvas.deleteRectFromCanvas();
  }
  saveImageData(): void {
    if (!this.canvas) { return; }
    const data = this.canvas.getImageDataToSave();
    if (!data.canvasChanged) { return; }


    this.saveImage(data.imageType, data.image);

  }
  // tslint:disable-next-line: typedef
  async saveImage(imageType: ImageType, data) {
    await this.imageService.saveTaggedImage(this.projectId, this.modelId, data.id,
      // tslint:disable-next-line: no-shadowed-variable
      imageType, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (imageType === ImageType.TASK) {


          if (data.coordinates.length > 0) {


            this.isImageTagged = true;
            this.taggingImageList.setTagImage(true);
          }
          else {

            this.taggingImageList.setTagImage(false);

          }
        }
      });
      this.getAssignTaskDetail();
  }
  // tslint:disable-next-line: typedef
  async getImageForTagging(imageId) {


    this.currentImage = await this.imageService.getImageForTagging(this.projectId, this.modelId,
      imageId, this.selectedImageType).toPromise();
    if (this.selectedImageType === ImageType.TASK) {
      this.isImageTagged = this.currentImage.is_tagged;
    }


    if (this.isPageLoading) {
      setTimeout(() => {
        this.resetAndLoadCanvas(this.currentImage, this.selectedImageType);

      }, 1000)
    }
    else {
      this.resetAndLoadCanvas(this.currentImage, this.selectedImageType);

    }
  }
  openDialog(): void {


    this.dialog.open(TaskProgressComponent, {
      data: {
        task: this.selectedTask,
      },
      width: 'fit-content',
      height: 'fit-content'
    });
  }
  getAssignTaskDetail() {
    this.taskService.getAssignedTaskList(this.groupId).subscribe((data: any) => {
      let assignTaskList;
      assignTaskList = data.results;

      assignTaskList.forEach(element => {
        if(element['id'] == this.taskId){
            this.selectedTask= element;

            // this.value= this.selectedTask['percent_complete'];
                }
      });
    })
  }
}
