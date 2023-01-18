import { environment } from './../../../environments/environment';
import { ColorCode } from './color-code';
import { Label } from './label.model';
export class Model {
  id: number;
  name: string;
  project: number;
  description: string;
  labels: Label[];
  status: string;
  number_of_images: number;
  api_key: string ;
  category: string;
  hits_count: number;
  number_of_training: number;
  storage_used: number;
  is_tag_modified: boolean;

  private _labelsWithColor: any[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.labels = [];
    input.labels.forEach(element => {
      this.labels.push(new Label().deserialize(element));
    });

    this.createLabelArray();
    return this;
  }
  public get labelsWithColor(): any[] {
    return this._labelsWithColor;
  }
  private createLabelArray(): any{
    const colorCode = new ColorCode();
    const labelsWithColor = [{ name: 'Untagged', id: -1, color: 'red' }];
    for (let i = 0; i < this.labels.length; i++) {labelsWithColor.push(colorCode.setColorToLabel(i, this.labels[i])); }
    this._labelsWithColor = labelsWithColor;
  }
  downloadUrl(token:string){
    return `${environment.apiUrl}/projects/${this.project}/models/${this.id}/download-file?token=${token}&api_key=${this.api_key}`
  }
}

