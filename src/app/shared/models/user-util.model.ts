import { Role } from './role.enum';

export class UserUtil {
  public static hasViewPermission(role: Role){
    if(role === Role.ADMIN || Role.PRIMARY_OWNER || Role.MANAGER){
      return true
    }
    else{
      return false
    }
  }
  public static hasDeletePermission(role: Role){
    if(role === Role.ADMIN || Role.PRIMARY_OWNER || Role.MANAGER){
      return true
    }
    else{
      return false
    }
  }
  public static hasCreatePermission(role: Role){
    if(role === Role.ADMIN || Role.PRIMARY_OWNER || Role.MANAGER){
      return true
    }
    else{
      return false
    }
  }
}
