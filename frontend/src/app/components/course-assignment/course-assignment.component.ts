import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/common/assignment';
import { Task } from 'src/app/common/task';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-assignment',
  templateUrl: './course-assignment.component.html',
  styleUrls: ['./course-assignment.component.css']
})
export class CourseAssignmentComponent {
    assignments: Assignment[] = [];

    constructor(private route: ActivatedRoute,
        private assignmentService: AssignmentService){}
    
        ngOnInit(): void {
            this.route.paramMap.subscribe(() => {
                this.render();
            })
        }
    
        render(){
            const theCourseId: number = +this.route.snapshot.paramMap.get('id')!;
            this.assignmentService.getAssignments(theCourseId).subscribe((data) => {
                this.assignments = data
            })
        }
    
}

