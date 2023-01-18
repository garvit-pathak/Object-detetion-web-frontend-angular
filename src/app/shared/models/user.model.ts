import { Deserializable } from './deserializable.model';

export class User implements Deserializable{
  id: number
  first_name : string;
  last_name: string;
  email: string;
  phone_number: string;
  is_searchable: boolean ;
  group_id:number ;
  group_name: string;

  getName(){
    return `${this.first_name} ${this.last_name}`
  }


  hasPermisssion(){

  }
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
