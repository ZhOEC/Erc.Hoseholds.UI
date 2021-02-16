import { Role } from "./role";

export interface User {
    userName: string,
    roles: Role[]
}