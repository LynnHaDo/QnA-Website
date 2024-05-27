import { Component, OnDestroy, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { Question } from 'src/app/common/question';
import { Student } from 'src/app/common/student';

import { AssignmentService } from 'src/app/services/assignment.service';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import { RegisterService } from 'src/app/services/register.service';

import { formatDate } from '@angular/common';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
    question!: Question;
    student!: Student;
    oParser = new DOMParser();

    isEditMode: boolean = false;
    editor: Editor = new Editor();
    html = '';
    renderedHtmlContent: SafeHtml = "";
    dateAnswered = "";

    successfullySubmitted: boolean = false;
    failToSubmit: boolean = false;

    ansForm: FormGroup = this.formBuilder.group({
        editorContent: new FormControl("", Validators.required)
    })

    get answer() {
        return this.ansForm.get("editorContent")!;
    }

    constructor(private questionService: QuestionServiceService,
                private route: ActivatedRoute,
                private assignmentService: AssignmentService,
                private sanitzer: DomSanitizer,
                private formBuilder: FormBuilder,
                private registerService: RegisterService
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
            this.renderAnswer();
        })
    }

    sanitizeHtmlContent(htmlstring: string): SafeHtml {
        return this.sanitzer.sanitize(SecurityContext.HTML, htmlstring)!;
    }

    renderAnswer(){
        if (this.question.answeredStatus){
            this.questionService.getAnswerToQuestion(this.question.id).subscribe(
                (data) => {
                    this.renderedHtmlContent = this.sanitizeHtmlContent(data['content']);
                    this.dateAnswered = formatDate(data['dateSubmitted'],'short', "en_US");;
                }
            )
        }
    }

    onSubmit(){
        this.registerService.user().subscribe({
            next: (res: any) => {
                let body = {
                    "content": this.html,
                    "taId": this.registerService.userId,
                    "questionId": this.question.id
                }
                this.questionService.postAnswer(body).subscribe(
                    (data) => {
                        this.renderQuestion();
                        this.successfullySubmitted = true;
                        this.isEditMode = false;
                    }
                );
                
            },
            error: (err) => {
                this.failToSubmit = true;
            }
        })
    }
}
