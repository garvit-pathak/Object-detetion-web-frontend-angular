import { ConfirmDeleteComponent } from './../../../../shared/components/confirm-delete/confirm-delete.component';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ImageService, SnackbarService } from '../../../../shared/services';
import { DynamicOverlay } from '../../../../shared/services/dynamic-overlay.service';
import { MyOverlayRef } from '../../../../shared/models';

@Component({
  selector: 'app-image-list-dialog',
  templateUrl: './image-list-dialog.component.html',
  styleUrls: ['./image-list-dialog.component.scss']
})
export class ImageListDialogComponent implements OnInit, OnDestroy {

  imageList = [];
  imagesCount;
  sub = new Subscription();

  selectedImages: number[] = [];
  @ViewChild('content', {static: true, read: ElementRef}) content: ElementRef;
  overRef: MyOverlayRef;
  private imageDeleted = false;
  private _currentPaginator;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageService: ImageService,
    public dialog: MatDialog,
    private dynamicDialog: DynamicOverlay,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<ImageListDialogComponent>
  ) { }

  ngOnInit(): void {
    this.getList();


    this.overRef  =   this.dynamicDialog.open(this.content);


  }
  ngOnDestroy(){
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

  openDeleteDialog(){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {


      if (result){
        this.deleteImages();
      }
    });
  }

  isDisable(){

    if (this.selectedImages  && (this.selectedImages.length > 0) && this.imageList){
      return false;
    }
    else { return true;}
  }
  onPageChange(event){
    this._currentPaginator = event;
    const offset = event.pageSize * event.pageIndex;  // (event.pageSize - 1) * event.pageIndex
    this.getList(event.pageSize, offset);

  }

  deleteImages(){
    const images = {images : this.selectedImages};
    this.imageService.deleteProjectImages(this.data.project.project_id, images).subscribe((Data: any) => {
      this.snackbarService.open('Images deleted successfully.', 'success');
      this.selectedImages = [];
      if (this._currentPaginator){


      this.onPageChange(this._currentPaginator);

      }else{
        this.closeDialog();


      }
      this.imageDeleted = true;
    },
    error => {

      this.snackbarService.open(error.error.detail, 'danger');
    });
  }
  getList(limit= 10, offset= 0){
    this.sub =  this.imageService.getProjectImageList(this.data.project.project_id, limit, offset).subscribe((data: any) => {


      this.imageList = data.results;
      this.imagesCount = data.count;
      this.overRef.close();
      if (!this.imageList.length){
        this.closeDialog();
      }
    });
  }

  onSelectedImages(event){
    this.selectedImages = event;
  }

  closeDialog(){
    this.dialogRef.close(this.imageDeleted);
  }

}
