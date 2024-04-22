import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { Question } from 'src/app/common/question';
import { Student } from 'src/app/common/student';
import { AssignmentService } from 'src/app/services/assignment.service';
import { QuestionServiceService } from 'src/app/services/question-service.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
    question!: Question;
    student!: Student;

    editor: Editor = new Editor();
    html = '';

    constructor(private questionService: QuestionServiceService,
                private route: ActivatedRoute,
                private assignmentService: AssignmentService
    ){}
    
    ngOnInit(): void {
        this.renderQuestion();
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    renderQuestion(){
        let id = +this.route.snapshot.paramMap.get("questionId")!;
        this.questionService.getQuestion(id).subscribe((data) => {
            this.question = data;
            this.assignmentService.getStudentById(data.studentId).subscribe((s) => {
                this.student = s;
            })
        })
    }

}
