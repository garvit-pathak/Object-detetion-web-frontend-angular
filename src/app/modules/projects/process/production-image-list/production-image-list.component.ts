import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductionService } from '../../../../shared/services';

@Component({
  selector: 'app-production-image-list',
  templateUrl: './production-image-list.component.html',
  styleUrls: ['./production-image-list.component.scss']
})
export class ProductionImageListComponent implements OnInit {
  pageSizeOptions: number[] = [10, 25, 100];
  pageSize = 10;
  images: any;
  imageCount: any;
  _currentPaginator=null;
  @Input() processId;
  projectId: any;
  modelId: any;
  constructor(private productionService: ProductionService,
              private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.modelId = this.route.snapshot.paramMap.get('modelId');
    this.getAllProcessImageById();
  }
  onPageChange(event): void  {
    this._currentPaginator = event
    const offset = event.pageSize * event.pageIndex;  // (event.pageSize - 1) * event.pageIndex
    this.getAllProcessImageById(event.pageSize, offset);


  }
  getAllProcessImageById(limit=10, offset=0) {
    this.productionService.getProcessImageById(this.projectId, this.modelId, this.processId, limit, offset).subscribe((images: any) => {
      

      this.imageCount = images.count
      this.images = images.results

    }, error => {


    })
  }
}
