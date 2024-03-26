import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/common/course';
import { CourseService } from 'src/app/services/course.service';
import { MiscService } from 'src/app/services/misc.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
    course!: Course;

    constructor(private route: ActivatedRoute,
                private courseService: CourseService,
                private miscService: MiscService){}

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
    }

    renderMenu($event: any){
        this.miscService.renderMenu($event);
    }
}
