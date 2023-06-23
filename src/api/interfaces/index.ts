export interface Result {
    data: any;
    error: string | null;
}
export interface SignupArgsType {
    email: string;
    lastname :string;
    name :string;
    code? : string
    role? : string,
    vehicule? : string
  }
  
  export interface LoginArgsType {
    email?: string;
    code? : string
  }
  
  export  interface UserFuncType {
    userId: string;
  }
  