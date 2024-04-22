export class Question {
    id!: number;
    content!: string;
    assignmentId!: number;
    studentId!: number;
    answeredStatus!: boolean;

    constructor(id: number, content: string, assignmentId: number, studentId: number, answeredStatus: boolean){
        this.id = id;
        this.content = content;
        this.assignmentId = assignmentId;
        this.studentId = studentId;
        this.answeredStatus = answeredStatus;
    }
}
