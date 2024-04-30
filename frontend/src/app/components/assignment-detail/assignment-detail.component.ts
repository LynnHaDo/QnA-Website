import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/common/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { MiscService } from 'src/app/services/misc.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent {
    assignment!: Assignment;

    constructor(private route: ActivatedRoute,
        private assignmentService: AssignmentService,
        private miscService: MiscService){}

    ngOnInit(): void {
        this.renderAssignment();
    }

    renderMenu($event: any){
        this.miscService.renderMenu($event);
    }

    renderAssignment(){
    const theAssignmentId: number = +this.route.snapshot.paramMap.get('assignmentId')!;
    this.assignmentService.getAssignment(theAssignmentId).subscribe((data) => {
        this.assignment = data
    })
    }
}
