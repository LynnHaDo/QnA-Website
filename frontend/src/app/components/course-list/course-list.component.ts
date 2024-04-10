import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/common/course';
import { CourseService } from 'src/app/services/course.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
    instructorCourseList: Course[] = [];
    studentCourseList: Course[] = [];
    taCourseList: Course[] = [];
    userEmail!: string;
    message: string = "No courses available"

    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private authService: RegisterService){}

    ngOnInit(): void {
        this.authService.user().subscribe(
            {
                next: (res: any) => {
                    this.userEmail = res['email'];
                    this.listCourses();
                },
                error: (err) => {
                    RegisterService.authEmitter.emit(false);
                }
            }
        )
    }

    listCourses(){
        this.courseService.getCourses(this.userEmail).subscribe(
            (data) => {
                this.studentCourseList = data['student-courses'];
                this.instructorCourseList = data['instructor-courses'];
                this.taCourseList = data['ta-courses']
            }
        );
    }


}
