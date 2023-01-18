import { Subscription } from 'rxjs';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { LabelService } from '../../../../shared/services';

@Component({
  selector: 'app-base-label-graph',
  templateUrl: './base-label-graph.component.html',
  styleUrls: ['./base-label-graph.component.scss']
})
export class BaseLabelGraphComponent implements OnInit, OnDestroy {

  tagsPerLabel: any = null;
  taggedUntaggedData: any ;
  sub: Subscription ;
  constructor(

    private labelService: LabelService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {
    this.getGraphData();
   }

   ngOnDestroy(): void{
     if (this.sub){
      this.sub.unsubscribe();
     }
   }

  getGraphData(): void {

    this.sub = this.labelService.getLabelAndCoordinates(this.data.project.project_id, this.data.model.id).subscribe((data: any) => {
      this.getTagsPerLabel(data);
      this.getTaggedUntaggedData(data);


    });
  }

  getTagsPerLabel(data): void{
    const tagsData = data.data.count_of_cordinates_per_label;
    const tagsKey = [];
    const tagsValue = [];
    for (const key of Object.keys(tagsData)) {
      tagsKey.push(key);
      tagsValue.push(tagsData[key]);
    }
    this.tagsPerLabel = {};
    this.tagsPerLabel.label = tagsKey;
    this.tagsPerLabel.data = tagsValue;
  }
  getTaggedUntaggedData(data): void{
    const taggedProportion = data.data.count_of_tagged_and_untagged_images;
    let t;
    let ut;

    for (const k of taggedProportion) {
      if (k.is_tagged) { t = k.total; }
      else { ut = k.total; }
    }

    this.taggedUntaggedData = {};
    this.taggedUntaggedData = {
      label: ['Tagged', 'Untagged']
    };
    this.taggedUntaggedData.data = [t, ut];
  }

}
