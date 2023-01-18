import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { BasicForm } from '../../../../shared/models';
import { ProjectService, SnackbarService } from '../../../../shared/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent extends BasicForm implements OnInit {

  groupSelected = null;
  projectList = [];
  available = true;
  project: any;
  title: string;
  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    private snackbarService: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/),
        this.projectNameValidator(),Validators.maxLength(255)]],
      group: ['', [Validators.required]],
      description: ['', Validators.maxLength(3000)]
    });
    if (this.data.project){
      this.title = 'Update Project';
      this.project = this.data.project;
      
      this.form.patchValue({
        name: this.project.project_name,
        description: this.project.project_description,
        group : this.project.group_id
      });
    }
    else{
      this.title = 'Create New Project';
    }
    if (this.data.projectList){
      this.projectList = this.data.projectList;
    }
   
  }

  getList(groupId){
    this.projectService.getListByGroupId(groupId).subscribe((data: any) => {
      this.projectList = data.results;

    });
  }
  onGroupSelect(event){
    if (!this.data.projectList){

      this.getList(event);

    }
    this.groupSelected = event;

    this.form.patchValue({
      group: event
    });
  }

  onSubmit(): void{
    if (this.data.project){
      const u = this.form.value;
      const u1 = {
        name: this.toCapitalize(u.name).trim(),
        description: u.description,
      };
      const projectById: any = u1;
      projectById.id = this.project.project_id;
      projectById.is_sequential = this.project.is_sequential;
      this.projectService.update(projectById).subscribe((data: any) => {
        this.closeDialog();
        this.snackbarService.open('Project updated successfully','success');

        this.projectService.setProject(projectById.id, true);
      }, error => {
        this.snackbarService.open(error.error.detail,'danger');
      });
    }
    else {
      if(this.data.isSequential){
        
        const u = this.form.value;
        const u2 = {
          name: this.toCapitalize(u.name).trim(),
          description: u.description,
          is_sequential: true
        };
        this.projectService.create(this.groupSelected, u2).subscribe((data: any) => {
          this.closeDialog();
          this.snackbarService.open('Project created successfully','success');
        }, error => {
          this.snackbarService.open(error.error.detail,'danger');
        });
      }
      else{
        const u = this.form.value;
        const u2 = {
          name: this.toCapitalize(u.name).trim(),
          description: u.description,
          is_sequential: false
        };
        this.projectService.create(this.groupSelected, u2).subscribe((data: any) => {
          this.closeDialog();
          this.snackbarService.open('Project created successfully','success');
        }, error => {
          this.snackbarService.open(error.error.detail,'danger');
        });
      }
      
    }

  }
  closeDialog() {
    this.dialogRef.close();
  }

  projectNameValidator(): ValidatorFn {


    return (control: AbstractControl): { [key: string]: boolean} | null => {
      if (( control.value.trim().length <= 0) && ( control.value.trim().length !== control.value.length )) {return {available : true}; }

      const k = this.projectList.find(m => m.project_name.toLowerCase() === control.value.trim().toLowerCase()
      && m.group_id === this.groupSelected);
      if (k) { return {available : true}; } else { return null; }
    };
  }

  public toCapitalize(input: string) {
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

    function capitalizeString(inputString) {
      return inputString.substring(0, 1).toUpperCase() + inputString.substring(1);
    }
  }
}
