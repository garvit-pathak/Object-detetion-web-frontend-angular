import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tagging-image-list',
  templateUrl: './tagging-image-list.component.html',
  styleUrls: ['./tagging-image-list.component.scss']
})
export class TaggingImageListComponent implements OnInit, OnChanges {
  private _currentImage: any;
  private _privousImage: any;
  @Output() imageSelect = new EventEmitter();
  @Input() imageList: any[];


 set isTagged(v: boolean) {
    if ('is_tagged' in this._privousImage ) {
      this._privousImage.is_tagged = v
    }
  }


  get isTagged(): boolean {
    return this._currentImage.is_tagged;
  }

  get currentImage(): any {
    return this._currentImage;
  }

  constructor() { }

  ngOnInit(): void {


  }
  ngOnChanges(changes: SimpleChanges) {
    
    if(!changes.imageList.firstChange){
      this._currentImage = this.imageList[0];
      this._privousImage = this.currentImage;
      this.imageSelect.emit(this._currentImage);
    }

  }

  onImageSelect(event) {
    this._privousImage = this._currentImage;
    this._currentImage = event;
    this.imageSelect.emit(event);
  }
}
