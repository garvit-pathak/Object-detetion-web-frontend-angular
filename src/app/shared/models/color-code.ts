export class ColorCode{

  private code: string[] = [
    '#00FF00',
    '#008080',
    '#0000FF',
    '#FF00FF',
    '#800080',
    '#8B0000',
    '#008000',
    '#00FFFF',
    '#4682B4',
    '#00BFFF',
    '#4B0082',
    '#FFA07A',
    '#808000',
    '#C71585',
    '#808080',
    '#8B4513',
    '#8FBC8F',
    'goldenrod',
    '#00BFFF',


    '#DC3912',
'#FF9900',
'#109618',
'#990099',
'#3B3EAC',
'#0099C6',
'#DD4477',
'#66AA00',
'#B82E2E',
'#316395',
'#994499',
'#22AA99',
'#AAAA11',
'#6633CC',
'#E67300',
'#8B0707',
'#329262',
'#5574A6',
 '#3B3EAC',
    '#ff99ff',
    '#99ff99',
    '#ffff99',
    '#ff6699',
    '#800000',
    '#cc0000',
    '#cc9900',
    '#997300',
    '#ffdf80',
    '#006666',
    '#6600ff',
    '#a366ff',
    '#660066',
    '#003300',
    '#666633',
    '#666699',
    '#990033',
    '#3366CC'
];

public getColorCode(index: number)
{
    return this.code[index];
}
public setColorToLabel(index: number, label: any): any{
    return {name: label.name, id: label.id, color: this.code[index]};
}


public configureDefaultColours(data: number[]): string[] {
  let customColours = [];
  if (data.length) {

  customColours = data.map((element, idx) => {
      return this.code[idx % this.code.length];
  });
  }

  return customColours;
}
}
