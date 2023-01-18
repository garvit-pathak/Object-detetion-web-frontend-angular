import { ElementRef } from '@angular/core';
import { CanvasConstants } from './canvas-constant.model';
import { Model } from './model.model';

import { fabric } from 'fabric';
import { ImageType } from './image-type.model';
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


export class MyCanvas {
  selectedLabels: any[];
  canvas: any;
  model: Model;
  currentImage: any = null;
  canvasChanged: boolean;
  rect: any;
  canvasContainer: ElementRef;
  rectSelected = null;
  currentHoverObject: any = null;
  copiedObject;
  canvasId;
  imageIdKey: string;
  imageType: ImageType;
  private _startX: number;
  private _startY: number;
  confidenceLevel: number;
  labelKeyinCoordinate:string  = 'label'
  get startX(): number {
    return this._startX;
  }
  set startX(value: number) {
    this._startX = value;
  }
  get startY(): number {
    return this._startY;
  }
  set startY(value: number) {
    this._startY = value;
  }

  private _imageScaleY: number;
  private _imageScaleX: number;
  public get imageScaleY(): number {
    return this._imageScaleY;
  }

  public set imageScaleY(v: number) {
    this._imageScaleY = v;
  }

  public get imageScaleX(): number {
    return this._imageScaleX;
  }

  public set imageScaleX(v: number) {
    this._imageScaleX = v;
  }


  constructor(canvasId: string, canvasContainer) {
    this.canvasId = canvasId;
    this.canvasContainer = canvasContainer;
    this.canvas = new fabric.Canvas(canvasId);
    // this.model = model;
    this.confidenceLevel = 50;
  }
  dispose(): void {
    this.canvas.remove(...this.canvas.getObjects());
    this.canvas.clear();
    this.canvas.dispose();
  }

  resetCanvas() {
    this.canvas.clear();
    this.canvas.dispose();
    this.canvas = new fabric.Canvas(this.canvasId);
    this.canvas.remove(...this.canvas.getObjects());
  }
  removeCanvasObjects(){
    this.canvas.remove(...this.canvas.getObjects());
  }
  getImageDataToSave(): any {
    const data = {
      allTagged: true,
      image: this.currentImage,
      canvasChanged: this.canvasChanged,
      imageType: this.imageType,
    };
    if (!this.currentImage || !this.canvas || !this.canvasChanged) { return data; }

    const objs = this.canvas.getObjects();
    const coordinates: any[] = [];
    const backgroundImage = this.canvas.backgroundImage;

    // objs.forEach(element => {



    // });


    for (const element of objs) {
      if ((!element.labelId) || (element.labelId === -1)) {
        data.allTagged = false;
        continue;
      }

      const c: any = {

        label: element.labelId,
        model: this.model.id,
        x_min: Math.round(element.left / backgroundImage.scaleX),
        y_min: Math.round(element.top / backgroundImage.scaleY),
        x_max: Math.round((element.left + (element.getScaledWidth() - CanvasConstants.strokeWidth)) / backgroundImage.scaleX),
        y_max: Math.round((element.top + (element.getScaledHeight() - CanvasConstants.strokeWidth)) / backgroundImage.scaleY)
      };
      if (element.id) { c.id = element.id; }
      coordinates.push(c);
    }

    if (this.imageType === ImageType.TRAINING || this.imageType === ImageType.TASK) {
      data.image.coordinates = coordinates;

    }
    else {
      data.image.image_coordinates = coordinates;

    }
    return data;

  }



  copySelectedObject(): void {
    const object = fabric.util.object.clone(this.canvas.getActiveObject());
    object.set('top', object.top + 5);
    object.set('left', object.left + 5);
    this.copiedObject = object;
  }
  pasteSelectedObject(): void {
    if (!this.copiedObject) { return; }
    this.createNewRect(this.copiedObject.height, this.copiedObject.width,
      (this.copiedObject.top + 5), (this.copiedObject.left + 5),
      this.copiedObject.stroke, this.copiedObject.id, this.copiedObject.labelId, this.copiedObject.labelName);
  }
  setLabelByKey(key: number[]): void {
    let colorObj = this.model.labelsWithColor[key.join('')];
    if (!colorObj) { colorObj = this.model.labelsWithColor[0]; }
    this.setLabelToSelectedRect(colorObj);
  }

  deleteRectFromCanvas(): void {
    this.canvas.remove(this.canvas.getActiveObject());
    if (this.currentHoverObject) {
      this.canvas.remove(this.currentHoverObject);
    }
    this.canvas.renderAll();
    this.canvasChanged = true;

  }

  setLabelToSelectedRect(label): void {
    if (this.rectSelected === null) { return; }
    this.rectSelected.dirty = true;
    this.rectSelected.stroke = label.color;
    this.rectSelected.labelId = label.id;
    this.rectSelected.labelName = label.name;
    this.canvas.requestRenderAll();
  }



