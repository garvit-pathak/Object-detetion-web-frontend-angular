import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Model } from '../../models';
import { ModelService } from '../../services';

@Component({
  selector: 'app-response-format',
  templateUrl: './response-format.component.html',
  styleUrls: ['./response-format.component.scss']
})
export class ResponseFormatComponent implements OnInit {
  @Input() visible: 'image' | 'model' = null
  model$ : Observable<Model>
  constructor(
    private modelService: ModelService,
  ) { }

  ngOnInit(): void {
    this.getModel()
  }

  getModel(){
    this.model$ = this.modelService.currentModel
  }
  public modelKeyResponseObject: any = {
    "detail": [
      {
        "filename": "FILENAME",
        "conf": 0.999987846719,
        "xmax": 228.77,
        "ymin": 20.11,
        "xmin": 209.91,
        "ymax": 72.9125,
        "class": "Dog"
      },
      {
        "filename": "FILENAME",
        "conf": 0.9872538292,
        "xmax": 137.14,
        "ymin": 21.59,
        "xmin": 114.47,
        "ymax": 76.25,
        "class": "Cat"
      },
    ]
  };

  public accessImageResponseObject: any =
    {
      "count": 68,
      "next": "https://www.xtract.in:5000/api/v2/projects/list/production-images/?api_key=10af904c-c4fa-4c40-9ab4-c9b3606c4d67&limit=1&offset=1",
      "previous": null,
      "results": [
        {
          "name": "https://www.xtract.in:5000/media/group_1/project_1/images/model_4/D1RJ49104118.jpg",
          "cordinates": [
            {
              "label__name": "G",
              "x_min": 310,
              "x_max": 385,
              "confidence": 0.119323879480362,
              "y_min": 27,
              "y_max": 102
            },
            {
              "label__name": "C",
              "x_min": 299,
              "x_max": 359,
              "confidence": 0.278410822153091,
              "y_min": 23,
              "y_max": 100
            },
          ]
        }
      ]
    };


}
