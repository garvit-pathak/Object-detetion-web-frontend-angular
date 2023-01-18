import { Component, OnInit } from '@angular/core';
import { PrebuiltService } from '../../../shared/services';

@Component({
  selector: 'app-prebuilt-model-list',
  templateUrl: './prebuilt-model-list.component.html',
  styleUrls: ['./prebuilt-model-list.component.scss']
})
export class PrebuiltModelListComponent implements OnInit {

  list;
  constructor(
    private prebuiltService: PrebuiltService,
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList(){
     this.prebuiltService.getList().subscribe((data)=>{
      this.list = data
        console.warn(data)
        
    },(err)=>{
      console.warn(err)
     });
  }

  getImageUrl(item){
    return item.prebuilt_image.length > 0 ? item.prebuilt_image[0].name : '';
  }
}