  loadCanvas(image: any, imageType: ImageType, labelKeyinCoordinate='label'): void {
    this.labelKeyinCoordinate = labelKeyinCoordinate;
   this.imageType = imageType;


    if ('image_id' in image) {
      this.imageIdKey = 'image.id';
    }
    else {
      this.imageIdKey = 'id';
    }
    this.canvasChanged = false;
    this.currentImage = image;
    this.canvas.allowTouchScrolling = true;
    this.canvas.stateful = true;




    if (this.imageType === ImageType.USEMODEL) {
      this.canvas.selection = false;
      this.canvas.id = image.id;
      this.canvas.setHeight(345);
      this.canvas.setWidth(600);
    }
    else if(this.imageType === ImageType.PUBLICMODEL){
      this.canvas.selection = false;
      this.canvas.id = image.img_id;
      this.setCanvasDimensions();
   }
    else if(this.imageType === ImageType.TRAINING || this.imageType === ImageType.TASK || this.imageType === ImageType.FEEDBACK){
     this.canvas.selection = true;
      this.canvas.preserveObjectStacking = true;
      this.canvas.uniScaleTransform = true;
      this.setCanvasDimensions();
      this.canvas.on('selection:created', (option) => this.onSelectionCreatedEvent(option));
      this.canvas.on('mouse:down', (option) => this.onMouseDownEvent(option));
      this.canvas.on('mouse:up', (option) => this.onMouseUpEvent(option));
      this.canvas.on('object:modified', (option: any) => this.onObjectModifiedEvent(option));
    }
    this.canvas.on('mouse:over', (option) => this.onMouseOverEvent(option));
    this.canvas.on('mouse:out', (option) => this.onMouseOutEvent(option));
    this.setBackgroundImage(labelKeyinCoordinate);
    this.canvas.renderAll();

  }// load canvas end

  setConfidenseLevel(level: number){
    this.confidenceLevel = level;
    this.removeCanvasObjects()
    this.setBackgroundImage(this.labelKeyinCoordinate)
  }
  setBackgroundImage(labelKeyinCoordinate): void {
   fabric.Image.fromURL(this.currentImage.name, (img) => {
      this.imageScaleX = this.canvas.getWidth() / img.width;
      this.imageScaleY = this.canvas.getHeight() / img.height;
      let coordinates = [];
      if (this.currentImage.coordinates) {
        coordinates = this.currentImage.coordinates;
      }
      else {
        coordinates = this.currentImage.image_coordinates;
      }

      img.set({
        scaleX: this.canvas.getWidth() / img.width,
        scaleY: this.canvas.getHeight() / img.height,
        originX: 'left', originY: 'top'
      });
      coordinates.forEach(e => {

        let colorObj;

        if (this.imageType === 'UM') {
          if (this.selectedLabels) {

            colorObj = this.selectedLabels.find(f => {

              return f.id === e[labelKeyinCoordinate] && e.confidence * 100 > this.confidenceLevel;
            });
          } else {

            colorObj = this.model.labelsWithColor.find(f => {
             return f.id == e[labelKeyinCoordinate] && e.confidence*100 > this.confidenceLevel
            });

          }
       }
        else {
          colorObj = this.model.labelsWithColor.find(f => {
            return f.id === e[labelKeyinCoordinate];
          });
        }


        if(colorObj){
          const xmin = (e.x_min * this.imageScaleX);
          const ymin = (e.y_min * this.imageScaleY);
          const xmax = (e.x_max * this.imageScaleX);
          const ymax = (e.y_max * this.imageScaleY);
          this.createNewRect((ymax - ymin), (xmax - xmin), ymin, xmin, colorObj.color, e.id, colorObj.id, colorObj.name);
        }

      });
      this.canvasChanged = false;
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
    }
    );
  }
  setCanvasDimensions(): void {
    this.canvas.setHeight(this.canvasContainer.nativeElement.offsetHeight);
    this.canvas.setWidth(this.canvasContainer.nativeElement.offsetWidth);
  }

  onMouseOverEvent(event): void {
    if (event.target) {
      if (!this.currentHoverObject) {
        const label = this.model.labelsWithColor.find(e => {
          return e.id === event.target.labelId;
        });
        let name;
        let color;
        if (!label) {
          color = 'red';
          name = '';
        } else {
          name = label.name;
          color = label.color;
        }
        this.currentHoverObject = new fabric.Text(name, {
          name: 't',
          fontSize: 40,
          left: event.target.left,
          top: event.target.top - 20,
          lineHeight: 1,
          originX: 'left',
          fontFamily: 'Helvetica',
          // fontWeight: 'bold',
          statefullCache: true,
          scaleX: 0.4,
          scaleY: 0.4,
          fill: color,
        });
        this.canvas.add(this.currentHoverObject);
        this.canvas.renderAll();
      }
    }

  }
  onMouseOutEvent(event): void {
    this.canvas.remove(this.currentHoverObject);
    this.currentHoverObject = null;
  }


  onSelectionCreatedEvent(option): void {
    if (option.target.type === 'activeSelection') {
      this.canvas.discardActiveObject();
    }
  }

