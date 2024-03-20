export class Course {
    id!: number;
    code!: string;
    name!: string;
    semester!: string;
    dateCreated!: Date;
    lastUpdated!: Date;

    constructor(id: number, code: string, name: string, semester: string, dateCreated: Date, lastUpdated: Date){
        this.id = id;
        this.code = code;
        this.name = name;
        this.semester = semester;
        this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated
    }
}
