import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {

  private _paginator: boolean
  allSelect=false
  @Input() set showPaginator(value: boolean) {
    this._paginator = value
    if (value && !this.imageCount) {
      this.imageCount = this.images.length
    }
  }
  get showPaginator() {
    return this._paginator
  }

  private _isExcerpt = false;
  get isExcerpt(): boolean {

    return this._isExcerpt;
  }

  @Input() set isExcerpt(value: boolean) {
    this._isExcerpt = value;
    if (this._isExcerpt) {
      this.selectable = false;
    }
  }

  _pageSizeOptions: number[]=[10, 25, 100]
  _pageSize: number=10


  @Input() set pageSizeOptions(options: number[]){
    this._pageSizeOptions = options
    this._pageSize = this._pageSizeOptions[0]
  }
  get pageSizeOptions(){
    return this._pageSizeOptions
  }

  @Input() set pageSize(value: number){
    this._pageSize = value
  }
  get pageSize(){
    return this._pageSize
  }

  private _images: any[] = [];
  @Input() imageCount: number;
  @Input() selectable = false;
  @Output() selectedImages = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();


  @ViewChild(MatPaginator) paginator: MatPaginator;


  @Input() set images(value:any[]){
    this._images = value
    this._selectedImageList = []
  }
  get images(){
    return this._images
  }
  private _selectedImageList = [];


  onPageChange(event) {
    this.pageChange.emit(event)
    this._selectedImageList = []
  }

  onImageSelected(event) {
    let index = this.images.findIndex(image => image.id === event.imageId)


    if (event.isChecked) {
      this._selectedImageList.push(event.imageId);
    }
    else {
      this._selectedImageList = this._selectedImageList.filter(obj => obj !== event.imageId);
    }
    this.images[index].checked = event.isChecked
    this.allSelect =this._selectedImageList.length === this.images.length ? true : false
    this.selectedImages.emit(this._selectedImageList);
  }

  selectAll(event){


    this._selectedImageList=[]
    if(event.checked){
      this.images.forEach(element => {
        element.checked = event.checked
        this._selectedImageList.push(element.id)
      });
    }else{
      this.images.forEach(element => {
        element.checked = event.checked
      });
    }

    this.allSelect=event.checked ? true : false
    this.selectedImages.emit(this._selectedImageList);
  }
}
