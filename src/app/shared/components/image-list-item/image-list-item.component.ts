import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-list-item',
  templateUrl: './image-list-item.component.html',
  styleUrls: ['./image-list-item.component.scss']
})
export class ImageListItemComponent implements OnChanges {

  @Input()
  image?: any;

  @Input() selectable=false
  @Input() checked=false
  @Output() selected = new EventEmitter<any>();


  constructor(){


  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.


  }
  onChange(imageId : string, isChecked: boolean,inp:any) {

    this.checked=isChecked;
    this.selected.emit({'imageId':imageId,'isChecked':this.checked})

  }

}
