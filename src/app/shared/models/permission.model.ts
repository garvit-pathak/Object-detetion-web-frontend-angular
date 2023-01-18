import { User } from './user.model';
import { UserService } from '../services';
import { Role } from './role.enum';


export class Permission{

  user: User
  constructor(
    private userService: UserService
  ){
    this.userService.currentUser.subscribe((user:User)=>{
      this.user = user ;
    })
  }

  public static hasPermission(
    role,
    purpose: 'project' | 'plan' | 'user',
    action: 'create' | 'delete' | 'update'): boolean{
    switch (true){

      case (role === Role.PRIMARY_OWNER || role === Role.ADMIN):
        return true;
      case ((role === Role.MANAGER) && (purpose === 'project') && (action === 'create')):
        return true;

      case ((role === Role.ADMIN) && (purpose === 'project') && (action === 'delete')):
        return true;

      case ((role === Role.ADMIN) && (purpose === 'project') && (action === 'update')):
        return true;


      default:
        return false;


    }


  }

}
