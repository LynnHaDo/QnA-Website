import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/common/student';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-roster',
  templateUrl: './course-roster.component.html',
  styleUrls: ['./course-roster.component.css']
})
export class CourseRosterComponent implements OnInit {
    students!: Student[];
    courseId!: number;
    displayCF: string = "none";
    studentToBeDeleted!: string;
    studentToBeDeletedId!: number;

    constructor(private courseService: CourseService, private router: Router){}

    ngOnInit(): void {
        this.renderRoster();
    }

    renderRoster(){
        const courseId = +this.router.url.split("/")[2];
        this.courseService.getStudents(courseId).subscribe((data) => {
            this.students = data;
        })
    }

    openRemoveStudentModal(student: Student){
        this.studentToBeDeleted = student.email;
        this.studentToBeDeletedId = student.id;
        this.displayCF = "block";
    }

    removeStudent(){
        const courseId = +this.router.url.split("/")[2];
        const body = {
            "courseId": courseId,
            "studentId": this.studentToBeDeletedId
        }
        this.courseService.removeStudent(body).subscribe();
        this.displayCF = "none";
        this.renderRoster();
    }

    closeModal(){
        this.displayCF = "none";
    }
}
