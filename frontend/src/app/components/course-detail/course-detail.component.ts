import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/common/course';
import { Task } from 'src/app/common/task';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
    course!: Course;
    tasks: Task[] = [];

    constructor(private route: ActivatedRoute,
                private courseService: CourseService){}

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.renderCourse();
        })
    }

    renderCourse(){
        const theCourseId: number = +this.route.snapshot.paramMap.get('id')!;
        this.courseService.getCourse(theCourseId).subscribe((data) => {
            this.course = data
        })
        this.courseService.getTasks(theCourseId).subscribe((data) => {
            this.tasks = data;
        })
    }
}
