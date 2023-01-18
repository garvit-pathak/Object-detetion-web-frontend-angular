import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MeterFormResultComponent } from '../meter-form-result/meter-form-result.component';

@Component({
  selector: 'app-meter-base',
  templateUrl: './meter-base.component.html',
  styleUrls: ['./meter-base.component.scss']
})
export class MeterBaseComponent implements OnInit {

  smallScreen: boolean;
  @ViewChild(MeterFormResultComponent,{static:true}) resultRef:MeterFormResultComponent;

  constructor(private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver) {
      breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small
      ]).subscribe(result => {
        this.smallScreen = result.matches;
    });

    }

  ngOnInit() {

  }
  onImageChange(event){
    this.resultRef.images = event
  }


}
