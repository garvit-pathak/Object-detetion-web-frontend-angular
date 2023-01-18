import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-meter-keys',
  templateUrl: './meter-keys.component.html',
  styleUrls: ['./meter-keys.component.scss']
})
export class MeterKeysComponent implements OnInit {

  sUrl = environment.apiUrl + '/meter_reading_key/';
  apiUrl: any;
  responseData
   = [
    {
        'meter_reading': '00024.20',
        'meter_number': '',
        'filename': 'https://xtract.in:5000/media/meter_reading/test2019-05-08_13_12_44.712313.jpg'
    }
];

  constructor(@Inject(MAT_DIALOG_DATA) public meterData: any, ) { }

  ngOnInit() {
    this.meterData = this.meterData.meterData;

    this.apiUrl = `curl  -X POST -H "Content-Type: multipart/form-data" --url '${this.sUrl}?choice=${this.meterData.mType}' -F image='@path/to/your/filename' -F data='{"api_key":${JSON.stringify(this.meterData.apiKeys)},"group_id":[${this.meterData.groupId}]}'`;
      // this.getLastBasePlanDate();
  }


}
