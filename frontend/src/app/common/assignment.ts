export class Assignment {
    id!: number;
    name!: string;
    status!: boolean; // published or not
    numSubmissions!: number;
    courseId!: number;

    constructor(id: number, name: string, status: boolean, numSubmissions: number, courseId: number){
        this.id = id;
        this.name = name;
        this.status = status;
        this.numSubmissions = numSubmissions;
        this.courseId = courseId
    }
}
