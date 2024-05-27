import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { Cluster } from 'src/app/common/cluster';
import { Question } from 'src/app/common/question';
import { AssignmentService } from 'src/app/services/assignment.service';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-grading-assignment',
  templateUrl: './grading-assignment.component.html',
  styleUrls: ['./grading-assignment.component.css']
})
export class GradingAssignmentComponent implements OnInit {
    clusters!: Cluster[];
    clusterContent!: any[];

    displayCF = "none";
    displayError = "none";
    displayRM = "none";

    claimed: number[] = [];
    claimedQuestions: Question[] = [];

    selected: number[] = [];
    selectedQuestions: Question[] = [];
    
    asmId = +this.router.url.split("/grading-assignments")[0].split("/assignments")[1].split("/")[1];

    /** Text editor */
    isAnswerFormOpened = false;
    editor: Editor = new Editor();
    html = '';
    renderedHtmlContent: SafeHtml = "";

    successfullySubmitted: boolean = false;
    failToSubmit: boolean = false;

    ansForm: FormGroup = this.formBuilder.group({
        editorContent: new FormControl("", Validators.required)
    })
    
    ngOnInit(): void {
        this.renderClaimedQuestions();
        this.renderCluster();
    }

    constructor(private assignmentService: AssignmentService,
                private router: Router,
                private registerService: RegisterService,
                private formBuilder: FormBuilder,
                private sanitzer: DomSanitizer,
                private questionService: QuestionServiceService
    ){}

    renderCluster(){
        this.assignmentService.getClusters(this.asmId).subscribe(
            (data) => {
                this.clusters = data
            }
        )
        this.loadClusterContent(this.asmId)
    }

    loadClusterContent(id: number){
        this.assignmentService.getClustersContent(id).subscribe(
            (data) => {
                this.clusterContent = data
            }
        )
    }

    renderClaimedQuestions(){
        this.assignmentService.getClaimedQuestions(this.registerService.userId).subscribe(
            (data) => {
                this.claimedQuestions = data;
            }
        )
    }

    onSelect(id: number): void {
        if (this.selected.includes(id)) { // uncheck 
          this.selected = this.selected.filter((item) => item !== id);
        } else { // check
          this.selected.push(id);
        }
    }

    onClaim(id: number): void {
        if (this.claimed.includes(id)) { // uncheck
            this.claimed = this.claimed.filter((item) => item !== id);
        } else {
            this.claimed.push(id);
        }
    }
    
    openAnswerForm() {
        if (this.selected.length == 0){
            this.displayError = "block";
        } else {
            this.isAnswerFormOpened = true;
        }
    }

    onSubmit() {
        this.registerService.user().subscribe({
            next: (res: any) => {
                for (let q of this.selected) {
                    let body = {
                        "content": this.html,
                        "taId": this.registerService.userId,
                        "questionId": q
                    }
                    this.questionService.postAnswer(body).subscribe(
                        (data) => {
                            this.renderClaimedQuestions();
                        }
                    );
                }
                this.successfullySubmitted = true;
                this.isAnswerFormOpened = false;
            },
            error: (err) => {
                this.failToSubmit = true;
            }
        })
    }

    sanitizeHtmlContent(htmlstring: string): SafeHtml {
        return this.sanitzer.sanitize(SecurityContext.HTML, htmlstring)!;
    }

    confirmClaimSelection(){
        if (this.claimed.length == 0){
            this.displayError = "block";
        } else {
            this.displayCF = "block";
        }
    }

    closeModal(){
        this.displayCF = "none";
    }

    closeRMModal(){
        this.displayRM = "none";
    }

    closeModalError(){
        this.displayError = "none";
    }

    postSelection(){
        if (this.registerService.userId == null){
            return;
        }

        const body = {
            "ta_id": this.registerService.userId,
            "assignment_id": this.asmId,
            "claimedQuestions": this.claimed
        }
        this.assignmentService.postClaimedQuestions(body).subscribe((data) => {
            this.renderCluster();
            this.renderClaimedQuestions();
        });
        this.displayCF = "none";
        this.claimed = [];
    }

    openRemoveQuestionModal() {
        if (this.selected.length == 0) {
            this.displayError = "block";
        } else {
            this.displayRM = "block";
        }
    }

    unclaimQuestions() {
        const body = {
            "ta_id": this.registerService.userId,
            "assignment_id": this.asmId,
            "claimedQuestions": this.selected
        }

        this.assignmentService.unclaimQuestions(body).subscribe(data => {
            this.renderClaimedQuestions();
            this.renderCluster();
        })

        this.displayRM = "none";
        this.selected = [];
    }
}


