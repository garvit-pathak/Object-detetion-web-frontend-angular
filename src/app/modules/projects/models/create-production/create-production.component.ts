import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { BasicForm, Model } from '../../../../shared/models';
import { DynamicOverlay, ProductionService, SnackbarService } from '../../../../shared/services';


@Component({
  selector: 'app-create-production',
  templateUrl: './create-production.component.html',
  styleUrls: ['./create-production.component.scss']
})
export class CreateProductionComponent extends BasicForm implements OnInit {

  @Input() model: Model;
  @Input() projectId: number;

  @Output() uploaded = new EventEmitter();
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  @ViewChild('content', {static: true, read: ElementRef}) content: ElementRef;
  check: boolean;
  checkSequential: boolean;
  constructor(
    private productionService: ProductionService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private dynamicOverlay: DynamicOverlay
  ) {
    super();
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', []],
      images: ['', [Validators.required]]

    });
    if (this.model.name == 'cropping_model' && this.model.status == 'Ready To Use'){
      this.checkSequential=true;
    }
    
  }

  onUpload(){
    
    this.check=false;
    const overRef  =  this.dynamicOverlay.open(this.content);
    this.productionService.create(this.projectId, this.model.id, this.form.controls.name.value, this.form.controls.images.value.files,this.check)
    .subscribe(data => {

      this.snackbarService.openCustom('Image uploaded. It will take few seconds to process images.', 'success');
      this.formDirective.resetForm();
      
      overRef.close();
      this.uploaded.emit();
      setInterval(()=>{
        window.location.reload()
      },3000)
    }, err => {
          
      this.snackbarService.open(err.error.detail, 'success');
    });
    // window.location.reload();
  }

  onUploadSequential(){
    const overRef  =  this.dynamicOverlay.open(this.content);
    this.productionService.inference(this.projectId, this.model.id, this.form.controls.name.value, this.form.controls.images.value.files)
    .subscribe(data => {
      
      this.snackbarService.openCustom('Image uploaded. It will take few seconds to process images.', 'success');
      this.formDirective.resetForm();
      overRef.close();
      this.uploaded.emit(data);
      
    }, err => {

      this.snackbarService.open(err.error.detail, 'success');

    });
    // window.location.reload();
  }
}
