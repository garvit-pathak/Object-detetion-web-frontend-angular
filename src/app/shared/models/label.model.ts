import { Deserializable } from './deserializable.model';
export class Label implements Deserializable{
  id: number;
  name: string;
  is_deleted: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
