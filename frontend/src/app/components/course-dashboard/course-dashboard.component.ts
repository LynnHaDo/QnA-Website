import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/common/assignment';
import { Task } from 'src/app/common/task';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent {
    tasks: Task[] = [];
    activeAssignments: Assignment[] = [];

    constructor(private route: ActivatedRoute,
        private courseService: CourseService,
        private assignmentService: AssignmentService){}

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.render();
        })
    }

    render(){
        const theCourseId: number = +this.route.snapshot.paramMap.get('id')!;
        this.courseService.getAssignments(theCourseId).subscribe((data) => {
            this.activeAssignments = data
        })
    }

}
