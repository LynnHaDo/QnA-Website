import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/common/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent {
    assignment!: Assignment;

    constructor(private route: ActivatedRoute,
        private assignmentService: AssignmentService){}

    ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
        this.renderAssignment();
    })
    }

    renderAssignment(){
    const theCourseId: number = +this.route.snapshot.paramMap.get('id')!;
    const theAssignmentId: number = +this.route.snapshot.paramMap.get('assignmentId')!;
    this.assignmentService.getAssignment(theCourseId, theAssignmentId).subscribe((data) => {
        this.assignment = data
    })
    }
}
