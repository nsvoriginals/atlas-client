import { atom } from "jotai";

export type User={
    username:string,
    email:string,
    password:string
}

const userAtom= atom<User>({
    username:"",
    email:"",
    password:""

})

export default userAtom;
