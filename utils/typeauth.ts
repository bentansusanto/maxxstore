export interface Register {
    names : string;
    phoneNumber : string;
    email : string;
    password : string;
}

export interface Login{
    email : string;
    password : string;
}

export interface User {
    _id : string,
    names : string,
    email : string 
  }