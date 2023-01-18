import { switchMap } from 'rxjs/operators';
import { TaggingImageListComponent } from './../../../../shared/components/tagging-image-list/tagging-image-list.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { ImageType, Model, Project } from '../../../../shared/models';
import { ImageService, ProductionService } from '../../../../shared/services';
import { query } from '@angular/animations';

@Component({
  selector: 'app-training-image-list',
  templateUrl: './training-image-list.component.html',
  styleUrls: ['./training-image-list.component.scss']
})
export class TrainingImageListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() model: Model;
  @Input() project: Project;

  @Output() imageSelected = new EventEmitter();

  modelId: any;
  projectId: any;
  imageList: any[];
  subs: Subscription[] = [];
  dropDownValue: ImageType = ImageType.TRAINING;
  dropDownDisable: boolean = null
  isFeedback = false
  @Output() selectedImageType = new EventEmitter<ImageType>();

  // @Input() isTagged: boolean;

  @Input() set isTagged(v: boolean) {
    if ('is_tagged' in this._privousImage) {
      this._privousImage.is_tagged = v
    }
  }


  get isTagged(): boolean {
    return this._currentImage.is_tagged;
  }

  _currentImage;
  _privousImage;
  @ViewChild(TaggingImageListComponent, { static: true }) taggingImageList: TaggingImageListComponent;


  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private productionService : ProductionService
  ) { }

  ngOnInit(): void {
    this.imageService.getDoesImageTagged().subscribe(tagged =>{
      if(!tagged){
        this._currentImage = this._privousImage;
      }

    })
    this.projectId = this.route.snapshot.params.projectId
    this.modelId = this.route.snapshot.params.modelId
    this.route.queryParamMap.subscribe((data: ParamMap) => {

      // if(data.is)
      if (data.get('isFeedback')) {
        this.dropDownValue = ImageType.FEEDBACK

        this.getFeedbackImages();
      }
      else {
        this.getList();
        this.getFeedbackImages(1);
      }
      this.emitDropdown()

    })



  }
  private emitDropdown() {
    this.selectedImageType.emit(this.dropDownValue);

  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }
  ngAfterViewInit(): void {

  }


  onImageSelect(event) {
    this._privousImage = this._currentImage;
    this._currentImage = event;
    this.imageSelected.emit(event);
  }

  onSelectionChange(event): void {

    this.selectedImageType.emit(event.value);
    this.dropDownValue = event.value;
    if (event.value === ImageType.FEEDBACK) {
      this.getFeedbackImages();
    }
    else {
      this.getList();
    }
  }
  updateList() {
    if (this.dropDownValue === ImageType.FEEDBACK) {
      this.getFeedbackImages()
    }
    else {
      this.getList()
    }
  }
  getFeedbackImages(limit: number = null): void {
    if (!limit) {


      this.subs.push(
        this.imageService.getAllFeedbackImages(this.projectId, this.modelId).subscribe((data: any) => {
          this.imageList = data.results;

          if (data.count) {
            this.dropDownDisable = false
          }
          else {
            this.dropDownDisable = true
          }
          this.onImageSelect(this.imageList[0])

        })
      );
    }
    else {


      this.subs.push(
        this.imageService.getAllFeedbackImages(this.projectId, this.modelId, limit).subscribe((data: any) => {


          if (data.count) {
            this.dropDownDisable = false
          }
          else {
            this.dropDownDisable = true
          }

        })
      );
    }

  }
  getList(): void {


    this.subs.push(
      this.imageService.getModelImages(this.projectId, this.modelId, 0, 0, true).subscribe((images: any) => {
        this.imageList = images.results;

        this.onImageSelect(this.imageList[0])
      })
    );
  }
  handleChange(index): void  {
    const image = this.imageList[index];
    const k: any = { id: image.id };
    
    if (image.is_feedback) {k.is_feedback = false; }
    else { k.is_feedback = true; } 
    console.warn(k)
      this.productionService.updateFeedback(this.projectId, this.modelId, k).subscribe((data: any) => {
      this.imageList[index].is_feedback = data.is_feedback;
      this.ngOnInit()
    });

  }
}
