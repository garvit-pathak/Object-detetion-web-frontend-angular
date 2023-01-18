import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasicForm } from '../../../shared/models';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { GroupService, MeterService, ModelService, SnackbarService } from '../../../shared/services';
import { MeterValidator } from '../../../shared/validators/meter.validator';
import { MatDialog } from '@angular/material/dialog';
import { MeterKeysComponent } from '../meter-keys/meter-keys.component';

@Component({
  selector: 'app-meter-form',
  templateUrl: './meter-form.component.html',
  styleUrls: ['./meter-form.component.scss']
})
export class MeterFormComponent extends BasicForm implements OnInit {

  groups;
  meterData;
  models$;

  uploadData = [];
  showSpinner = false;
  resultData = null;
  selectedModels;
  @Output() meterChange = new EventEmitter();
  @Output() images = new EventEmitter();
  meterOptions = [
    {label: 'Type A', description: 'type a model', value: 'A'},
    {label: 'Type B', description: 'type b model', value: 'B'},
    {label: 'Type C', description: 'type c model', value: 'C'},
  ];


  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private modelService: ModelService,
    private meterService: MeterService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      group_id : ['', [Validators.required]],
      meter : ['', [Validators.required]],
      models : new FormArray([]),
      images : ['', [Validators.required]], // [Validators.required]
    }, {
      validators: MeterValidator.modelValidator('meter', 'models')
    });
    this.getGroups();
  }
  get t() { return this.f.models as FormArray; }


  onMeterChange(event){
    this.meterChange.emit(event.value);
    let numberOfModels = 1;
    if (event.value === 'B'){
        numberOfModels = 3;
    }
    else{
      if (event.value === 'C'){
        numberOfModels = 4;
    }
    }


    if (this.t.length < numberOfModels) {
      for (let i = this.t.length; i < numberOfModels; i++){
        this.t.push(this.formBuilder.group({
          model : ['', []],
      }));
    }

    }
    else{
      for (let i = this.t.length; i >= numberOfModels; i--) {
        this.t.removeAt(i);
    }
    }
  }

  onFileSelect(event){


    if (event.target.files.length > 0) {


      const file = event.target.files;
      this.form.get('images').setValue(file);
    }
    else{
      this.form.get('images').setValue(null);
    }

  }

  onSubmit(){
    if (this.form.invalid) {return; }


    this.showSpinner = true;


    const formData = new FormData();

    for (let i = 0; i < this.form.get('images').value.length; i++){


      formData.append('image', this.form.get('images').value[i]);
    }

    const data: any = {
      model_id: [],
      group_id: [this.form.get('group_id').value]
    };
    this.form.get('models').value.forEach(element => {
      if (element.model){
        data.model_id.push(element.model.id);
      }

    });

    formData.append('data', JSON.stringify(data));

    this.meterService.getReading(this.form.get('meter').value, formData).subscribe((data: any) => {

      this.images.emit(data);
      this.showSpinner = false;
    }, err => {

      this.showSpinner = false;
      this.snackbarService.open(err.error.detail, 'danger');
    });
  }
  getError(fieldname){
    return this.form.controls.meter.errors[fieldname];
  }
  groupSelectionChange(event){

    this.getModels(event.value);
  }
  getGroups(){
    this.groups = this.groupService.getAllGroupList();
  }

  getModels(groupId){
    this.models$ = this.modelService.getModelListByGroup(groupId);
  }

  openGenerateAPIDialog(){
    const apiKeys = [];
    this.form.get('models').value.forEach(element => {

      if (element.model){
        apiKeys.push(element.model.api_key);
      }

    });

    this.meterData = {
      mType: this.form.get('meter').value,
      groupId: this.form.get('group_id').value,
      apiKeys
    };
    const dialogRef = this.dialog.open(MeterKeysComponent, {
      width: '800px',
      data: {
        meterData: this.meterData
      },
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
