import { UserRoles } from "./user-roles.model";

export class User {
    public  id: number;
        public username: string;
        public password: string;
        public confirmPassword: string;
        public firstName: string;
        public lastName: string;
        public email: string;
        public userRoles:UserRoles[]=[];
        public tenantId:string;
  }