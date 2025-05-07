export interface PopUp {
  title:string,
  message:string | undefined,
  success:boolean
}

export interface User{
    name?:string,
    email:string,
    password:string
}


export interface RegisterProps {
    loading:boolean,
    signup:(data: { name: string; email: string; password: string; }) => Promise<{ success: boolean; error?: string }>,
    user:User,
    error: string | null;
    
    
  }

export interface LoginProps {
    loading:boolean,
    login:(data: { name?: string; email: string; password: string; }) => Promise<{ success: boolean; error?: string }>,
    user:User,
    error: string | null;
    
    
  }

  export interface AuthState {
    user: User | null;
    token: string | null;
    checkAuth: () => Promise<void> | void;
    loading: boolean;}
