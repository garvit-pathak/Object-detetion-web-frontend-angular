
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { fabric } from 'fabric';
import { Subscription } from 'rxjs';
import { browserRefresh } from 'src/app/app.component';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { BasicForm, ImageType, Model, MyCanvas, Project } from '../../../../shared/models';
import { ImageService, ModelService, ProductionService, ProjectService, DynamicOverlay } from '../../../../shared/services';

const CustomRect = fabric.util.createClass(fabric.Rect, {
  type: 'CustomRect',
  initialize(options): void {
    options || (options = {});

    this.callSuper('initialize', options);
    this.set('id', options.id || null);
    this.set('labelId', options.labelId || null);
    this.set('labelName', options.labelName || null);
  },

  toObject(): any {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.get('id'),
      label: this.get('label')
    });
  }
});

@Component({
  selector: 'app-use-model',
  templateUrl: './use-model.component.html',
  styleUrls: ['./use-model.component.scss']
})
export class UseModelComponent extends BasicForm implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { read: ElementRef, static: false }) canvasContainer: ElementRef;

  model: Model;
  subs: Subscription[] = [];
  imageList: any = [];
  imagesCount: any;
  isFilteredList = false;
  selectedLabels: any[];
  offset: number;
  queryLabels: string;
  canvas;
  currentImage: any;
  selectedImageType = ImageType.USEMODEL;
  projectId: any;
  modelId: number;
  _currentPaginator = null
  project: Project;
  confidenceLevel = 50;
  @Input() modelList: any;
  checkSequential: boolean;
  dynamicOverlay: any;
  meterReading = "";
  response: boolean;
  detected: string='Object Not Detected';
  dataRefresher: any;
  imageCopy: any;
  check: any = 1;
  index = 0;

  constructor(
    private formBuilder: FormBuilder,
    private modelService: ModelService,
    private imageService: ImageService,
    private dialog: MatDialog,
    private productionService: ProductionService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { super(); }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.modelId = Number(this.route.snapshot.paramMap.get('modelId'));
    this.canvas = new MyCanvas('canvas', this.canvasContainer);
    this.form = this.formBuilder.group({
      process: ['', [Validators.required]],
    });


    if (browserRefresh) {
      setTimeout(() => {
        this.getModel();
        this.getProject();
        this.getAllProductionImages();
      }, 1000);

    }
    else {
      this.getModel();
      this.getProject()
      this.getAllProductionImages();
    }
  }
  ngOnDestroy() {
    this.canvas = null;
  }

  getProject(): void {
    this.subs.push(
      this.projectService.currentProject.subscribe((project: Project) => {
        this.project = project;
      })
    );
  }

  async getModel() {
    this.modelService.currentModel.subscribe((model: Model) => {
      this.model = model;
      if (this.model) {
        this.canvas.model = this.model;
      }
    });
  }

  imageAvailable(p: any[]) {
    return p.length
  }

  onUploaded(event) {
    if (this.model.name == 'cropping_model') {
      this.checkSequential = true;
      this.meterReading = event.detail[0].meter_reading;

    }
    else {
      this.detected = event.detail[0].is_detected;
    }
    this.getAllProductionImages();
    this.onPageChange(this._currentPaginator);
  }

  onPageChange(event): void {

    this._currentPaginator;
    const offset = event.pageSize * event.pageIndex;  // (event.pageSize - 1) * event.pageIndex
    if (this.isFilteredList === false) {
      this.getAllProductionImages(event.pageSize, offset);
    }
    else {
      this.getFilteredImages(event.pageSize, offset, this.queryLabels);
    }
  }

  getimagesbysequentialmodel(limit = 10): any {
    return this.productionService.getimagesbysequentialmodel(this.projectId, this.modelId, limit)
  }


  onImageChange(image, limit = 10, offset = 0,slide): void {
   console.warn(image)
    if (this.model.name == 'cropping_model') {
      this.resetAndLoadCanvas(image, this.selectedImageType);
      this.getimagesbysequentialmodel().subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].production_image_id == image.id) {
            this.checkSequential = true;
            this.meterReading = data[i].meter_reading;
            break;
          }
        }
      });
    }

    else {

      if (this.check == 1) {
        this.resetAndLoadCanvas(image, this.selectedImageType);
      }
      else if (image.changer == true ){
        this.index = image.index
        this.resetAndLoadCanvas(image, this.selectedImageType);

      }
      this.productionService.getAllProductionImage(this.projectId, this.modelId, limit, offset).subscribe((data: any) => {

        this.imageCopy = image
 
        // for (let i = 0; i < data.results.length; i++) {
        //   if (data.results[i].id == image.id) {
            this.response = data.results[this.index].is_detected

            if (this.response == true) {
                 this.detected = 'Object  Detected'
             
            }
            else {
              this.detected = 'Object Not Detected'

            }
          // }
        // }
      });
    }
  }


  getAllProductionImages(limit = 10, offset = 0): void {
    this.productionService.getAllProductionImage(this.projectId, this.modelId, limit, offset).subscribe((data: any) => {
      this.imageList = data.results;
      this.imagesCount = data.count;

    });
  }


  labelSelected(event): void {
    this.isFilteredList = true;
    // console.log(event);

    if (event.length === 0) {
      console.log('in side if');

      this.selectedLabels = [];
      this.isFilteredList = false;
      this.offset = 0;
      this.getAllProductionImages();
      return;
    }
    this.queryLabels = '';
    this.offset = 0;
    for (let i = 0; i < event.length; i++) {
      if (i === 0) {
        this.queryLabels = event[i].value.id;
        continue;
      }
      this.queryLabels = this.queryLabels + '-' + event[i].value.id;
    }
    this.selectedLabels = [];
    for (const k of event) {
      this.selectedLabels.push(k.value);
    }

    this.canvas.selectedLabels = this.selectedLabels;

    const limit = 10;
    this.getFilteredImages(limit, this.offset = 0, this.queryLabels);
  }

  getFilteredImages(limit = 10, offset = 0, labels): void {
    if (this.model.name == 'cropping_model') {
      this.productionService.getFilterImage(this.projectId, this.model.id, limit, offset, labels).subscribe((data: any) => {
        this.imagesCount = data.count;
        this.imageList = data.results;
        this.resetAndLoadCanvas(this.imageList[0], this.selectedImageType);
      }, error => {
      });
    }

    else {
      this.productionService.getFilterImage(this.projectId, this.model.id, limit, offset, labels).subscribe((data: any) => {
        this.imagesCount = data.count;
        this.imageList = data.results;
        this.resetAndLoadCanvas(this.imageList[0], this.selectedImageType);
      }, error => {
      });
    }
  }

  resetAndLoadCanvas(image, imageType: ImageType): void {
    
    this.canvas.resetCanvas();
    this.canvas.loadCanvas(image, imageType);
    this.check += 1
  }


  onClick(event, limit = 10, offset = 0) {
      
    this.productionService.getAllProductionImage(this.projectId, this.modelId, limit, offset).subscribe((data: any) => {

      this.imageList = data.results;
      this.imagesCount = data.count;

      this.response = this.imageList[this.index + 1].is_detected
      this.resetAndLoadCanvas(this.imageList[this.index + 1], this.selectedImageType)
      if (this.response == true) {
     
        this.detected = 'Object  Detected'

      }
      else  {

        this.detected = 'Object Not Detected'


      }
      this.index++;
    });

  }
  onClickPrevious(event, limit = 10, offset = 0) {
    this.productionService.getAllProductionImage(this.projectId, this.modelId, limit, offset).subscribe((data: any) => {

      this.imageList = data.results;
      this.imagesCount = data.count;
      this.response = this.imageList[this.index + 1].is_detected
     
      this.resetAndLoadCanvas(this.imageList[this.index - 1], this.selectedImageType)
      this.index--
    });
  }

  onStart(): void {

  }

  openSliderDialog(event) {
    const dialogPosition: DialogPosition = {
      top: event.y + 10 + 'px',
      left: event.x + 0 + 'px'
    };
    const dialogRef = this.dialog.open(SliderComponent, {
      width: '200px',
      // height:'120px',
      position: dialogPosition,
      data: {
        confidenceLevel: this.confidenceLevel
      }
    })

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {
        this.confidenceLevel = result;

        this.canvas.setConfidenseLevel(this.confidenceLevel)
        // this.updateRole(result)
      }
    })
  }
}
