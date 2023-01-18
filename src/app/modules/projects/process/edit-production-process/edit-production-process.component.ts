import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BasicForm } from '../../../../shared/models';
import { ProductionService, SnackbarService } from '../../../../shared/services';

@Component({
  selector: 'app-edit-production-process',
  templateUrl: './edit-production-process.component.html',
  styleUrls: ['./edit-production-process.component.scss']
})
export class EditProductionProcessComponent extends BasicForm implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private productionService: ProductionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditProductionProcessComponent>,
    private snackbarService: SnackbarService,


  ) {
    super();
  }

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(255)]]
    });
    if (this.data.process){


      this.form.patchValue({
        name: this.data.process.name
      });
    }

  }
  onSubmit(): void {

    const k = {id: this.data.process.id, ...this.form.value};
    this.productionService.update(Number(this.data.projectId), Number(this.data.modelId), this.data.process.id, k).subscribe(data => {

      this.dialogRef.close(true);
    }, err => {
      this.snackbarService.openCustom(err.error.error, 'danger');
      this.dialogRef.close();

    });
  }

}
