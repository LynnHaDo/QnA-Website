export class Assignment {
    id!: number;
    name!: string;
    publishedStatus!: boolean; // published or not
    courseId!: number;
    dueDate!: Date;
    numSubmissions!: number;
    numAnswered!: number;
}
