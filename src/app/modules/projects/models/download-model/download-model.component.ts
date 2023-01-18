import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, ModelService, ProjectService } from '../../../../shared/services';
import { Model } from '../../../../shared/models';

@Component({
  selector: 'app-download-model',
  templateUrl: './download-model.component.html',
  styleUrls: ['./download-model.component.scss']
})
export class DownloadModelComponent implements OnInit {

  downloadUrl
  model$ : Observable<Model>
  project
  constructor(
    private route:ActivatedRoute,
    public authService: AuthService,
    private modelService: ModelService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    let projectId = this.route.snapshot.params.projectId
    let modelId = this.route.snapshot.params.modelId
    this.getModel()
  }
  getModel(){
    this.model$ = this.modelService.currentModel
  }

}
