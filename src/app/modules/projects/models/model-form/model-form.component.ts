import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { BasicForm } from '../../../../shared/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelService, SnackbarService } from '../../../../shared/services';
import {COMMA, ENTER, U} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent extends BasicForm implements OnInit {
  selected = 'option1';
  title: string;
  selectable = true;
  removable = true;
  addOnBlur = true;
  available = true;
  nameError = false;
  labels: any[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  modelList: any[] = [];
  model: any;
  projectId: any;
  @Output()
  addProject = new EventEmitter();
  errorDetail: any;
  constructor(private formBuilder: FormBuilder,
              private modelService: ModelService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModelFormComponent>,
              private snackbarService: SnackbarService) {super(); }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
       //model_type: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/),
        this.modelNameValidator(), Validators.maxLength(255)]],
      description: ['', Validators.maxLength(3000)],
    });
    if (this.data.model){
      this.title = 'Update Model';
      this.model = this.data.model;
      this.model.labels.forEach(e => {
        this.labels.push(e);
      });
      this.form.patchValue({
        //model_type: this.model.model_type, 
        name: this.model.name,
        description: this.model.description,
        // labels: this.model.labels
      });
    }
    else{
      this.title = 'Create New Model';
    }
    if (this.data.modelList){
      this.modelList = this.data.modelList;
      this.projectId = this.data.projectId;
    }
    
  }
  modelNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean} | null => {
      if (( control.value.trim().length <= 0) && ( control.value.trim().length !== control.value.length )) {return {available : true}}
      const k = this.modelList.find(m => m.name.toLowerCase() === control.value.trim().toLowerCase());
      if (k) { return {available : true}; } else { return null; }
    };
  }
  onSubmit(): void {
    if (this.form.invalid) {return; }
    if (this.data.model) {

     const u = this.form.value;
     const u1 = {
      //model_type: u.model_type, 
      name: this.toCapitalize(u.name).trim(),
      description: u.description
    };
     const modelWithId: any = u1;
     modelWithId.project = this.model.project;
     modelWithId.labels = this.labels;
     modelWithId.id = this.model.id;

     this.modelService.update(modelWithId.project, modelWithId).subscribe((data: any) => {
        this.addProject.emit();
        this.labels = [];
        this.closeDialog();
        this.snackbarService.open('Model updated successfully','success');
        this.modelService.setModel(modelWithId.project, modelWithId.id, true);
      });
    }else {
    const u = this.form.value;
    const u1 = {
      //model_type: u.model_type, 
      name: this.toCapitalize(u.name).trim(),
      description: u.description
    };
    const modelWithLabels: any = u1;
    modelWithLabels.labels = this.labels;
    this.modelService.create(this.projectId, modelWithLabels).subscribe((data: any) => {
        this.addProject.emit();
        this.labels = [];
        this.closeDialog();
        this.snackbarService.open('Model created successfully','success');
      }, error => {
        this.errorDetail = error.error.detail;
      }
      );
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let asd = this.labels.find(e => e.name === event.value)

    if(asd){
      this.snackbarService.open('Duplicate labels are not allowed','danger','',{horizontalPosition:'center'})
      this.remove(asd)
    }
    if ((value || '').trim()) {
      this.labels.push({name: value.trim()});
    }


    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }


  public toCapitalize(input: string): string {
    if (input.indexOf(' ') !== -1) {
      let inputPieces,
      i;

      input = input.toLowerCase();
      inputPieces = input.split(' ');

      for (i = 0; i < inputPieces.length; i++) {
        inputPieces[i] = capitalizeString(inputPieces[i]);
      }

      return inputPieces.toString().replace(/,/g, ' ');
    }
    else {
      input = input.toLowerCase();
      return capitalizeString(input);
    }

    function capitalizeString(inputString): string {
      return inputString.substring(0, 1).toUpperCase() + inputString.substring(1);
    }
  }
}
