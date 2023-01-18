import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';
import { PrebuiltService } from '../../../shared/services';
@Component({
  selector: 'app-prebuilt-carousal',
  templateUrl: './prebuilt-carousal.component.html',
  styleUrls: ['./prebuilt-carousal.component.scss']
})
export class PrebuiltCarousalComponent implements OnInit {
  // slides  = [
  //   {image:'/assets/images/undraw_design_components_9vy6.svg'},
  //   {image:'/assets/images/undraw_design_components_9vy6.svg'},
  //   {image:'/assets/images/undraw_design_components_9vy6.svg'},
  // ]
  slides=[]
  groupSlides = []
  constructor(
    private prebuiltService:PrebuiltService,
  ) { }

  ngOnInit(): void {
    this.getList()
  }


  getList(): void {
    

    this.prebuiltService.getList().subscribe((d: any[]) => {
      // this.slides = d
      
      var i, a = [], b;

      for (i = 0; i < d.length; i += 3) {
        b = { model1: d[i] };

        if (d[i + 1]) {
          b.model2 = d[i + 1];
        }
        if (d[i + 2]) {
          b.model3 = d[i + 2];
        }

        a.push(b);
      }
      this.groupSlides = a
      

    })
  }
}
