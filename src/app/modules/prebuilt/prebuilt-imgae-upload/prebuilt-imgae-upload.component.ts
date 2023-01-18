import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyOverlayRef } from '../../../shared/models';
import {  OverlayService, PrebuiltService, SnackbarService } from '../../../shared/services';

@Component({
  selector: 'app-prebuilt-imgae-upload',
  templateUrl: './prebuilt-imgae-upload.component.html',
  styleUrls: ['./prebuilt-imgae-upload.component.scss']
})
export class PrebuiltImgaeUploadComponent implements OnInit {

  files: File[] = [];
  modelId: number;
  @ViewChild('uploadContainer', {static: true, read: ElementRef}) content: ElementRef;
  overlayRef: MyOverlayRef;
  @Output() imageList = new EventEmitter();
  constructor(
    private prebuiltService: PrebuiltService,
    private route: ActivatedRoute,
    private snackbar: SnackbarService,
    private overlay: OverlayService
  ) { }

  ngOnInit(): void {
    this.modelId = this.route.snapshot.params.publicModelId;
  }

  uploadImages() {
    this.overlayRef =  this.overlay.open();

    this.prebuiltService.uploadImages(this.modelId, this.files).subscribe((data: any) => {

      this.imageList.emit(data);
      this.overlayRef.close();
    }, err => {

      this.snackbar.openCustom(err.error, 'danger', {
        duration: 4000,
      });
      this.overlayRef.close();
    });
  }

  onFiles(event) {

    this.files = event;
  }
}
