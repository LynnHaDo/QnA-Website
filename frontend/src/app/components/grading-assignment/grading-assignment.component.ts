import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    userId!: number;

    checked: number[] = [];
    claimedQuestions: Question[] = [];
    
    asmId = +this.router.url.split("/grading-assignments")[0].split("/assignments")[1].split("/")[1]
    
    ngOnInit(): void {
        this.renderClaimedQuestions();
        this.renderCluster();
    }

    constructor(private assignmentService: AssignmentService,
                private router: Router,
                private registerService: RegisterService
    ){}

    renderCluster(){
        this.assignmentService.getClusters(this.asmId).subscribe(
            (data) => {
                this.clusters = data
            }
        )
        this.loadClusterContent(this.asmId)
    }

    renderClaimedQuestions(){
        this.assignmentService.getClaimedQuestions(this.registerService.userId).subscribe(
            (data) => {
                this.claimedQuestions = data;
            }
        )
    }

    loadClusterContent(id: number){
        this.assignmentService.getClustersContent(id).subscribe(
            (data) => {
                this.clusterContent = data
            }
        )
    }

    onChange(id: number): void {
        if (this.checked.includes(id)) {
          this.checked = this.checked.filter((item) => item !== id);
        } else {
          this.checked.push(id);
        }
    }

    confirmSelection(){
        if (this.checked.length == 0){
            this.displayError = "block";
        } else {
            this.displayCF = "block";
        }
    }

    closeModal(){
        this.displayCF = "none";
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
            "claimedQuestions": this.checked
        }
        this.assignmentService.postClaimedQuestions(body).subscribe((data) => {
            this.renderCluster();
            this.renderClaimedQuestions();
        });
        this.displayCF = "none";
    }
}


