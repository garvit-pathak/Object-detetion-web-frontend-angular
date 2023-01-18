import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaggingImageListComponent } from '../../../shared/components/tagging-image-list/tagging-image-list.component';
import { ImageType, Model, Project } from '../../../shared/models';
import { SnackbarService, TaskService } from '../../../shared/services';

@Component({
  selector: 'app-task-image-list',
  templateUrl: './task-image-list.component.html',
  styleUrls: ['./task-image-list.component.scss']
})
export class TaskImageListComponent implements OnInit {
  @Output() imageSelected = new EventEmitter();
  taskId: any;
  imageList: any[];
  subs: Subscription[] = [];
  @Input() isTagged: boolean;
  @ViewChild(TaggingImageListComponent, { static: true }) taggingImageList: TaggingImageListComponent;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params.taskId;
    this.getList();
  }
  onImageSelect(event): void {
    this.imageSelected.emit(event);
  }
  setTagImage(v: boolean): void {
    this.taggingImageList.isTagged = v;

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.taggingImageList.isTagged = changes.isTagged.currentValue;
  }
  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }
  ngAfterViewInit(): void {

  }
  updateList() {


    this.getList()
  }
  getList() {
    // init=false
    this.taskService.getAllTaskImages(this.taskId).subscribe((data: any) => {

      this.imageList = data.results[0]['images'];

      // if (init)this.setImageForCanvas(this.imageList[0].image_id)
    })
  }
}
