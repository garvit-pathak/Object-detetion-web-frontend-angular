import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImageService, ModelService, ProjectService, SnackbarService, TaskService, UserService } from '../../../shared/services';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {
  path = '..';
  targetimages: any;
  sourceimages: any;
  isAvailable = false;
  selectedGroupId: any;
  projectList: any[];
  selectedProject: any;
  modelList: any;
  selectedModel: any;
  userList: any;
  selectedUser: any;
  errorMessage: any;
  form: any;

  constructor(private imageService: ImageService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private modelService: ModelService,
              private userService: UserService,
              private taskService: TaskService,
              private snackbarService: SnackbarService, ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      message: ['', Validators.required],
  });
  }
  resetValues(){
    if (this.sourceimages ||  this.targetimages || this.selectedModel){
      this.sourceimages = [];
      this.targetimages = [];
      this.selectedModel = '';

    }
  }
  onGroupSelect(event): void {

    this.selectedGroupId = event;
    this.resetValues();
    if (this.selectedProject){

      this.selectedProject = '';
    }
    this.getProjectList();
  }
  onProjectChange(event): void{

    this.selectedProject = event.value;
    this.getModelList();
    this.getUserList();
    this.resetValues();
  }
  onModelChange(event): void{

    this.selectedModel = event.value;
    this.getSourceImageList();
  }
  onUserChange(event): void{

    this.selectedUser = event.value;
  }
  getProjectList(): void  {
    this.projectService.getListByGroupId(this.selectedGroupId).subscribe((data: any) => {

      this.projectList = [];
      data.results.forEach(element => {
        if (element.role_name === 'primary owner' || element.role_name == 'primary owner' || element.role_name == 'admin') {
          this.projectList.push(element);
        }
      });
    });
  }
  getModelList(): void{
    this.modelService.getAllByProjectId(this.selectedProject.project_id).subscribe((data: any) => {
      this.modelList = data.results;


    });
  }
  getUserList(){
    this.userService.getProjectTeam(this.selectedProject.project_id).subscribe((data: any) => {
      this.userList = data;


    });
    // this.userList = this.userService.getProjectTeam(this.selectedProject.project_id)


  }
  getSourceImageList() {
    this.targetimages = [];
    this.imageService.getModelImages(this.selectedProject.project_id, this.selectedModel.id, 0, 0, true).subscribe((data: any) => {

        this.sourceimages = data.results;
        this.isAvailable = this.sourceimages.length ? true : false;


    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

  }
  moveAllRight() {
    if (this.sourceimages) {
      const movedItems = [];

      for (let i = 0; i < this.sourceimages.length; i++) {
        const removedItem = this.sourceimages.splice(i, 1)[0];
        this.targetimages.push(removedItem);
        movedItems.push(removedItem);
        i--;
      }
    }
  }
  moveAllLeft() {
    if (this.targetimages) {
      const movedItems = [];

      for (let i = 0; i < this.targetimages.length; i++) {
        const removedItem = this.targetimages.splice(i, 1)[0];
        this.sourceimages.push(removedItem);
        movedItems.push(removedItem);
        i--;
      }
    }
  }
  onSubmit(): void {
    this.errorMessage = null;
    if (!this.selectedModel || !this.selectedUser) {
      this.errorMessage = 'select model and user both';
      return;
    }
    const arr = [];
    this.targetimages.forEach(element => {
      const obj = {
        image_id: element.id,
      };
      arr.push(obj);
    });

    if (arr.length == 0 ){
      this.errorMessage = 'select at least 1 image';
      return;
    }


    const data = {
      assigned_to: this.selectedUser.user_id,
      message: this.form.value.message,
      model_id: this.selectedModel.id,
      images: arr
    };


    this.taskService.create(this.selectedGroupId, data).subscribe((data: any) => {

      // this.resetVariables()
      this.snackbarService.open('Task Assigned successfully.', 'success');
    }, error => {
      this.snackbarService.open('Unsuccessful.', 'danger');
  });
  }

}
