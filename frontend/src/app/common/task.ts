export class Task {
    description!: string;
    courseId!: number;

    constructor(description: string, courseId: number){
        this.description = description;
        this.courseId = courseId;
    }
}
