import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/common/question';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-assignment-submissions',
  templateUrl: './assignment-submissions.component.html',
  styleUrls: ['./assignment-submissions.component.css']
})
export class AssignmentSubmissionsComponent {
    questions!: Question[];
    studentSubmissionEmail!: string;

    questionId!: number;
    displayCF: string = "none";
    questionToBeDeletedId!: number;

    claimedQuestions: number[] = [];

    constructor(private registerService: RegisterService,
                private route: ActivatedRoute,
                private assignmentService: AssignmentService){}

    ngOnInit(): void {
        this.renderClaimedQuestions();
        this.renderSubmissions();
    }

    renderClaimedQuestions(){
        this.assignmentService.getClaimedQuestions(this.registerService.userId).subscribe(
            (data) => {
                for (let dat of data){
                    this.claimedQuestions.push(dat.id)
                }
            }
        )
    }

    renderSubmissions(){
        const assignmentId = +this.route.snapshot.paramMap.get("assignmentId")!;
        this.assignmentService.getQuestions(assignmentId).subscribe((data) => {
            this.questions = data;
        })
    }

    getStudent(studentId: number){
        this.assignmentService.getStudentById(studentId).subscribe((data) => {
            this.studentSubmissionEmail = data.email;
        })
    }

    openRemoveSubmissionModal(question: Question){
        this.getStudent(question.studentId);
        this.questionId = question.id;
        this.displayCF = "block";
    }

    removeQuestion(){
        const body = {
            "questionId": this.questionId
        }
        this.assignmentService.removeQuestion(body).subscribe((data) => {
            this.renderClaimedQuestions();
            this.renderSubmissions();
            this.displayCF = "none";
        });

    }

    closeModal(){
        this.displayCF = "none";
    }

}
