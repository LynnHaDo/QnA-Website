import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/common/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
    instructorCourseList: Course[] = [];
    studentCourseList: Course[] = [];

    constructor(private courseService: CourseService,
                private route: ActivatedRoute){}

    ngOnInit(): void {
        this.listCourses();
    }

    listCourses(){
        this.courseService.getCourses().subscribe(data => {
            this.instructorCourseList = data;
            this.studentCourseList = data;
            this.studentCourseList.push(...data);
            this.studentCourseList.push(...data);
        })
    }

}
