export interface Board{
    id : number,
    name : string,
    createdAt : number,

    userDetails : {
        firstName : string,
        lastName : string,
        photoURL : string,
        email : string
    }
}