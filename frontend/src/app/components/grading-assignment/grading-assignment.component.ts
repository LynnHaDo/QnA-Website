import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cluster } from 'src/app/common/cluster';
import { AssignmentService } from 'src/app/services/assignment.service';
import { QuestionServiceService } from 'src/app/services/question-service.service';

@Component({
  selector: 'app-grading-assignment',
  templateUrl: './grading-assignment.component.html',
  styleUrls: ['./grading-assignment.component.css']
})
export class GradingAssignmentComponent implements OnInit {
    clusters!: Cluster[];
    
    ngOnInit(): void {
        this.renderCluster();
    }

    constructor(private assignmentService: AssignmentService,
                private router: Router,
                private questionService: QuestionServiceService
    ){}

    renderCluster(){
        const asmId = +this.router.url.split("/grading-assignments")[0].split("/assignments")[1].split("/")[1]
        this.assignmentService.getClusters(asmId).subscribe(
            (data) => this.clusters = data
        )
    }
}


