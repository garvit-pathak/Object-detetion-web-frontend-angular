import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelFormComponent } from '../model-form/model-form.component';
import { SnackbarService } from '../../../../shared/services';
import { Project } from '../../../../shared/models';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss']
})
export class ModelDetailComponent implements OnInit {
  @Input() model: any;
  @Input() project: Project;
  constructor(public dialog: MatDialog,
              private router: Router,
              private snackbar: SnackbarService,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModelFormComponent, {
      width: '600px',
      data: {
        model: this.model
      },
      disableClose: true,
      autoFocus: true
    });


  }

  gotoTraining(){
    if (this.model.number_of_images){
      this.router.navigate(['./training'], {relativeTo: this.route});
     
      
      
    }
    else{
      this.snackbar.open('Upload some image to model for training', 'info', '', {horizontalPosition: 'center'});
    }
  }

  gotoUseModel(){
    if (this.model.status === 'Ready To Use'){

      this.router.navigate(['use'], {relativeTo: this.route});
      
      
    }
    else{
      this.snackbar.open('Train the model to use', 'info', '', {horizontalPosition: 'center'});
    }
  }

}
