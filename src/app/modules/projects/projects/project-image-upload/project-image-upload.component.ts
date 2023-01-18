import { ProgressBarComponent } from './../../../../shared/components/progress-bar/progress-bar.component';
import { FileBatch } from './../../../../shared/models/file-batch.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DynamicOverlay, ImageService, SnackbarService, ModelService, ProductionService } from '../../../../shared/services';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-project-image-upload',
  templateUrl: './project-image-upload.component.html',
  styleUrls: ['./project-image-upload.component.scss']
})
export class ProjectImageUploadComponent implements OnInit {
  checkSequential : boolean;
  modelList=[];
  @Input() model: any;
  batches: FileBatch[] = [];
  totalBatch:number
  _totalFileSize: number = 0
  totalUploaded = 0
  overlayRef:any
  
  closeDisabled=false
  @ViewChild('content',{static:false,read:ElementRef}) content : ElementRef;

  @Output() uploaded = new EventEmitter();
  check: boolean;
  status: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modelService: ModelService,
    private productionService: ProductionService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private dynamicOverlay: DynamicOverlay,
    private dialogRef: MatDialogRef<ProjectImageUploadComponent>
  ) { }

  ngOnInit(): void {
    this.getList();
    
  }
  uploadfiles() {
   
    this.overlayRef = this.dynamicOverlay.open(this.content)
    this.closeDisabled=true
    this.batches.forEach((element) => {
      this.upload(element)

    });
  }


  closeDialog(uploaded=false){
    this.dialogRef.close(uploaded)
    this.getList();
    // window.location.reload();
    // this.router.navigate(['']);
    
  }
  upload(batch: FileBatch) {
      this.imageService.uploadProjectImages(this.data.project.project_id, batch.files).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.totalUploaded = event.loaded
          } else if (event instanceof HttpResponse) {
            this.totalBatch = this.totalBatch - 1
            if(this.totalBatch === 0){
              this.overlayRef.close()
              this.closeDisabled=false
              this.closeDialog(true)
              this.snackbarService.open('upload completed','success')
              this.overlayRef.close()
              this.uploaded.emit();
              
            }
  
          }
          
        },
        err => {
  
          this.closeDisabled=false
  
          this.snackbarService.open(err.error.detail,'danger')
          this.overlayRef.close()
          if(err.error.detail === 'None of the plans are active'){
            this.closeDialog(false)
  
          }
        });
    
    
  }
  onBatches(event) {

    this.batches = event
    this.totalBatch = this.batches.length
  
  }
  onTotalFileSize(event) {
    this._totalFileSize = event
   
  }
  getList(): void{
    this.modelService.getAllByProjectId(this.data.project.project_id).subscribe((data1: any) => {
      this.modelList = data1.results;
     
      if(this.data.project.is_sequential==true && this.modelList[0].status == 'Ready To Use'){
      this.checkSequential = true;
      }
    });
}
uploadDigitModel(){
  this.overlayRef = this.dynamicOverlay.open(this.content)
    this.closeDisabled=true
    this.batches.forEach((element) => {
      this.upload(element)
    });
    
    this.check=true;
    const justCkeck = 'fig';
    this.productionService.create(this.data.project.project_id, this.data.project.modelList_id, justCkeck, this.batches[1].files,this.check)
    .subscribe(data => {
      
      this.snackbarService.openCustom('Image uploaded. It will take few seconds to process images.', 'success');
    }, err => {
     
      this.snackbarService.open(err.error.detail, 'success');

    });
}
}
