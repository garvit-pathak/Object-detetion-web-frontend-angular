import { Injectable } from '@angular/core';
declare let Plotly: any;
@Injectable({
  providedIn: 'root'
})
export class PlotlyService {

  constructor() { }
  plotLine(title: string, plotDiv: string, x:number[], y:number[]){           
    // let trace = {
    //   x: x,    
    //   y: y,   
    //   type: 'pie'   
    // };
    var label = ["Storage Used", "Storage Left"];
  var value = [10, 79];

 
         let trace ={
          labels:label, values:value, hole:.3, type:"pie"}         
    let layout = {
      title:title
    };
    var barColors = [
      "#b91d47",
      "#00aba9",
    
   
    ];
    
    Plotly.newPlot(plotDiv, [trace],layout,barColors);     
  }
   horizontalBar(div : string){
    let xArray = [ 44, 24, 15];
let yArray = [ "Spain ", "USA ", "Production Proccess "];

let data = [{
  x:xArray,
  y:yArray,
  type:"bar",
  orientation:"h",
  marker: {color:"#1f2d7e"}
}];

var layout = {title:"World Wide Wine Production"};

Plotly.newPlot(div, data);
   }
}
