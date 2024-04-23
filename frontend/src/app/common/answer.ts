export class Answer {
    id!: number;
    content!: string;
    questionId!: number;
    dateSubmitted!: Date;
    taId!: number;

    constructor(id: number, content: string, questionId: number, dateSubmitted: Date, taId: number){
        this.id = id;
        this.content = content;
        this.questionId = questionId;
        this.dateSubmitted = dateSubmitted;
        this.taId = taId;
    }
}
