import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { ProductionService } from '../../../../shared/services';

@Component({
  selector: 'app-use-model-image-list',
  templateUrl: './use-model-image-list.component.html',
  styleUrls: ['./use-model-image-list.component.scss']
})
export class UseModelImageListComponent implements OnInit, OnChanges {
  @Output() pageChange = new EventEmitter<any>();
  @Output() selectedImage = new EventEmitter<any>();
  @Input() projectId;
  @Input() images;
  @Input() model;
  @Input() modelId;
  @Input() imageCount: number;
  pageSizeOptions: number[] = [10, 25, 100];
  pageSize = 10;
  changer = true ;
  constructor(private productionService: ProductionService, ) { }

  ngOnInit(): void {

  }
  onPageChange(event): void  {
    this.pageChange.emit(event);
  }
  ngOnChanges(){
    this.selectedImage.emit(this.images[0])
  }

  handleChange(index): void  {
    const image = this.images[index];
    const k: any = { id: image.id };
    if (image.is_feedback) {k.is_feedback = false; }
    else { k.is_feedback = true; } 
    console.warn(k)
      this.productionService.updateFeedback(this.projectId, this.modelId, k).subscribe((data: any) => {
      this.images[index].is_feedback = data.is_feedback;
    });

  }
  onSelect(event,i): void {
    event.changer = true
     event.index =  i
        this.selectedImage.emit(event);
    
  }
}
