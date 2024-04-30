export class Question {
    id!: number;
    content!: string;
    assignmentId!: number;
    studentId!: number;
    answeredStatus!: boolean;
    claimedStatus!: boolean;

    constructor(id: number, content: string, assignmentId: number, studentId: number, answeredStatus: boolean, claimedStatus: boolean){
        this.id = id;
        this.content = content;
        this.assignmentId = assignmentId;
        this.studentId = studentId;
        this.answeredStatus = answeredStatus;
        this.claimedStatus = claimedStatus
    }
}
