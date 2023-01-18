import { Component, OnChanges } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-meter-detail',
  templateUrl: './meter-detail.component.html',
  styleUrls: ['./meter-detail.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        state('*', style({ 'overflow-y': 'hidden' })),
        state('void', style({ 'overflow-y': 'hidden' })),
        transition('* => void', [
          style({ height: '*' }),
          animate(250, style({ height: 0 }))
        ]),
        transition('void => *', [
          style({ height: '0' }),
          animate(250, style({ height: '*' }))
        ])
      ]
    )
  ]

})
export class MeterDetailComponent implements OnChanges  {

  meterType : 'A' | 'B' | 'C'

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  constructor() { }

  ngOnChanges() {
  }


}
