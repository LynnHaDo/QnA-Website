import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private courseService: CourseService, 
        private router: Router
        ){}
    
        ngOnInit(): void {
            this.route.paramMap.subscribe(() => {
                this.render();
            })
        }
    
        render(){
            const theCourseId: number = +this.router.url.split("/assignments")[0].split('courses/')[1];
            this.courseService.getAssignments(theCourseId).subscribe((data) => {
                this.assignments = data
            })
        }

        getWidth(assignment: Assignment){
            let val = assignment.numAnswered/assignment.numSubmissions * 100
            return val.toString() + "%";
        }
    
    
}

