import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prebuilt-image-list',
  templateUrl: './prebuilt-image-list.component.html',
  styleUrls: ['./prebuilt-image-list.component.scss']
})
export class PrebuiltImageListComponent implements OnInit {
  private _imageList: any[]
  @Input()
  public set imageList(v : any[]) {
    this._imageList = v;
    this.onSelect.emit(this._imageList[0]);
    this.currentImage = this._imageList[0]

  }


  public get imageList() : any[] {
    return this._imageList
  }



  @Input() currentImage;

  @Output() onSelect = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onChange(image, event){

  }

  onImageSelect(image){
    this.currentImage = image
    this.onSelect.emit(image)
  }
}
