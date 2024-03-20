export class Task {
    description!: string;
    courseId!: number;
    status!: boolean;

    constructor(description: string, courseId: number, status: boolean){
        this.description = description;
        this.courseId = courseId;
        this.status = status
    }
}
