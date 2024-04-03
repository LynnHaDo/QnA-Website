export class User {
    id!: number;
    role!: number;
    name!: string;
    email!: string;
    password!: string;

    constructor(id: number, role: number, name: string, email: string, password: string){
        this.id = id;
        this.role = role;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
