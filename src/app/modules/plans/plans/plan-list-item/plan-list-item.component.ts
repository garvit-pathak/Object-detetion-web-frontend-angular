import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-plan-list-item',
  templateUrl: './plan-list-item.component.html',
  styleUrls: ['./plan-list-item.component.scss'],changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanListItemComponent implements OnInit , OnChanges{

  @Input() visibleAddToCard:boolean = true;
  @Input() plan:any
  @Input() isActive:boolean
  @Input() basePlanAdded:boolean =false
  @Output() productAdded =new EventEmitter()
  @Output() productRemoved =new EventEmitter()

  _productAdded: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes.basePlanAdded && changes.basePlanAdded.currentValue){
    this.basePlanAdded = changes.basePlanAdded.currentValue

    }

  }

  disableBasePlan(){
    return this.basePlanAdded && this.plan.plan_type === 'BP'
  }
  remove(){

    this._productAdded = false

    this.productRemoved.emit(this.plan)
  }
  add(){
    this._productAdded = true
    this.productAdded .emit(this.plan)
  }
  isAddOn(){
    return this.plan.plan_type == 'AD'
  }

}
