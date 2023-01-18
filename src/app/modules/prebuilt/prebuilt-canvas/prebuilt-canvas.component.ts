import { ImageType } from './../../../shared/models/image-type.model';
import { Model } from './../../../shared/models/model.model';
import { switchMap } from 'rxjs/operators';
import { PrebuiltService } from './../../../shared/services/prebuilt.service';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, SimpleChanges, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MyCanvas } from '../../../shared/models';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-prebuilt-canvas',
  templateUrl: './prebuilt-canvas.component.html',
  styleUrls: ['./prebuilt-canvas.component.scss']
})
export class PrebuiltCanvasComponent implements OnInit, OnChanges {

  @ViewChild('canvasContainer', { read: ElementRef, static: true }) canvasContainer: ElementRef;
  private destroy$ = new Subject();
  currentImage: any;
  canvas: MyCanvas;
  model: Model;
  @Input() imageList: any[];
  @Output() uploadMore = new EventEmitter();



  constructor(
    private prebuiltService: PrebuiltService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap((params: ParamMap) => {


        const id = params['publicModelId'];
        return this.getModel(id);
      })
    ).subscribe((model: Model) => {
      this.model = model;
      if (!this.canvas) {
        this.canvas = new MyCanvas('canvas', this.canvasContainer);

      }
      this.canvas.model = this.model;


    });

  }
  ngOnChanges(changes: SimpleChanges) {

  }

  resetAndLoadCanvas(image): void {
    this.canvas.resetCanvas();
    this.canvas.loadCanvas(image, ImageType.PUBLICMODEL, 'label_id');
  }

  onImageSelect(event) {

    if (!this.model) {
      setTimeout(() => {
        this.resetAndLoadCanvas(event);

      }, 1000);
    }
    else {
      this.resetAndLoadCanvas(event);

    }

  }

  getModel(id): Observable<Model> {
    return this.prebuiltService.getModelById(id);
  }
  onUploadMore(){
    this.uploadMore.emit();
  }
}
