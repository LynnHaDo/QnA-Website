import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../common/course';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { env } from '../environment/env.development';
import { Task } from '../common/task';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    private baseUrl: string = `${env.courseAPI}`;
    
    sampleCourse: Course = new Course(1, "CS300", "Fundamentals of Computer Systems", "Spring", new Date(), new Date());
    sampleTask1: Task = new Task("Finish grading PLQ #2", 1, true);
    sampleTask2: Task = new Task("Finish grading PLQ #3", 1, true);
    sampleTask3: Task = new Task("Review and publish grades for PLQ #1 now that you're all done grading.", 1, true);

    getCourse(theCourseId: number): Observable<Course>{
        const url = `${this.baseUrl}/${theCourseId}`;

        if (!env.production){
            const listCourses: BehaviorSubject<Course> = new BehaviorSubject(this.sampleCourse);
            return listCourses.asObservable();
        }

        return this.httpClient.get<Course>(url);
    } 

    getTasks(theCourseId: number): Observable<Task[]>{
        const url = `${this.baseUrl}/${theCourseId}`;

        if (!env.production){
            const listTasks: BehaviorSubject<Task[]> = new BehaviorSubject([this.sampleTask1, this.sampleTask2, this.sampleTask3]);
            return listTasks.asObservable();
        }

        return this.httpClient.get<Task[]>(url);
    }

    getCourses(): Observable<Course[]>{
        const url = `${this.baseUrl}`;
        
        if (!env.production){
            const listCourses: BehaviorSubject<Course[]> = new BehaviorSubject([this.sampleCourse]);
            return listCourses.asObservable();
        }

        return this.httpClient.get<GetResponseCourses>(url).pipe(
            map(res => res.courses)
        )
    }

    constructor(private httpClient: HttpClient) { }
}

interface GetResponseCourses {
    courses: Course[]
}
