import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-prebuilt',
  templateUrl: './use-prebuilt.component.html',
  styleUrls: ['./use-prebuilt.component.scss']
})
export class UsePrebuiltComponent implements OnInit {

  visible = false;
  currentState = 'initial';
  listItem = [];
  list_order = 1;
  imageList: any[];
  constructor() { }

  ngOnInit(): void {
  }
  onImageList(event){
    this.imageList = event;
  }

  onUploadMore(){


    this.imageList = null;
    this.visible = true;
  }
}
