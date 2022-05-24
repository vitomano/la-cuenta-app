
export interface LoginData {
    email: string,
    password: string,
} 

export interface RegisterData {
    name:     string;
    email:    string,
    password: string,
    rol?:     'ADMIN_ROLE' | 'USER_ROLE' 
}

export interface User {
    uid:     string;
    name:    string;
    email:   string;
    rol:     string;
    company?: string;
    profile: string;
}


export interface RegisterResponse {
    ok:    boolean;
    user:  User;
    token: string;
}

export interface LoginResponse {
    ok:    boolean;
    user:  User;
    token: string;
}

