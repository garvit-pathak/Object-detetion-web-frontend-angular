import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MyOverlayRef } from './../../../../shared/models/my-overlay-ref.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, ElementRef, OnDestroy, ViewChild, Inject } from '@angular/core';
import { DynamicOverlay, ImageService } from '../../../../shared/services';

@Component({
  selector: 'app-model-image-dialog',
  templateUrl: './model-image-dialog.component.html',
  styleUrls: ['./model-image-dialog.component.scss']
})
export class ModelImageDialogComponent implements OnInit, OnDestroy {

  imageList;
  imagesCount;
  sub = new Subscription();

  selectedImages: number[] = null;
  @ViewChild('content', {static: true, read: ElementRef}) content: ElementRef;
  overRef: MyOverlayRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageService: ImageService,
    public dialog: MatDialog,
    private dynamicDialog: DynamicOverlay,
  ) { }

  ngOnInit(): void {
    this.getList();


    this.overRef  =   this.dynamicDialog.open(this.content);


  }
  ngOnDestroy(): void{
    if (this.sub){
      this.sub.unsubscribe();
    }
  }


  onPageChange(event): void{
    const offset = event.pageSize * event.pageIndex;  // (event.pageSize - 1) * event.pageIndex
    this.getList(event.pageSize, offset);


  }



  getList(limit= 10, offset= 0): void{
    this.sub =  this.imageService.getModelImages(this.data.project.project_id, this.data.modelId, limit, offset).subscribe((data: any) => {


      this.imageList =  data.results;
      this.imagesCount = data.count;
      this.overRef.close();
    });
  }


}