  onMouseDownEvent(option): void {
    if (option.target != null) {
      return;
    }
    const pointer = this.canvas.getPointer(option.e);

    this.startY = pointer.y;
    this.startX = pointer.x;
  }
  onMouseMoveEvent(option): void {

  }
  onMouseUpEvent(option): void {
    if (option.isClick) { return; }

    const pointer = this.canvas.getPointer(option.e);
    if ((pointer.x > this.canvas.getWidth()) || (pointer.y > this.canvas.getHeight())) { return; }
    if ((pointer.x < 0) || (pointer.y < 0)) { return; }

    let width;
    let height;
    let top;
    let left;

    if ((this.startX < pointer.x) && (this.startY < pointer.y)) {
      top = this.startY;
      left = this.startX;
    }
    if ((this.startX > pointer.x) && (this.startY > pointer.y)) {
      top = pointer.y;
      left = pointer.x;
    }
    if ((this.startX > pointer.x) && (this.startY < pointer.y)) {
      top = this.startY;
      left = pointer.x;
    }
    if ((this.startX < pointer.x) && (this.startY > pointer.y)) {
      top = pointer.y;
      left = this.startX;
    }
    width = Math.abs(pointer.x - this.startX);
    height = Math.abs(this.startY - pointer.y);

    if ((width < CanvasConstants.minRectWidth) || (height < CanvasConstants.minRectHeight)) { return; }
    this.canvas.off('mouse:move');
    this.createNewRect(height, width, top,
      left, this.model.labelsWithColor[0].color,
      null, this.model.labelsWithColor[0].id, this.model.labelsWithColor[0].name);

  }
  onObjectModifiedEvent(option): void {
    const obj = option.target;
    const boundingRect = obj.getBoundingRect(true);
    if (boundingRect.left < 0
      || boundingRect.top < 0
      || boundingRect.left + boundingRect.width > this.canvas.getWidth()
      || boundingRect.top + boundingRect.height > this.canvas.getHeight()) {
      obj.top = obj._stateProperties.top;
      obj.left = obj._stateProperties.left;
      obj.angle = obj._stateProperties.angle;
      obj.scaleX = obj._stateProperties.scaleX;
      obj.scaleY = obj._stateProperties.scaleY;
      obj.setCoords();
      obj.saveState();
    }
  }





  createNewRect(height, width, top, left, stroke?, id?, labelId?, labelName?): void {
    if (this.imageType === 'UM') {
      this.rect = new CustomRect({
        top,
        left,
        width,
        height,
        fill: 'transparent',
        stroke,
        strokeWidth: CanvasConstants.strokeWidth,
        id,
        labelId,
        labelName,
        lockScalingFlip: true,
        strokeUniform: true,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingY: true,
        lockScalingX: true,
        lockUniScaling: true,
        lockSkewingX: true,
        lockSkewingY: true,
        selectable: false,
      });
    }
    else {
      this.rect = new CustomRect({
        top,
        left,
        width,
        height,
        fill: 'transparent',
        stroke,
        strokeWidth: CanvasConstants.strokeWidth,
        id,
        labelId,
        labelName,
        strokeUniform: true,
        lockRotation: true,
        originX: 'left',
        originY: 'top',
      });
      this.rect.on('modified', (e) => this.onRectModified(e));
      this.rect.on('deselected', (e) => this.onRectDeselected(e));
      this.rect.on('selected', (e) => this.onRectSelected(e));
      this.canvas.setActiveObject(this.rect);
    }


    this.canvas.add(this.rect);
    // if(this.model.labelsWithColor.length ==2){
    //   this.setLabelToSelectedRect(this.model.labelsWithColor[1])
    // }
    this.canvas.renderAll();
    // this.rectSelected = this.rect
    // return this.rect
  }

  onRectModified(e) {
    // if ((e.target.width * e.target.scaleX) < 10) e.target.scaleToWidth(10);
    // if ((e.target.height * e.target.scaleY) < 10) e.target.scaleToHeight(10);

    if ((e.target.getScaledWidth() < CanvasConstants.minRectWidth) && (e.target.getScaledHeight() < CanvasConstants.minRectHeight)) {

      e.target.scaleToWidth(CanvasConstants.minRectWidth);
      e.target.scaleToHeight(CanvasConstants.minRectHeight);
    } else {

      if (e.target.getScaledWidth() < CanvasConstants.minRectWidth) {
        e.target.scaleToWidth(CanvasConstants.minRectWidth);

      }

      if (e.target.getScaledHeight() < CanvasConstants.minRectHeight) {
        e.target.scaleToHeight(CanvasConstants.minRectHeight);

      }
    }
    this.canvasChanged = true;
    this.canvas.renderAll.bind(this.canvas);
  }
  onRectDeselected(e): void {
    if (!e.e) { return; }
    this.rectSelected = null;
  }
  onRectSelected(e) {
    this.rectSelected = this.canvas.getActiveObject();
    if (!this.canvasChanged) { this.canvasChanged = true; }

  }


}
