import { FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BaseProjectModelComponent } from './../../../../shared/components/base-project-model/base-project-model.component';
import { Component, Input, OnInit } from '@angular/core';
import { LabelService, ModelService, ProjectService, SnackbarService } from '../../../../shared/services';
import {  Model, Project } from '../../../../shared/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label-form',
  templateUrl: './label-form.component.html',
  styleUrls: ['./label-form.component.scss']
})
export class LabelFormComponent extends BaseProjectModelComponent implements OnInit {
  
  @Input() model: Model;
  @Input() project: Project;
  @Input() modelId;
  @Input() projectId;
  showForm = false;
  checkName: boolean;
 
  form;
  disable: boolean;
  modelLabelForm: Model;
  constructor(
    private labelService: LabelService,
    public modelService: ModelService,
    public projectService: ProjectService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
  ) {
    super(modelService, projectService);
  }

  ngOnInit(): void {
    if (!this.model && !this.project){
      super.ngOnInit();
      this.getModelByID();
    }

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, this.labelNameValidator()]]
    });
    
   
  }
  getModelByID() {
    this.modelService.getModelFromServer(this.projectId, this.modelId).subscribe((model: Model) => {
      this.modelLabelForm = model;
      if(this.modelLabelForm.name =='cropping_model'){                //enable or disable new lable button in tagging page.
        this.checkName=true;
      }
      else{
        this.checkName=false;
      }
    })
  }

  labelNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean} | null => {
      if (control){
        if ( control.value.trim().length <= 0) {return {available : true}; }
        const k = this.model.labels.find(m => m.name.trim().toLowerCase() === control.value.trim().toLowerCase());
        if (k) { return {available : false}; } else { return null; }
      }
    };
  }

  onSubmit(){
    if (this.form.invalid){ return; }
    this.labelService.create({name: this.form.controls['name'].value, model: this.model.id}).subscribe(data => {
      this.modelService.setModel(this.project.project_id, this.model.id, true);
      this.showForm = false;
      // this.form.reset()
    }, error => {
      this.snackbarService.open('an error occurred.', 'danger');
    });
  }

  cancelForm(){
    this.showForm = false;
    // this.form.reset()
  }

  onShowForm(){
      this.showForm = !this.showForm;
      if (this.showForm){
        this.form = this.formBuilder.group({name: ['', [Validators.required, this.labelNameValidator()]]
      }); 
    }
    }
}
