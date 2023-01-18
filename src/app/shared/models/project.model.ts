import { Role } from './role.enum';
import { Permission } from './permission.model';
import { Deserializable } from './deserializable.model';

export class Project implements Deserializable{
  project_id: number;
  project_name: string ;
  group_name: string ;
  group_id: number;
  role_id: number;
  role_name: string ;
  is_sequential: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }


  hasModelPermission(action: 'create' | 'delete' | 'update', purpose: 'label' | 'image' | 'model' | 'production' | 'training' | 'tag' | 'feedback'): boolean{

    if ( this.role_name === Role.ADMIN || this.role_name === Role.PRIMARY_OWNER || this.role_name === Role.MANAGER  || purpose === 'tag'  || purpose === 'feedback') {return true; }
    else {
      switch (true){
        case (purpose === 'label' || purpose === 'model' || purpose === 'production' || purpose === 'training'):
          return false ;

        case (purpose === 'image'):
          if (action === 'create') {return true; }
          else { return false; }

      }
    }
  }

  hasProjectPermission(): boolean{
    if ( this.role_name === Role.ADMIN || this.role_name === Role.PRIMARY_OWNER || this.role_name === Role.MANAGER) {return true; }
    else{
      return false ;
      }

  }

}
